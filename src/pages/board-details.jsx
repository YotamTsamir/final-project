import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { getBoard, setNewBoard } from '../store/action/board-action'
import { BoxList } from "../cmps/box-list"
import { utilService } from "../services/util.service"
import { boardService } from "../services/board.service"
import { TaskDetails } from "../cmps/task-details"

export const Board = () => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    // const [isClick, setIsClick] = useState(false)
    const [windowPos, setWindowPos] = useState('')
    const params = useParams()
    const dispatch = useDispatch()
    let isClick = false
    let posX
    let x = 0


    useEffect(() => {
        const { boardId } = params
        addMouseListeners()
        setWindowPos(0)
        dispatch(getBoard(boardId))
    }, [])

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
        if (isClick === false) {
            return
        }
        else if (ev.pageX > posX) {
            posX = ev.pageX
            x-=1
            window.scroll(x, 0)

        }
        else {
            posX = ev.pageX
            x+=1
            window.scroll(x, 0)
        }
      
    }

    const onAddTask = async (boardId, boxId) => {
        const task = { id: utilService.makeId(4), title: prompt('what would you like to do?') }
        const newBoard = await boardService.addTask(boardId, task, boxId)
        dispatch(setNewBoard(newBoard))
        console.log(board)
    }

    const onAddBox = async (boardId) => {
        const box = { id: utilService.makeId(4), tasks: [], title: prompt('box title?') }
        const newBoard = await boardService.addBox(boardId, box)
        dispatch(setNewBoard(newBoard))
    }
    

    console.log(board)
    if (!board.boxes) return <h1>Loading...</h1>
    return <div className="board">
        <BoxList board={board} onAddTask={onAddTask} boxes={board.boxes} />
        <TaskDetails />
        <div className="add-box" onClick={() => onAddBox(board._id)}>+ add another list</div>
    </div>
}





