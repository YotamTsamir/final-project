import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { getBoard, setNewBoard, deleteBoard } from '../store/action/board-action'
import { BoxList } from "../cmps/box-list"
import { utilService } from "../services/util.service"
import { boardService } from "../services/board.service"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import { useFormRegister } from "../hooks/useFormRegister"
import { TaskDetails } from "../cmps/task-details"
import { BoardHeaderBar } from '../cmps/board-header-bar.jsx'
import { DragDropContext } from 'react-beautiful-dnd'

export const Board = () => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    const [isAdd, setIsAdd] = useState(false)
    const [isBoardMenu, setIsBoardMenu] = useState(false)
    const [isFilter, setIsFilter] = useState(false)
    const [boxes, setBoxes] = useState([])
    const [register, newBoxTitle, EditBoxTitle] = useFormRegister({ title: '' })
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let isClick = false
    let posX
    let x = 0


    useEffect(() => {
        const { boardId } = params
        addMouseListeners()
        dispatch(getBoard(boardId))
    }, [])

    useEffectUpdate(() => {
        if (!board._id) navigate('/boards')
        onFilterBoxes({})
    }, [board])


    const addMouseListeners = () => {
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mousedown', onDown)
        window.addEventListener('mouseup', onUp)
    }

    const onDown = (ev) => {
        isClick = true
        posX = ev.pageX
    }

    const onUp = () => {
        isClick = false
    }

    const onMove = (ev) => {
        ev.preventDefault()
        if (!isClick) {
            return
        }
        else if (ev.pageX > posX) {
            posX = ev.pageX
            x -= 1
            window.scroll(x, 0)
        }
        else {
            posX = ev.pageX
            x += 1
            window.scroll(x, 0)
        }
    }

    const setAddBox = () => {
        isAdd ? setIsAdd(false) : setIsAdd(true)
    }

    const onFilterBoxes = async (filter) => {
        let boxList = board.boxes
        if (filter.filterBy) {
            boxList = boxList.filter(box => {
                return box.title.includes(filter.value)
            })
        }
        setBoxes(boxList)
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
    const onDragEnd = () => {

    }



    if (!boxes) return <h1>Loading...</h1>
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
                isFilter={isFilter}
                onFilterBoxes={onFilterBoxes} />
        </header>

        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
                <BoxList board={board} boxes={boxes} />
                {(!isAdd) && <div className="add-box" onClick={() => setAddBox()}>+ add another list</div>}
                {isAdd && <div className="add-box"><form onSubmit={(ev) => { onAddBox(ev, board._id) }}><input {...register('title')} /></form></div>}
            </div>
        </DragDropContext>
    </div>
}





