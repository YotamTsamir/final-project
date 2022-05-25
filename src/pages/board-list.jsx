import { boardService } from "../services/board.service"
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards } from '../store/action/board-action'
import { BoardAdd } from '../cmps/board-add.jsx'
import { NavLink } from "react-router-dom"

export const BoardList = () => {
    const [isAddBoardOpen, setIsAddBoardOpen] = useState(false)
    const { boards } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    const onToggleAddBoard = () => {
        setIsAddBoardOpen(!isAddBoardOpen)
    }

    const onAddBoard = (board) => {
        boardService.addBoard(board)
        setIsAddBoardOpen(!isAddBoardOpen)
    }


    if (!boards) return <div>Loading...</div>
    return <div className="board-list">
        <h2>Your Projects</h2>
        <div className="boards-container">
            <div className="board-prev board-new"
                onClick={() => setIsAddBoardOpen(!isAddBoardOpen)}>
               <p> ➕ New board </p>
            </div>
            {isAddBoardOpen ? <BoardAdd
                onToggleAddBoard={onToggleAddBoard} 
                onAddBoard={onAddBoard}
                dfBgs={boardService.getDefaultBgs()}/> : ''}

            {boards.map(board => {
                return <NavLink to={`/b/${board._id}`}
                key={board._id}
                    className="board-prev"
                    style={board.style}>
                    <div>
                        <p>{board.title}</p>
                    </div>
                </NavLink>
            })}
        </div>
    </div>
}