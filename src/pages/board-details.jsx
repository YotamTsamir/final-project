import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { getBoard, setNewBoard, deleteBoard, editBox, editBoxes, editBoard, toggleFavourite } from '../store/action/board-action'
import { BoxList } from "../cmps/box-list"
import { utilService } from "../services/util.service"
import {dragService} from "../services/drag-service"
import { boardService } from "../services/board.service"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import { useFormRegister } from "../hooks/useFormRegister"
import { BoardHeaderBar } from '../cmps/board-header-bar.jsx'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'


export const Board = () => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    const [isAdd, setIsAdd] = useState(false)
    const [isBoardMenu, setIsBoardMenu] = useState(false)
    const [isMenuFilterOpen, setIsMenuFilterOpen] = useState(false)
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
        onFilterBoxes({})
    }, [board])


    const setAddBox = () => {
        setIsAdd(!isAdd)
    }

    const onFilterBoxes = async (filter) => {
        let boxList = board.boxes
        if (filter.filterBy) {
            boxList = await boardService.boxFilterByTaskAtt(boxList, filter)
        }
    }
    //CONNECT THESE TO 1 FUNC
    const onToggleMenu = () => {
        setIsBoardMenu(!isBoardMenu)
        if (isMenuFilterOpen) setIsMenuFilterOpen(!isMenuFilterOpen)
    }

    const onToggleFilter = () => {
        setIsMenuFilterOpen(!isMenuFilterOpen)
        if (isBoardMenu) setIsBoardMenu(!isBoardMenu)
    }

    const onDeleteBoard = async (boardId) => {
        dispatch(deleteBoard(boardId))
    }
    //INSERT TO THE ACTION
    const onEditBoard = async (boardId, field, change) => {
        const newBoard = await boardService.editBoardStyle(boardId, field, change)
        dispatch(setNewBoard(newBoard))
    }

    const onToggleStarBoard = async () => {
        dispatch(toggleFavourite(board._id))
    }
    // CHANGE UPDATE TO SAVE AND INSERT TO ACTION
    const onAddBox = async (ev, boardId) => {
        ev.preventDefault()
        if (!newBoxTitle.title) {
            setIsAdd(false)
            return
        }
        const box = { id: utilService.makeId(4), tasks: [], title: newBoxTitle.title }
        const newBoard = await boardService.saveBox(boardId, box)
        setIsAdd(false)
        EditBoxTitle('')
        dispatch(setNewBoard(newBoard))
    }

    const onDragEnd = (res) => {
        const { destination, source, draggableId } = res
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return
        if (res.type === 'box') {
          const currBoard =  dragService.changeBoxesPos(board,source,destination)
            dispatch(editBoard(currBoard))
            return
        }
        if (destination.droppableId !== source.droppableId) {
            const newOrder = dragService.moveTaskToOtherBox(board,source,destination)
            dispatch(editBoxes(board._id, newOrder))
            return
        }
        const currBox = dragService.moveTaskInBox(board,source,destination)
        dispatch(editBox(board._id, currBox))
    }
    //CHECK IF CURRENT STATE IS NEEDED, MOVE TO BOARDHEADER STATE?
    if (!board.boxes || !board._id) return <h1>Loading...</h1>
    return <div className="board-container" style={board.style}>
        <BoardHeaderBar
            board={board}
            deleteBoard={onDeleteBoard}
            dfBgs={boardService.getDefaultBgs()}
            onEditBoard={onEditBoard}
            onToggleMenu={onToggleMenu}
            isBoardMenu={isBoardMenu}
            onToggleFilter={onToggleFilter}
            isFilter={isMenuFilterOpen}
            onFilterBoxes={onFilterBoxes}
            onToggleStarBoard={onToggleStarBoard} />
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable className="board-cont" type="box" droppableId={board._id} direction="horizontal">
                {provided => {
                    return (
                        <div ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <div className="board">
                                <BoxList board={board} boxes={board.boxes} />
                                {(!isAdd) &&
                                    <div className="add-box before-click" onClick={() => setAddBox()}>
                                        <span className="plus-sign">+</span> Add another list
                                    </div>}

                                {isAdd && <div className="add-box"><form onSubmit={(ev) => { onAddBox(ev, board._id) }}>
                                    <input className="add-box-input" {...register('title')} />
                                    <button className="save-btn list-save">Add list</button>
                                    <button onClick={() => setAddBox()} className="close-new-task list-close">X</button>
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
