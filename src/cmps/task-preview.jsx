import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { boardService } from "../services/board.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faClock, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { Route, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setTask, toggleDetails, editTask } from "../store/action/board-action"
import { useFormRegister } from "../hooks/useFormRegister"
import { setNewBoard } from "../store/action/board-action"
import { EditTaskNav } from "./edit-task-nav"

export const TaskPreview = ({ task, board, box, index }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [isComplete, setIsComplete] = useState(task.date.isComplete)
    const [register, newBoxTitle, EditBoxTitle] = useFormRegister({ title: task.title })
    const [labels, setLabels] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        // window.addEventListener('mousedown', onDown)
        setLabels(getLabels)
    }, [task])


    const toggleComplete = (ev) => {
        ev.stopPropagation()
        if (isComplete) {
            const newTask = { ...task, date: { ...task.date, isComplete: '' } }
            dispatch(editTask(board._id, box.id, newTask))
            setIsComplete('')
        }
        else {
            const newTask = { ...task, date: { ...task.date, isComplete: 'complete' } }
            dispatch(editTask(board._id, box.id, newTask))
            setIsComplete('complete')
        }
    }
    // const onToggleDetails = (task) => {
    //     dispatch(toggleDetails(task))
    // }
    const onDown = () => {
        setIsEdit(false)
    }

    const onEditTask = async (ev, board, box) => {
        ev.preventDefault()
        if (!newBoxTitle.title) {
            setIsEdit(!isEdit)
            return
        }
        const newTask = { ...task, title: newBoxTitle.title }
        setIsEdit(!isEdit)
        dispatch(editTask(board._id, box.id, newTask))
    }

    const onSetTask = (box) => {
        dispatch(setTask(task, box))
        navigate(`task/${task.id}`)
    }

    const openTask = () => {
        navigate(`task/${task.id}`)
        setIsEdit(false)
    }

    const onOpenEditTask = (ev) => {
        ev.stopPropagation()
        setIsEdit(!isEdit)
    }

    const getLabels = () => {
        if (!task.labelIds) return
        const taskLabels = task.labelIds.map(labelId => boardService.getLabelById(labelId, board))
        return taskLabels
    }


    return <div>
        {(!isEdit) && <div onClick={() => { }} className=" task " to={`/b/${board._id}/card/${task.id}`}>
            {(task.color !== '') ? <div className="task-preview-color" style={{ backgroundColor: task.color }}></div> : ''}
            {(labels.length > 0) && <div className="labels">
                {(labels) ? labels.map(label => <div key={label.id} className="label" style={{ backgroundColor: label.color }}></div>) : ''}
            </div>}
            <div className="flex space-between" onClick={() => { onSetTask(box) }}>
                <div>
                    <p >{task.title}</p>
                    {(task.date) && <div onClick={(ev) => toggleComplete(ev)} className={`date-preview ${isComplete}`}>
                        {(!isComplete) && <FontAwesomeIcon className="fa font-square" icon={faSquare} />}
                        {(isComplete) && <FontAwesomeIcon className="fa font-square" icon={faSquareCheck} />}
                        <FontAwesomeIcon className="fa font-clock" icon={faClock} />
                        <span>     </span> {task.date?.month || ''} {task.date?.day || ''}</div>}
                </div>
                <div>

                    <div className="edit-fav">
                        <FontAwesomeIcon className="on-edit" onClick={(ev) => onOpenEditTask(ev)} icon={faPen} />
                    </div>
                    <div className="task-members">
                        {(task.members) && task.members.map((member, idx) => {
                            return (
                                <div key={idx} className="task-member"><p>{member.init}</p></div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
        }


        {(isEdit) && <div>
            <div onClick={() => { onDown() }} className="the-great-one"></div>
            <div className="task-link task no-flow task-edited" onClick={() => { }} to={`/b/${board._id}/card/${task.id}`}>
                {(task.color !== '') ? <div className="task-preview-color" style={{ backgroundColor: task.color }}></div> : ''}
                <div className="labels">
                    {(labels) ? labels.map(label => <div key={label.id} className="label" style={{ backgroundColor: label.color }}></div>) : ''}
                </div>
                <form className="edit-task-form" onSubmit={(ev) => { onEditTask(ev, board, box, task) }}><textarea className="task-edit" {...register('title')} />
                    <button className="save-btn-edit">save</button></form>
                <EditTaskNav openTask={openTask} setIsEdit={setIsEdit} box={box} task={task} board={board} />
            </div>
        </div>}

        <Outlet />
    </div>
}