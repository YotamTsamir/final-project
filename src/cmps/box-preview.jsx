import { TaskList } from "./task-list"
import { useEffect, useState } from 'react'
import { useFormRegister } from "../hooks/useFormRegister"
import { boardService } from "../services/board.service"
import { useDispatch } from 'react-redux'
import { editBox, setNewBoard, editTask } from '../store/action/board-action'
import { Droppable } from "react-beautiful-dnd"
import { utilService } from "../services/util.service"


export const BoxPreview = ({ box, board, setEditTitleId, editTitleId, setAddNewTask, newTaskId }) => {
    const [register, newBoxTitle, EditBoxTitle] = useFormRegister({ title: box.title })
    const [registery, newTask, EditTask] = useFormRegister({ title: '' })

    const dispatch = useDispatch()

    useEffect(() => {
        // window.addEventListener('mousedown',onDown)
    })
    const setAddTask = () => {
        if (editTitleId !== '') setEditTitleId('')
        setAddNewTask(box.id)
    }

    const onAddTask = async (ev, boardId, boxId, input) => {
        ev.preventDefault()
        const task = { id: utilService.makeId(4), title: input, labelIds: [], description: '', color: '' }
        if (!input) {
            setAddNewTask('')
            return
        }
        const newBoard = await boardService.addTask(boardId, task, boxId)
        setAddNewTask(boxId)
        newTask.title = ''
        EditTask('')
        dispatch(setNewBoard(newBoard))
    }
    const onDown = () => {
    }

    const onEdit = () => {
        if (newTaskId !== '') setAddNewTask('')
        setEditTitleId(box.id)
    }

    const onEditBoxTitle = async (ev) => {
        ev.preventDefault()
        console.log(newBoxTitle.title)
        const newBox = { ...box, title: newBoxTitle.title }
        setEditTitleId('')
        dispatch(editBox(board._id, newBox))
    }


    if (!box) return <h1>Loading</h1>
    return <div className="box">
        {(box.id !== editTitleId) ? <h2 onClick={() => onEdit()} className="box-title">{box.title}</h2> :
            <form onSubmit={(ev) => { onEditBoxTitle(ev) }}><input className="box-title-edit" {...register('title')} /></form>}
        <Droppable droppableId={box.id}>
            {provided => {
                return (
                    <div ref={provided.innerRef}
                        {...provided.droppableProps}>

                        <TaskList

                            board={board} onAddTask={onAddTask} box={box} tasks={box.tasks}>
                        </TaskList>
                        {provided.placeholder}
                    </div>
                )
            }}
        </Droppable>
        {(box.id !== newTaskId) ? <div onClick={() => setAddTask()} className='add-card'>+ add a card</div> :
            <div><div className="task">
                <form onSubmit={(ev) => { onAddTask(ev, board._id, box.id, newTask.title) }}><input className="new-task-input" {...registery('title')} autoFocus /></form>
                </div>  <div><button onClick={(ev) => { onAddTask(ev, board._id, box.id, newTask.title) }} className="save-btn">Add card</button>
               
                    <button className="close-new-task" onClick={() => setAddNewTask('')}>X</button></div>
            </div>}
    </div>
}