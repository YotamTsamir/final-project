import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from "../services/board.service"
import { loadBoards, addBoard, toggleFavourite } from '../store/action/board-action'
import { BoardAdd } from '../cmps/board-add.jsx'
import { BoardThumbnailPreview } from '../cmps/board-thumbnail-preview.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import { faStar, faClone } from '@fortawesome/free-regular-svg-icons'
import { faTrello } from '@fortawesome/free-brands-svg-icons'

export const BoardList = () => {
    const [isAddBoardOpen, setIsAddBoardOpen] = useState(false)
    const [defaultBgs, setDefaultBgs] = useState([])
    const { boards } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBoards())
        setBgs()
    }, [])


    const setBgs = async () => {
        // const bgs = await boardService.getDefaultBgs()
        // setDefaultBgs(bgs)
    }
    // console.log(defaultBgs)

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
        <div className="list-page-menu">
            <aside className='menu-container'>
                <div className="to-boards to-all">
                    <span><FontAwesomeIcon icon={faTrello} /></span>
                    <h2>All boards</h2>
                </div>
                <div className="to-boards to-fav">
                    <span><FontAwesomeIcon icon={faStar} /></span>
                    <h2>Favourites</h2>
                </div>
                <div className="to-boards to-template">
                    <span><FontAwesomeIcon icon={faClone} /></span>
                    <h2>Templates</h2>
                </div>
            </aside>
        </div>
        <div className="board-list-preview">
            <div className='board-list'>
                <div className="boards-container">
                    <div className='board-list-header'>
                        <FontAwesomeIcon icon={faStar} />
                        <h2>Starred boards</h2>
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
                        <h2>Your Boards</h2>
                    </div>
                    <div className="boards-container">
                        {isAddBoardOpen && <BoardAdd
                            onToggleAddBoard={onToggleAddBoard}
                            onAddBoard={onAddBoard}
                            dfBgs={() => boardService.getDefaultBgs()} />}

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