import { TaskPreview } from "./task-preview"
import { utilService } from '../services/util.service'
import { boardService } from "../services/board.service"
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { setNewBoard } from "../store/action/board-action"
import { useFormRegister } from "../hooks/useFormRegister"

export const TaskList = ({ tasks, board, box }) => {
    const [isAddTask, setIsAddTask] = useState(false)
    const [register, newTask, EditTask] = useFormRegister({ title: '' })
    const dispatch = useDispatch()

    const setAddTask = () => {
        isAddTask ? setIsAddTask(false) : setIsAddTask(true)
    }

    const onAddTask = async (ev,boardId, boxId,input) => {
        ev.preventDefault()
        const task = { id: utilService.makeId(4), title:input }
        const newBoard = await boardService.addTask(boardId, task, boxId)
        setAddTask()
        EditTask('')
        dispatch(setNewBoard(newBoard))
    }

    // if (!tasks.length) return <h1>Loading...</h1>
    return <div>
        {tasks.map(task => <TaskPreview board={board} key={task.id} task={task} />)}
        {(!isAddTask) ? <div onClick={() => setAddTask()} className='add-card'>+ add a card</div> :
            <div><form onSubmit={(ev) => { onAddTask(ev, board._id, box.id, newTask.title) }}><input {...register('title')} /></form></div>}
    </div>
}