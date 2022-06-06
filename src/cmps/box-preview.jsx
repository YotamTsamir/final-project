import { TaskList } from "./task-list"
import { useEffect, useState } from 'react'
import { useFormRegister } from "../hooks/useFormRegister"
import { boardService } from "../services/board.service"
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { editBox, addTask, setNewBoard, editTask } from '../store/action/board-action'
import { Droppable, Draggable } from "react-beautiful-dnd"
import { utilService } from "../services/util.service"
import { BoardExtrasMenu } from "./board-extras-menu"
import { socketService, SOCKET_EVENT_LOAD_BOARD } from "../services/socket.service"
import { userService } from "../services/user-service"

export const BoxPreview = ({ labelFilter, newBoardFilter, box, board, setEditTitleId, editTitleId, setAddNewTask, newTaskId }) => {
    const [boardExtrasMenu, setBoardExtrasMenu] = useState(false)
    const [register, newBoxTitle, EditBoxTitle] = useFormRegister({ title: box.title })
    const [registery, newTask, EditTask] = useFormRegister({ title: '' })

    const dispatch = useDispatch()

    const setAddTask = () => {
        if (editTitleId !== '') setEditTitleId('')
        setAddNewTask(box.id)
    }

    const onAddTask = async (ev, boardId, boxId, input) => {
        ev.preventDefault()
        const task = { id: utilService.makeId(4), archivedAt: '', checkLists: [], members: [], isFull: false, title: input, labelIds: [], date: '', comments: [], description: '', color: '' }
        console.log(task)
        if (!input) return setAddNewTask('')
        setAddNewTask(boxId)
        EditTask({ title: '' })
        const board = await boardService.saveTask(boardId, task, boxId)
        const user = userService.getLoggedinUser()
        const activity = { user: userService.getMiniUser(), action: `added `, id: utilService.makeId(), isRead: false, object: task, about: `to ${box.title}`, timeStamp: Date.now() }
        const boardAndActivity = { board, activity }

        socketService.emit(SOCKET_EVENT_LOAD_BOARD, boardAndActivity)
        dispatch(addTask(boardId, task, boxId, activity))
    }

    const onEdit = () => {
        if (newTaskId !== '') setAddNewTask('')
        setEditTitleId(box.id)
    }

    const onEditBoxTitle = async (ev) => {
        ev.preventDefault()
        const newBox = { ...box, title: newBoxTitle.title }
        setEditTitleId('')
        dispatch(editBox(board._id, newBox))
    }

    if (!box) return <h1>Loading</h1>
    return <div className="box">
        <div className="box-header flex space-between">
            {(box.id !== editTitleId) ? <h2 onClick={() => onEdit()} className="box-title">{box.title}</h2> :
                <form onSubmit={(ev) => { onEditBoxTitle(ev) }}><input className="box-title-edit" {...register('title')} /></form>}
            <div onClick={() => setBoardExtrasMenu(!boardExtrasMenu)} className="extras-menu">
                <FontAwesomeIcon className="extra-menu-btn three-dot" icon={faEllipsis} />
            </div>
            {(boardExtrasMenu) && <BoardExtrasMenu board={board} box={box} setBoardExtrasMenu={setBoardExtrasMenu} setAddTask={setAddTask} />}
        </div>
        <Droppable type="task" droppableId={box.id}>
            {provided => {
                return (
                    <div ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="task-list-wraper">
                        <TaskList
                            labelFilter={labelFilter} newBoardFilter={newBoardFilter} board={board} onAddTask={onAddTask} box={box} tasks={box.tasks}>
                        </TaskList>


                        {provided.placeholder}
                    </div>
                )
            }}
        </Droppable>
        {(box.id !== newTaskId) ?
            <div onClick={() => setAddTask()} className='add-card'>+ Add a card</div> :
            <div>
                <div className="task task-add">
                    <form onSubmit={(ev) => { onAddTask(ev, board._id, box.id, newTask.title) }}><textarea className="task-edit" {...registery('title')} autoFocus /></form>
                </div>
                <div>
                    <button
                        onClick={(ev) => { onAddTask(ev, board._id, box.id, newTask.title) }} className="save-btn">
                        Add card
                    </button>

                    <button className="close-new-task" onClick={() => setAddNewTask('')}>X</button></div>
            </div>}
    </div>

}