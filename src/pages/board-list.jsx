import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from "../services/board.service"
import { loadBoards, addBoard, toggleFavourite } from '../store/action/board-action'
import { BoardAdd } from '../cmps/board-add.jsx'
import { BoardThumbnailPreview } from '../cmps/board-thumbnail-preview.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'

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

    const isFourthBoard = (boardIdx) => {
        if ((boardIdx + 1) % 4 === 0) return true
        return false
    }

    const onToggleFavourite = async (boardId) => {
        dispatch(toggleFavourite(boardId))
    }


    const starredBoards = boards.filter(board => {
        return board.isStarred
    })
    if (!boards) return <div>Loading...</div>
    return <div className='board-lists-page'>
        <div className="board-list-preview">
            <div className='board-list'>
                <div className="boards-container">
                    <div className='board-list-header'>
                        <FontAwesomeIcon icon={faStar} />
                        <h2>Favourite Boards</h2>
                    </div>
                    <div className='boards-container'>
                        {starredBoards.map((board, idx) => {
                            return <BoardThumbnailPreview
                                key={idx}
                                board={board}
                                onToggleFavourite={onToggleFavourite}
                                fourthChild={isFourthBoard(idx) ? 'fourth-child' : ''} />
                        })}
                    </div>
                </div>
                <div className="all-boards">
                    <div className='board-list-header'>
                        <FontAwesomeIcon icon={faProjectDiagram} />
                        <h2>Your Projects</h2>
                    </div>
                    <div className="boards-container">
                        {isAddBoardOpen && <BoardAdd
                            onToggleAddBoard={onToggleAddBoard}
                            onAddBoard={onAddBoard}
                            dfBgs={boardService.getDefaultBgs()} />}

                        {boards.map((board, idx) => {
                            return <BoardThumbnailPreview
                                key={idx}
                                board={board}
                                onToggleFavourite={onToggleFavourite}
                                fourthChild={isFourthBoard(idx) ? 'fourth-child' : ''} />
                        })}
                        <div className="board-prev board-new"
                            onClick={() => setIsAddBoardOpen(!isAddBoardOpen)}>
                            <p> Create new board </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
}