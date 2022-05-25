import { NavLink } from "react-router-dom"
import { Route, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { toggleDetails } from "../store/action/board-action"
export const TaskPreview = ({ board, task }) => {
    const dispatch = useDispatch()

    const onToggleDetails = (task) => {
        dispatch(toggleDetails(task))
    }
    return <div onClick={()=> onToggleDetails(task)} className={'task-link'} to={`/b/${board._id}/card/${task.id}`}>
        <div className="task">
            <p>{task.title}</p>
        </div>
    </div>
}