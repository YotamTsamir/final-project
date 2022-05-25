import { NavLink } from "react-router-dom"
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards } from '../store/action/board-action'
import { BoardAdd } from '../cmps/board-add.jsx'

export const BoardList = () => {
    const [isAddBoardOpen, setState] = useState(false)
    const { boards } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBoards())
    }, [])


    if (!boards) return <div>Loading...</div>
    return <div className="board-list">
        <h2>Your Projects</h2>
        <div className="boards-container">
            <div className="board-prev board-new"
                onClick={() => setState(!isAddBoardOpen)}>
                ➕ New board
                {isAddBoardOpen ? <BoardAdd /> : ''}
            </div>

            {boards.map(board => {
                return <NavLink to={`/b/${board._id}`}
                    className="board-prev">
                    <div>
                        <p>{board.title}</p>
                    </div>
                </NavLink>
            })}
        </div>
    </div>
}