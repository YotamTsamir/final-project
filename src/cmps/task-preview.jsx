import { NavLink } from "react-router-dom"
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export const TaskPreview = ({ task, board }) => {
    const [isEdit,setIsEdit] = useState(false)

    const onEditTask = (ev) => {
        ev.stopPropagation()
    }

    return <div className="task flex space-between">
    {/* <NavLink className={'task-link'} to={`/b/${board._id}/card/${task.id}`}> */}
            <p>{task.title}</p>
            <div onClick={(ev) => { onEditTask(ev) }} className="edit-fav"><FontAwesomeIcon icon={faPen} /></div>
        </div>
    {/* </NavLink> */}
}