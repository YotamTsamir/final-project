import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {  useSelector,useDispatch } from 'react-redux'
import {getBoard} from '../store/action/board-action'
import { BoxList } from "../cmps/box-list"
import { utilService } from "../services/util.service"
import { boardService } from "../services/board.service"

export const Board = () => {
    const [currBoard,setCurrBoard] = useState({})
    const { board } = useSelector((storeState) => storeState.boardModule)
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const {boardId} = params
        dispatch(getBoard(boardId))
        setCurrBoard(board)
    }, [])

    const onAddTask = (boardId, boxId) => {
        const task = {id:utilService.makeId(4),title:prompt('what would you like to do?')}
        boardService.addTask(boardId, task, boxId)
        boardService.save(board)
        dispatch(getBoard(boardId))
        setCurrBoard(board)
    }


    // console.log(board)
    if(!board.boxes) return <h1>Loading...</h1>
    return <div className="board">
        <BoxList board={board} onAddTask={onAddTask} boxes={board.boxes}/>
    </div>
}