import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from "../services/board.service"
import { loadBoards, addBoard, deleteBoard } from '../store/action/board-action'
import { BoardAdd } from '../cmps/board-add.jsx'
import { BoardThumbnailPreview } from '../cmps/board-thumbnail-preview.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons'

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

    const isFourthBoard = (boardIdx) => {
        if ((boardIdx + 1) % 4 === 0) return true
        return false
    }


    if (!boards) return <div>Loading...</div>
    return <div className="board-list-page">
        <div className='board-list'>
            <div className='board-list-header'>
            <FontAwesomeIcon icon={faProjectDiagram}/>
            <h2>Your Projects</h2>
           </div>
            <div className="boards-container">
                {isAddBoardOpen && <BoardAdd
                    onToggleAddBoard={onToggleAddBoard}
                    onAddBoard={onAddBoard}
                    dfBgs={boardService.getDefaultBgs()} />}

                {boards.map((board, idx) => {
                    return <BoardThumbnailPreview key={idx} board={board}
                        onRemove={onRemoveBoard}
                        fourthChild={isFourthBoard(idx) ? 'fourth-child' : ''} />
                })}
                <div className="board-prev board-new"
                    onClick={() => setIsAddBoardOpen(!isAddBoardOpen)}>
                    <p> ➕ New board </p>
                </div>
            </div>
        </div>
    </div>
}