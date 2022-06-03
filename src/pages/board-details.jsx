import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useFormRegister } from "../hooks/useFormRegister"
import { Outlet } from "react-router-dom"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import { socketService, SOCKET_EVENT_LOAD_BOARD, SOCKET_EVENT_SET_BOARD } from "../services/socket.service"
import { BoxList } from "../cmps/box-list"
import { BoardHeaderBar } from '../cmps/board-header-bar.jsx'
import { utilService } from "../services/util.service"
import { dragService } from "../services/drag-service"
import { boardService } from "../services/board.service"
import { getBoard, setNewBoard, deleteBoard, editBox, editBoxes, editBoard, toggleFavourite, addBox, editTask } from '../store/action/board-action'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from '@fortawesome/free-solid-svg-icons'
import { userService } from "../services/user-service"
// import { useDraggable } from "react-use-draggable-scroll"

export const Board = () => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    const [isAdd, setIsAdd] = useState(false)
    const [register, newBoxTitle, EditBoxTitle] = useFormRegister({ title: '' })
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const { boardId } = params
        dispatch(getBoard(boardId))
        socketService.emit(SOCKET_EVENT_SET_BOARD, board?._id);
        socketService.off(SOCKET_EVENT_LOAD_BOARD);
        socketService.on(SOCKET_EVENT_LOAD_BOARD, updateBoard);
        return () => {
            socketService.off(SOCKET_EVENT_LOAD_BOARD, updateBoard)
        }

    }, [])
    const updateBoard = (board) => {
        dispatch(setNewBoard(board))
    }

    useEffectUpdate(() => {
        if (!board?._id) {
            navigate('/boards')
        }
    }, [board])

    const addActivity = (activity, board) => {
        const newBoard = { ...board, activities: [...board.activities || [], activity] }
        return newBoard
    }

    const setAddBox = () => {
        setIsAdd(!isAdd)
    }

    const onDeleteBoard = async (boardId) => {
        dispatch(deleteBoard(boardId))
    }

    //move to action
    const onEditBoardStyle = async (boardId, field, change) => {
        const newBoard = await boardService.editBoardStyle(boardId, field, change)
        socketService.emit(SOCKET_EVENT_LOAD_BOARD, newBoard)
        dispatch(setNewBoard(newBoard))
    }
    const onEditBoardTitle = async (boardId, field, change) => {
        const newBoard = await boardService.editBoardTitle(boardId, field, change)
        socketService.emit(SOCKET_EVENT_LOAD_BOARD, newBoard)
        dispatch(setNewBoard(newBoard))
    }

    const onToggleStarBoard = async () => {
        dispatch(toggleFavourite(board._id))
    }

    const onAddBox = async (ev, boardId) => {
        ev.preventDefault()
        if (!newBoxTitle.title) {
            setIsAdd(false)
            return
        }
        const box = { id: utilService.makeId(4), tasks: [], title: newBoxTitle.title }
        const user = userService.getLoggedinUser()
        const activity = { user, action: `added`, id: utilService.makeId(), object: box, about: 'to his board', timeStamp: Date.now() }
        setIsAdd(false)
        EditBoxTitle({ title: '' })
        // const newBoard = await boardService.saveBox(boardId, box)
        dispatch(addBox(boardId, box, activity))

        // dispatch(setNewBoard(updatedBoard))
    }
    const onDragEnd = (res) => {
        const { destination, source, draggableId } = res
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return
        if (res.type !== 'box' && res.type !== 'task') {
            const newTask = dragService.moveTodoInChecklist(board, res.type.box, res.type.task, destination.droppableId, source, destination)
            dispatch(editTask(board._id,res.type.box.id,newTask)) 
            return
        }
        if (res.type === 'box') {
            const currBoard = dragService.changeBoxesPos(board, source, destination)
            dispatch(editBoard(currBoard))
            return
        }
        else if (destination.droppableId !== source.droppableId) {
            const destinationBox = board.boxes.find(box => box.id === destination.droppableId)
            const originBox = board.boxes.find(box => box.id === source.droppableId)
            console.log(originBox)
            console.log('task is', source)
            const user = userService.getLoggedinUser()
            const activity = { user, action: `moved`, id: utilService.makeId(), object: originBox.tasks[source.index], about: `from ${originBox.title} to ${destinationBox.title}`, timeStamp: Date.now() }
            const newOrder = dragService.moveTaskToOtherBox(board, source, destination)
            dispatch(editBoxes(board._id, newOrder, activity))
            return
        }
        const currBox = dragService.moveTaskInBox(board, source, destination)
        dispatch(editBox(board._id, currBox))
    }

    if (!board?.boxes || !board?._id) return <h1>Loading...</h1>
    return <div className="board-container" style={board.style}>
        <BoardHeaderBar
            board={board}
            deleteBoard={onDeleteBoard}
            onEditBoardStyle={onEditBoardStyle}
            onToggleStarBoard={onToggleStarBoard}
            onEditBoardTitle={onEditBoardTitle} />
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable className="board-cont" type="box" droppableId={board._id} direction="horizontal">
                {provided => {
                    return (
                        <div ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <div className="board">
                                <BoxList addActivity={addActivity} board={board} boxes={board.boxes} />
                                {(!isAdd) &&
                                    <div className="add-box before-click" onClick={() => setAddBox()}>
                                        <span className="plus-sign">+</span> Add another list
                                    </div>}

                                {isAdd && <div className="add-box"><form onSubmit={(ev) => { onAddBox(ev, board._id) }}>
                                    <input className="add-box-input" {...register('title')} />
                                    <button className="save-btn list-save">Add list</button>
                                    <button onClick={() => setAddBox()} className="close-new-task list-close">
                                        <FontAwesomeIcon icon={faX} />
                                    </button>
                                </form></div>}
                            </div>
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
            <Outlet />
        </DragDropContext>
    </div >
}
