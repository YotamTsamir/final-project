import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../services/user-service'
import { boardService } from "../services/board.service"
import { loadBoards, addBoard, toggleFavourite } from '../store/action/board-action'
import { BoardAdd } from '../cmps/board-add.jsx'
import { BoardThumbnailPreview } from '../cmps/board-thumbnail-preview.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram, faHome } from '@fortawesome/free-solid-svg-icons'
import { faStar, faClone } from '@fortawesome/free-regular-svg-icons'
import { faTrello } from '@fortawesome/free-brands-svg-icons'

export const BoardList = () => {
    const [isAddBoardOpen, setIsAddBoardOpen] = useState(false)
    const [defaultBgs, setDefaultBgs] = useState([])
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)
    const { boards } = useSelector((storeState) => storeState.boardModule)
    const [boardsToDisplay, setBoardsToDisplay] = useState('')
    // const [loggedInUser, setLoggedInUser] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        setBgs()
    }, [])

    useEffect(() => {
        dispatch(loadBoards())
    }, [boards.length])



    const myBoards = boards.filter(board => {
        if (!loggedInUser) return
        return board.members.some(member => {
            if (member) return (member._id === loggedInUser._id)
        })
    })


    const setBgs = async () => {
        const bgs = await boardService.getDefaultBgs()
        setDefaultBgs(bgs)
    }

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


    const getStarredBoards = () => {
        const boardListToFilter = loggedInUser ? myBoards : boards
        return boardListToFilter.filter(board => {
            return board.isStarred
        })
    }
    const starredBoards = getStarredBoards()



    if (!boards) return <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    return <div className='board-lists-page'>
        <div className="list-page-menu">
            <aside className='menu-container'>
                <div
                    className={`to-boards to-home ${!boardsToDisplay && 'active'}`}
                    onClick={() => setBoardsToDisplay('')}>
                    <span><FontAwesomeIcon icon={faHome} /></span>
                    <h2>Home</h2>
                </div>
                <div
                    className={`to-boards to-all ${(boardsToDisplay === 'all') && 'active'}`}
                    onClick={() => setBoardsToDisplay('all')}>
                    <span><FontAwesomeIcon icon={faTrello} /></span>
                    <h2>All boards</h2>
                </div>
                <div
                    className={`to-boards to-fav ${(boardsToDisplay === 'fav') && 'active'}`}
                    onClick={() => setBoardsToDisplay('fav')}>
                    <span><FontAwesomeIcon icon={faStar} /></span>
                    <h2>Favourites</h2>
                </div>
                <div
                    className={`to-boards to-template ${(boardsToDisplay === 'template') && 'active'}`}
                    onClick={() => setBoardsToDisplay('template')}>
                    <span><FontAwesomeIcon icon={faClone} /></span>
                    <h2>Templates</h2>
                </div>
            </aside>
        </div>
        <div className='hr'><hr /></div>
        <div className="board-list-preview">
            <div className='board-list'>
                {(boardsToDisplay === 'fav' || !boardsToDisplay) &&
                    <div className="boards-container">
                        <div className='board-list-header'>
                            <FontAwesomeIcon icon={faStar} />
                            <h2>Starred boards</h2>
                        </div>
                        < div className='boards-container'>
                            {starredBoards.map((board, idx) => {
                                return <BoardThumbnailPreview
                                    key={idx}
                                    board={board}
                                    onToggleFavourite={onToggleFavourite}
                                    fourthChild={isFourthBoard(idx) ? 'fourth-child' : ''} />
                            })}
                        </div>
                    </div>
                }
                <div className="all-boards">
                    <div className='board-list-header'>
                        <FontAwesomeIcon icon={faProjectDiagram} />
                        {(loggedInUser && !boardsToDisplay) &&
                            <h2>Your Boards</h2>
                        }
                        {(!loggedInUser || boardsToDisplay === 'all') &&
                            <h2>All Boards</h2>
                        }
                    </div>
                    <div className="boards-container">
                        {isAddBoardOpen && <BoardAdd
                            onToggleAddBoard={onToggleAddBoard}
                            onAddBoard={onAddBoard}
                            dfBgs={defaultBgs} />}

                        {loggedInUser &&
                            boards.map((board, idx) => {
                                return <BoardThumbnailPreview
                                    key={idx}
                                    board={board}
                                    onToggleFavourite={onToggleFavourite}
                                    fourthChild={isFourthBoard(idx) ? 'fourth-child' : ''} />
                            })}

                        {((!loggedInUser && boardsToDisplay !== 'all') || boardsToDisplay === 'all') &&
                            boards.map((board, idx) => {
                                return <BoardThumbnailPreview
                                    key={idx}
                                    board={board}
                                    onToggleFavourite={onToggleFavourite}
                                    fourthChild={isFourthBoard(idx) ? 'fourth-child' : ''} />
                            })
                        }

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