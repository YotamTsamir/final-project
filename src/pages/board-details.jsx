import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { getBoard, setNewBoard, deleteBoard, editBox } from '../store/action/board-action'
import { BoxList } from "../cmps/box-list"
import { utilService } from "../services/util.service"
import { boardService } from "../services/board.service"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import { useFormRegister } from "../hooks/useFormRegister"
import { TaskDetails } from "../cmps/task-details"
import { BoardHeaderBar } from '../cmps/board-header-bar.jsx'
import { BoardMenu } from '../cmps/board-menu.jsx'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDraggable } from "react-use-draggable-scroll"

export const Board = () => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    const [isAdd, setIsAdd] = useState(false)
    // const ref = useRef()
    // const { events } = useDraggable(ref)

    const [isBoardMenu, setIsBoardMenu] = useState(false)
    const [isFilter, setIsFilter] = useState(false)
    const [boxes, setBoxes] = useState([])
    const [register, newBoxTitle, EditBoxTitle] = useFormRegister({ title: '' })
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()



    useEffect(() => {
        const { boardId } = params
        dispatch(getBoard(boardId))
        onFilterBoxes()
    }, [])

    useEffectUpdate(() => {
        if (!board._id) navigate('/boards')
    }, [board])


    const setAddBox = () => {
        setIsAdd(!isAdd)
    }

    const onFilterBoxes = (filter) => {
        setBoxes(board.boxes)
    }

    const onToggleMenu = () => {
        setIsBoardMenu(!isBoardMenu)
        if (isFilter) setIsFilter(!isFilter)
    }
    const onToggleFilter = () => {
        setIsFilter(!isFilter)
        if (isBoardMenu) setIsBoardMenu(!isBoardMenu)
    }
    const onDeleteBoard = async (boardId) => {
        dispatch(deleteBoard(boardId))

    }
    const onEditBoard = async (boardId, field, change) => {
        const newBoard = await boardService.editBoardStyle(boardId, field, change)
        dispatch(setNewBoard(newBoard))
    }


    const onAddBox = async (ev, boardId) => {
        ev.preventDefault()
        if (!newBoxTitle.title) {
            setIsAdd(false)
            return
        }
        const box = { id: utilService.makeId(4), tasks: [], title: newBoxTitle.title }
        const newBoard = await boardService.addBox(boardId, box)
        setIsAdd(false)
        EditBoxTitle('')
        dispatch(setNewBoard(newBoard))
    }
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return
        console.log('destination is', destination)
        console.log('source is ', source)
        let currBox = board.boxes.find(box => box.id === destination.droppableId)
        if (destination.droppableId !== source.droppableId) {
            console.log(currBox)
            let oldBox = board.boxes.find(box => box.id === source.droppableId)
            let oldBoxNew = [...oldBox.tasks]
            let currBoxNew = [...currBox.tasks]
            let oldIdx = source.index
            currBoxNew.splice(destination.index,1,oldBox.tasks[oldIdx])
            oldBoxNew.splice(oldIdx,1)
            oldBox.tasks = oldBoxNew
            currBox.tasks = currBoxNew
            dispatch(editBox(board._id,oldBox))
            dispatch(editBox(board._id, currBox))
            return
        }
        console.log(destination.droppableId, source.droppableId)
        let newBox = [...currBox.tasks]
        if ((source.index - destination.index) < 1) {
            currBox.tasks.map((task, index) => {
                console.log('yesssss')
                if (index < source.index) return
                if (index < destination.index) return newBox[index] = currBox.tasks[index + 1]
                if (index === destination.index) return newBox[index] = currBox.tasks[source.index]
                if (index === currBox.tasks.length - 1) return newBox[index] = currBox.tasks[index]
                // console.log(index)
            })
        } else if ((source.index - destination.index) >= 1) {
            currBox.tasks.map((task, index) => {
                if (index > source.index) return
                if (index > destination.index) return newBox[index] = currBox.tasks[index - 1]
                if (index === destination.index) return newBox[index] = currBox.tasks[source.index]
                if (index === 0) return newBox[index] = currBox.tasks[index]
            })
        }

        currBox.tasks = newBox
        console.log('new box is', newBox)
        dispatch(editBox(board._id, currBox))
        // console.log(board)
    }

    if (!board.boxes) return <h1>Loading...</h1>
    return <div className="board-container" style={board.style}>
        <header >
            <h1 className="board-title">{board.title}</h1>
            <BoardHeaderBar
                board={board}
                deleteBoard={onDeleteBoard}
                dfBgs={boardService.getDefaultBgs()}
                onEditBoard={onEditBoard}
                onToggleMenu={onToggleMenu}
                isBoardMenu={isBoardMenu}
                onToggleFilter={onToggleFilter}
                isFilter={isFilter} />
        </header>

        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
                <BoxList board={board} boxes={board.boxes} />
                {(!isAdd) && 
                <div className="add-box before-click" onClick={() => setAddBox()}>+ Add another list</div>}
                {isAdd && <div className="add-box"><form onSubmit={(ev) => { onAddBox(ev, board._id) }}>
                    <input className="add-box-input" {...register('title')} />
                    <button className="save-btn list-save">Add list</button>
                    <button onClick={() => setAddBox()} className="close-new-task list-close">X</button>
                </form></div>}

            </div>
        </DragDropContext>
    </div>

    {/* if (!board || board && !board.boxes) return <h1>Loading...</h1>
    return <div className="board-container" style={board.style}>
        <header >
            <h1 className="board-title">{board.title}</h1>
            <div className="board-bar">
                <button className="menu-btn">
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
        </header>
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
                <BoxList board={board} boxes={board.boxes} />
                {(!isAdd) ? <div className="add-box" onClick={() => setAddBox()}>+ add another list</div> :
                <div className="add-box"><form onSubmit={(ev) => { onAddBox(ev, board._id) }}><input {...register('title')} /></form></div>}
            </div>
        </DragDropContext>
    </div> */}
}

// const onDown = (ev) => {
//     isClick = true
//     posX = ev.pageX
// }

// const onUp = () => {
//     isClick = false
// }

// const onMove = (ev) => {
//     ev.preventDefault()
//     if (!isClick) {
//         return
//     }
//     else if (ev.pageX > posX) {
//         posX = ev.pageX
//         x -= 1
//         window.scroll(x, 0)
//     }
//     else {
//         posX = ev.pageX
//         x += 1
//         window.scroll(x, 0)
//     }
// }
// const addMouseListeners = () => {
//     window.addEventListener('mousemove', onMove)
//     window.addEventListener('mousedown', onDown)
//     window.addEventListener('mouseup', onUp)
// }
// let isClick = false
// let posX
// let x = 0







