import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { boardService } from "../services/board.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Route, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setTask } from "../store/action/board-action"
import { useFormRegister } from "../hooks/useFormRegister"
import { setNewBoard } from "../store/action/board-action"

export const TaskPreview = ({ task, board, box }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [register, newBoxTitle, EditBoxTitle] = useFormRegister({ title: task.title })
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const onEditTaskTitle = async (ev) => {
        ev.preventDefault()
        const newBoard = await boardService.editTaskTitle(board._id, box, task, newBoxTitle.title)
        onEditTask()
        dispatch(setNewBoard(newBoard))
    }


    const onSetTask = async (task, box) => {
        await dispatch(setTask(task, box))
        navigate(`task/${task.id}`)
    }
    const onEditTask = (ev) => {
        // ev.stopPropagation()
        setIsEdit(!isEdit) 
    }


    return <div>
        {(!isEdit) ? <div onClick={()=>{onSetTask(task, box)}} className=" task flex" to={`/b/${board._id}/card/${task.id}`}>
            <p >{task.title}</p>
            <div className="edit-fav">
                <FontAwesomeIcon onClick={(ev) => onEditTask(ev)} icon={faPen} />
            </div>
        </div> : <div className="task-link task flex space-between" to={`/b/${board._id}/card/${task.id}`}>
            <form onSubmit={(ev) => { onEditTaskTitle(ev) }}><input autoFocus {...register('title')} /></form>
        </div>}
        <Outlet/>
    </div>
}