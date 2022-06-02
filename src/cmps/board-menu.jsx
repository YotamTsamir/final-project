import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faX, faArchive } from '@fortawesome/free-solid-svg-icons'
import { BoardBgMenu } from './board-bg-menu'
import { ArchivedTasks } from './archive'

export const BoardMenu = ({ onToggleMenu, dfBgs, board, deleteBoard, onEditBoardStyle }) => {
    const [boardStyle, setBoardStyle] = useState({
        isOpen: false,
        style: board.style
    })
    const [archiveMenu, setArchiveMenu] = useState(false)


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
        <button className='close-board-menu-btn'
            title="close menu"
            onClick={() => onToggleMenu(false)}>
            <FontAwesomeIcon icon={faX} />
        </button>
        <h5 className="menu-header">Menu</h5>
        <div><hr /></div>
        <button
            className="delete-board-btn"
            onClick={deleteCurrBoard}>
            <p>Delete Board</p>
            <p className="fa-remove  icon-btn"><FontAwesomeIcon icon={faRemove} /></p>
        </button>
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
            <p>Archive</p>
            <FontAwesomeIcon icon={faArchive} />
        </button>
        {archiveMenu && <ArchivedTasks board={board} />}
    </div>
}