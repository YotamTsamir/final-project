import { NavLink } from "react-router-dom"

export const TaskPreview = ({ task,board }) => {
    return <NavLink className={'task-link'} to={`/b/${board._id}/card/${task.id}`}>
        <div className="task">
            <p>{task.title}</p>
        </div>
    </NavLink>
}