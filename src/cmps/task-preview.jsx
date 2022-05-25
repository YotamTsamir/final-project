import { NavLink } from "react-router-dom"
import { useState } from 'react'
import { boardService } from "../services/board.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Route, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { toggleDetails } from "../store/action/board-action"
import { useFormRegister } from "../hooks/useFormRegister"
import { setNewBoard } from "../store/action/board-action"

export const TaskPreview = ({ task, board,box }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [register, newBoxTitle, EditBoxTitle] = useFormRegister({ title: task.title })

    const dispatch = useDispatch()

    const onToggleDetails = (task) => {
        dispatch(toggleDetails(task))
    }

    const onEditTaskTitle = async (ev) => {
        ev.preventDefault()
        const newBoard = await boardService.editTaskTitle(board._id, box, task, newBoxTitle.title)
        onEditTask()
        dispatch(setNewBoard(newBoard))
    }

    const onEditTask = (ev) => {
        (isEdit) ? setIsEdit(false) : setIsEdit(true)
    }


    return (!isEdit) ? <div className="task-link task flex space-between" onClick={() => onToggleDetails(task)} to={`/b/${board._id}/card/${task.id}`}>
        <p>{task.title}</p>
        <div onClick={(ev) => ev.stopPropagation()} className="edit-fav"><FontAwesomeIcon onClick={(ev) => { onEditTask() }} icon={faPen} /></div>
    </div> : <div className="task-link task flex space-between" onClick={() => onToggleDetails(task)} to={`/b/${board._id}/card/${task.id}`}>
        <form onSubmit={(ev) => { onEditTaskTitle(ev) }}><input {...register('title')} /></form>
    </div>
}