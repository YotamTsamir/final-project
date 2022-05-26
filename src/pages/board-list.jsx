import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from "../services/board.service"
import { loadBoards, addBoard, deleteBoard } from '../store/action/board-action'
import { BoardAdd } from '../cmps/board-add.jsx'
import { BoardThumbnailPreview } from '../cmps/board-thumbnail-preview.jsx'

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

    const onAddBoard = async (board) => {
        setIsAddBoardOpen(!isAddBoardOpen)
        dispatch(addBoard(board))
    }

    const onRemoveBoard = async (boardId) => {
        dispatch(deleteBoard(boardId))
    }


    if (!boards) return <div>Loading...</div>
    return <div className="board-list">
        <h2>Your Projects</h2>
        <div className="boards-container">
            <div className="board-prev board-new"
                onClick={() => setIsAddBoardOpen(!isAddBoardOpen)}>
                <p> ➕ New board </p>
            </div>
            {isAddBoardOpen && <BoardAdd
                onToggleAddBoard={onToggleAddBoard}
                onAddBoard={onAddBoard}
                dfBgs={boardService.getDefaultBgs()} />}

            {boards.map((board, idx) => {
                return <BoardThumbnailPreview board={board}
                    onRemove={onRemoveBoard} />
            })}
        </div>
    </div>
}