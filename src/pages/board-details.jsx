import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { getBoard, setNewBoard, deleteBoard, editBox, editBoxes, editBoard, toggleFavourite } from '../store/action/board-action'
import { BoxList } from "../cmps/box-list"
import { utilService } from "../services/util.service"
import { boardService } from "../services/board.service"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import { useFormRegister } from "../hooks/useFormRegister"
import { BoardHeaderBar } from '../cmps/board-header-bar.jsx'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
// import { useDraggable } from "react-use-draggable-scroll"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from '@fortawesome/free-solid-svg-icons'

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
    }, [])

    useEffectUpdate(() => {
        if (!board._id) {
            navigate('/boards')
        }
    }, [board])


    const setAddBox = () => {
        setIsAdd(!isAdd)
    }

    const onDeleteBoard = async (boardId) => {
        dispatch(deleteBoard(boardId))
    }
    const onEditBoardStyle = async (boardId, field, change) => {
        const newBoard = await boardService.editBoardStyle(boardId, field, change)
        dispatch(setNewBoard(newBoard))
    }
    const onEditBoardTitle = async (boardId, field, change) => {
        const newBoard = await boardService.editBoardTitle(boardId, field, change)
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
        const newBoard = await boardService.updateBox(boardId, box)
        setIsAdd(false)
        EditBoxTitle('')
        dispatch(setNewBoard(newBoard))
    }
    const onDragEnd = (res) => {
        const { destination, source, draggableId } = res
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return
        if (res.type === 'box') {
            let currBoard = { ...board }
            let newBoxes = [...currBoard.boxes]
            if ((source.index - destination.index) < 1) {
                currBoard.boxes.map((box, index) => {
                    if (index < source.index) return
                    else if (index < destination.index) return newBoxes[index] = currBoard.boxes[index + 1]
                    else if (index === destination.index) return newBoxes[index] = currBoard.boxes[source.index]
                    else if (index === currBoard.boxes.length - 1) return newBoxes[index] = currBoard.boxes[index]
                })
            } else if ((source.index - destination.index) >= 1) {
                currBoard.boxes.map((box, index) => {
                    if (index > source.index) return
                    else if (index > destination.index) return newBoxes[index] = currBoard.boxes[index - 1]
                    else if (index === destination.index) return newBoxes[index] = currBoard.boxes[source.index]
                    else if (index === 0) return newBoxes[index] = currBoard.boxes[index]
                })
            }
            currBoard.boxes = [...newBoxes]
            dispatch(editBoard(currBoard))
            return
        }
        let currBox = board.boxes.find(box => box.id === destination.droppableId)
        if (destination.droppableId !== source.droppableId) {
            let oldBox = board.boxes.find(box => box.id === source.droppableId)
            const oldIdx = source.index
            currBox.tasks.splice(destination.index, 0, oldBox.tasks[oldIdx])
            oldBox.tasks.splice(oldIdx, 1)
            let oldBoxNew = { ...oldBox, tasks: [...oldBox.tasks] }
            let currBoxNew = { ...currBox, tasks: [...currBox.tasks] }
            dispatch(editBoxes(board._id, [currBoxNew, oldBoxNew]))
            return
        }
        let newBox = [...currBox.tasks]
        if ((source.index - destination.index) < 1) {
            currBox.tasks.map((task, index) => {
                if (index < source.index) return
                else if (index < destination.index) return newBox[index] = currBox.tasks[index + 1]
                else if (index === destination.index) return newBox[index] = currBox.tasks[source.index]
                else if (index === currBox.tasks.length - 1) return newBox[index] = currBox.tasks[index]
            })
        } else if ((source.index - destination.index) >= 1) {
            currBox.tasks.map((task, index) => {
                if (index > source.index) return
                else if (index > destination.index) return newBox[index] = currBox.tasks[index - 1]
                else if (index === destination.index) return newBox[index] = currBox.tasks[source.index]
                else if (index === 0) return newBox[index] = currBox.tasks[index]
            })
        }
        currBox.tasks = newBox
        dispatch(editBox(board._id, currBox))
    }

    if (!board || !board._id) return <h1>Loading...</h1>
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
                                <BoxList board={board} boxes={board.boxes} />
                                {(!isAdd) &&
                                    <div className="add-box before-click" onClick={() => setAddBox()}><span className="plus-sign">+</span> Add another list</div>}
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
        </DragDropContext>
    </div >
}
