import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
import { BoardBgMenu } from './board-bg-menu'

export const BoardMenu = ({ dfBgs, board, deleteBoard, onEditBoard }) => {
    const [boardStyle, setBoardStyle] = useState({
        isOpen: false,
        style: board.style
    })


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
        onEditBoard(board._id, field, value)
    }

    const toggleBgMenu = () => {
        const val = boardStyle.isOpen
        setBoardStyle((prevState) => ({
            ...prevState, isOpen: !val
        }))
    }

    return <div className="board-menu">
        <h5 className="menu-header">Hello Menu
            <hr /></h5>
        <button
            className="delete-board-btn"
            onClick={deleteCurrBoard}>
            <p>Delete Board</p>
            <p className="fa-remove"><FontAwesomeIcon icon={faRemove} /></p>
        </button>
        <button
            className="change-board-bg"
            onClick={toggleBgMenu}>

            <p>Change Background</p>
            <p style={boardStyle.style}
                className="curr-bg-preview">
            </p>
        </button>
        {boardStyle.isOpen && 
        <BoardBgMenu dfBgs={dfBgs} 
        handleChange={handleChange}>
            </BoardBgMenu>}
    </div>
}