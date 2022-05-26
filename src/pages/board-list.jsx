import { boardService } from "../services/board.service"
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards } from '../store/action/board-action'
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
        await boardService.addBoard(board)
        setIsAddBoardOpen(!isAddBoardOpen)
        dispatch(loadBoards())
    }

    const onRemoveBoard = async (boardId) => {
        await boardService.remove(boardId)
        dispatch(loadBoards())
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
                return <BoardThumbnailPreview key={idx} board={board}
                    onRemove={onRemoveBoard} />
            })}
        </div>
    </div>
}