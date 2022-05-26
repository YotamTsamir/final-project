import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { boardService } from "../services/board.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Route, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setTask, toggleDetails, editTask } from "../store/action/board-action"
import { useFormRegister } from "../hooks/useFormRegister"
import { setNewBoard } from "../store/action/board-action"
import { EditTaskNav } from "./edit-task-nav"

export const TaskPreview = ({ task, board, box }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [register, newBoxTitle, EditBoxTitle] = useFormRegister({ title: task.title })
    const [labels, setLabels] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        // window.addEventListener('mousedown', onDown)
        setLabels(getLabels)
    }, [task])

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
        console.log(task.labelIds)
        const taskLabels = task.labelIds.map(labelId => boardService.getLabelById(labelId, board))
        return taskLabels
    }


    return <div>

        {(!isEdit) && <div onClick={() => { }} className=" task " to={`/b/${board._id}/card/${task.id}`}>
            <div className="labels">
                {(labels) ? labels.map(label => <div key={label.id} className="label" style={{ backgroundColor: label.color }}></div>) : ''}
            </div>
            <div className="flex space-between" onClick={() => { onSetTask(box) }}>
                <p >{task.title}</p>
                <div className="edit-fav">
                    <FontAwesomeIcon onClick={(ev) => onOpenEditTask(ev)} icon={faPen} />
                </div>
            </div>
        </div>}
        {(isEdit) && <div>
            <div onClick={() => { onDown() }} className="the-great-one"></div><div className="task-link task task-edited" onClick={() => { }} to={`/b/${board._id}/card/${task.id}`}>
                <div className="labels">
                    {(labels) ? labels.map(label => <div key={label.id} className="label" style={{ backgroundColor: label.color }}></div>) : ''}
                </div>
                <form onSubmit={(ev) => { onEditTask(ev, board, box, task) }}><input className="task-edit" {...register('title')} />
                    <button className="save-btn-edit">save</button></form>
                <EditTaskNav openTask={openTask} setIsEdit={setIsEdit} box={box} task={task} board={board} />
            </div>
        </div>}

        <Outlet />
    </div>
}