import { NavLink } from "react-router-dom"
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Route, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { toggleDetails } from "../store/action/board-action"

export const TaskPreview = ({ task, board }) => {
    const [isEdit,setIsEdit] = useState(false)
    
        const dispatch = useDispatch()
    
        const onToggleDetails = (task) => {
            dispatch(toggleDetails(task))
        }
    
    const onEditTask = (ev) => {
        ev.stopPropagation()
    }

    return <div className="task-link task flex space-between" onClick={()=> onToggleDetails(task)} to={`/b/${board._id}/card/${task.id}`}>
        <div className="task">
            <p>{task.title}</p>
            <div onClick={(ev) => { onEditTask(ev) }} className="edit-fav"><FontAwesomeIcon icon={faPen} /></div>
        </div>
    </div>
}