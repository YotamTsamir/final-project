import { TaskList } from "./task-list"
import { useState } from 'react'
import { useFormRegister } from "../hooks/useFormRegister"
import { boardService } from "../services/board.service"
import { useDispatch } from 'react-redux'
import { setNewBoard } from '../store/action/board-action'


export const BoxPreview = ({ box, board, onAddTask }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [register, newBoxTitle, EditBoxTitle] = useFormRegister({ title: box.title })
    const dispatch = useDispatch()


    const onEdit = () => {
        isEdit ? setIsEdit(false) : setIsEdit(true)
    }

    const onEditBoxTitle = async (ev) => {
        ev.preventDefault()
        console.log(newBoxTitle.title)
        const newBoard = await boardService.editBoxTitle(board._id, box, newBoxTitle.title)
        onEdit()
        dispatch(setNewBoard(newBoard))
    }


    if (!box) return <h1>Loading</h1>
    return <div className="box">
        {(!isEdit) ? <h2 onClick={() => onEdit()} className="box-title">{box.title}</h2> : <form onSubmit={(ev) => { onEditBoxTitle(ev) }}><input {...register('title')} /></form>}
        <TaskList board={board} onAddTask={onAddTask} box={box} tasks={box.tasks} />
    </div>
}