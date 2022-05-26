import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { boardService } from "../services/board.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Route, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setTask, toggleDetails } from "../store/action/board-action"
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
        setLabels(getLabels)
    }, [task])

    // const onToggleDetails = (task) => {
    //     dispatch(toggleDetails(task))
    // }

    const onEditTaskTitle = async (ev) => {
        ev.preventDefault()
        if (!newBoxTitle.title) {
            setIsEdit(!isEdit)
            return
        }
        // setLabels(getLabels)
        const newBoard = await boardService.editTaskTitle(board._id, box, task, newBoxTitle.title)
        setIsEdit(!isEdit)
        dispatch(setNewBoard(newBoard))
    }


    const onSetTask = (box) => {
        dispatch(setTask(task, box))
        navigate(`task/${task.id}`)
    }

    const onEditTask = (ev) => {
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
                    <FontAwesomeIcon onClick={(ev) => onEditTask(ev)} icon={faPen} />
                </div>
            </div>
        </div>}
        {(isEdit) && <div className="task-link task" onClick={() => { }} to={`/b/${board._id}/card/${task.id}`}>
            <div className="labels">
                {(labels) ? labels.map(label => <div key={label.id} className="label" style={{ backgroundColor: label.color }}></div>) : ''}
            </div>
            <form onSubmit={(ev) => { onEditTaskTitle(ev) }}><input className="task-edit" {...register('title')} /></form>
            <EditTaskNav setIsEdit={setIsEdit} onEditTaskTitle={onEditTaskTitle} box={box} task={task} board={board} />
        </div>}

        <Outlet />
    </div>
}