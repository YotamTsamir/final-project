import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignLeft, faRemove, faX, faArchive, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { BoardBgMenu } from './board-bg-menu'
import { ArchivedTasks } from './archive'
import { Activities } from './activities'

export const BoardMenu = ({ onToggleMenu, dfBgs, board, deleteBoard, onEditBoardStyle }) => {
    const [boardStyle, setBoardStyle] = useState({
        isOpen: false,
        style: board.style
    })
    const [archiveMenu, setArchiveMenu] = useState(false)
    const [activitiesMenu, setActivitiesMenu] = useState(false)
    const [isShowMore, setIsShowMore] = useState(false)


    const deleteCurrBoard = () => {
        deleteBoard(board._id)
    }

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        setBoardStyle((prevState) => ({
            ...prevState,
            style: { [field]: value }
        }))
        onEditBoardStyle(board._id, field, value)
    }

    const toggleShowMore = () => {
        setIsShowMore(!isShowMore)
    }

    const toggleBgMenu = () => {
        const val = boardStyle.isOpen
        setBoardStyle((prevState) => ({
            ...prevState, isOpen: !val
        }))
    }

    const openArchive = () => {
        setArchiveMenu(!archiveMenu)
    }

    return <div className="board-menu">
        <div className='board-menu-head'>
            <button className='close-board-menu-btn'
                title="close menu"
                onClick={() => onToggleMenu(false)}>
                <FontAwesomeIcon icon={faX} />
            </button>
            <h5 className="menu-header">Menu</h5>
        </div>
        <div><hr /></div>
        <div className='board-menu-btns-container'>
            <button
                className="change-board-bg"
                onClick={toggleBgMenu}>

                <p>Change Background</p>
                <p style={boardStyle.style}
                    className="curr-bg-preview icon-btn">
                </p>
            </button>
            {boardStyle.isOpen &&
                <BoardBgMenu dfBgs={dfBgs}
                    handleChange={handleChange}>
                </BoardBgMenu>}
            <button onClick={() => openArchive()} className="toggle-Archive">
                <span>Archive</span>
                <p>
                    <FontAwesomeIcon icon={faArchive} />
                </p>
            </button>
            {archiveMenu && <ArchivedTasks board={board} />}
            <button className='toggle-show-more' onClick={toggleShowMore}>
                <p>Show More</p>
                <span className='fa-ellipsis icon-btn'><FontAwesomeIcon icon={faEllipsis} /></span>
            </button>
            {isShowMore &&
                <button
                    className="delete-board-btn"
                    onClick={deleteCurrBoard}>
                    <p>Delete Board</p>
                    <p className="fa-remove  icon-btn"><FontAwesomeIcon icon={faRemove} /></p>
                </button>
            }

            <div className='seperator'></div>
            <div className='activities-container'>
                <FontAwesomeIcon icon={faAlignLeft} />
                <div className='activities-board-menu'
                // onClick={() => setActivitiesMenu(!activitiesMenu)}
                >
                    Activities
                </div>
            </div>
        </div>
        <Activities board={board} />
    </div>
}