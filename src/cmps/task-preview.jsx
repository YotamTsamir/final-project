import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import desc from '../pngs/menu.png'
import { boardService } from "../services/board.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faClock, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { Outlet } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setTask, toggleDetails, editTask } from "../store/action/board-action"
import { useFormRegister } from "../hooks/useFormRegister"
import { EditTaskNav } from "./edit-task-nav"

export const TaskPreview = ({ task, board, box, index }) => {
    const [labelOpen, setLabelOpen] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [isComplete, setIsComplete] = useState(task.date.isComplete)
    const [isPassed, setIsPassed] = useState()
    const [register, newBoxTitle, EditBoxTitle] = useFormRegister({ title: task.title })
    const [labels, setLabels] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if ((Date.now() - task.date.timeStamp) >= 0) {
            setIsPassed('passed')
        }
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

    const onOpenLabel = (ev) => {
        ev.stopPropagation()
        console.log('baga')
        if (!labelOpen) setLabelOpen('label-open')
        else setLabelOpen('')
    }

    const getLabels = () => {
        if (!task.labelIds) return
        const taskLabels = task.labelIds.map(labelId => boardService.getLabelById(labelId, board))
        return taskLabels
    }
    if (task.bg) if (task.bg.includes('url')) console.log(task)
    if (task.archivedAt !== '') return
    return <div>
        {(!isEdit) && <div onClick={() => { }} className=" task " to={`/b/${board._id}/card/${task.id}`}>
            {(task.bg) ? (task.bg.includes('url')) ? <div className="task-preview-photo" style={{ background: task.bg }}></div> : <div className="task-preview-color" style={{ background: task.bg }}></div> : ''}
            {(labels && labels.length > 0) && <div className="labels">
                {(labels) ? labels.map(label => <div key={label.id} className={`label `} onClick={(ev) => onOpenLabel(ev)}
                    style={{ backgroundColor: label.color }}></div>) : ''}
            </div>}
            <div className="flex space-between" onClick={() => { onSetTask(box) }}>
                <div>
                    <p >{task.title}</p>
                    <div className="flex space-between spacer-bottom-task">
                        <div className="flex task-prev-date-desc">
                            {(task.date) && <div onClick={(ev) => toggleComplete(ev)} className={`date-preview ${isPassed} ${isComplete}`}>
                                {(!isComplete) && <FontAwesomeIcon className="fa font-square" icon={faSquare} />}
                                {(isComplete) && <FontAwesomeIcon className="fa font-square" icon={faSquareCheck} />}
                                <FontAwesomeIcon className="fa font-clock" icon={faClock} />
                                <span>     </span> {task.date?.month || ''} {task.date?.day || ''}</div>}
                            {(task.description) && <div><img className="desc-png" src={desc} /></div>}
                        </div>
                        {(task.members) && <div className="task-members">
                            {task.members.map((member, idx) => {
                                return (
                                    <div key={idx} className="task-member"><p>{member.init}</p></div>
                                )
                            })}
                        </div>
                        }
                    </div>
                </div>
                <div>

                    <div className="edit-fav grey-icons">
                        <FontAwesomeIcon className="on-edit" onClick={(ev) => onOpenEditTask(ev)} icon={faPen} />
                    </div>

                </div>
            </div>
        </div>
        }


        {(isEdit) && <div>
            <div onClick={() => { onDown() }} className="the-great-one"></div>
            <div className="task-link task no-flow task-edited" onClick={() => { }} to={`/b/${board._id}/card/${task.id}`}>
            {(task.bg) ? (task.bg.includes('url')) ? <div className="task-preview-photo edited-photo" style={{ background: task.bg }}></div> : <div className="task-preview-color edited" style={{ background: task.bg }}></div> : ''}
                <div className="labels">
                    {(labels) ? labels.map(label => <div key={label.id} className="label" style={{ backgroundColor: label.color }}></div>) : ''}
                </div>
                <form className="edit-task-form" onSubmit={(ev) => { onEditTask(ev, board, box, task) }}><textarea className="task-edit" {...register('title')} />
                    <button className="save-btn-edit">save</button></form>
                <EditTaskNav openTask={openTask} setIsEdit={setIsEdit} isEdit={isEdit} box={box} task={task} board={board} />
            </div>
        </div>}

        <Outlet />
    </div>
}