import { NavLink } from "react-router-dom"
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {loadBoards} from '../store/action/board-action'


export const BoardList = () => {
    const [isSomthing, setIsSomthing] = useState(false)
    const {boards} = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()
    console.log(boards)

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    return <div className="board-list">
        <h2>Board List</h2>
        <div className="boards-container">
        <div className="board-prev board-new">
            <p>
            ➕ New board
            </p>
            </div>
        {/* {boards.map(board => {
            return <NavLink to={`/b/${board.id}`}
            className="board-prev">
                {board.title}
            </NavLink>
        })} */}
        </div>
    </div>
}