import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export const BoardThumbnailPreview = ({ board, onRemove }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const onToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }


    const onDelete = () => {
        onRemove(board._id)
        setIsMenuOpen(!isMenuOpen)
    }

    return <div className="board-prev"
        style={board.style}>
        <NavLink to={`/b/${board._id}`}
            key={board._id}
            className="to-board">
            <div>
                <p>{board.title}</p>
            </div>
        </NavLink>
        <div className="boardmenu">
            {!isMenuOpen &&
                <button className="boardmenu-btn"
                    onClick={onToggleMenu}>
                    <FontAwesomeIcon
                        icon={faEllipsisVertical} />
                </button>}

            {isMenuOpen && <div className="boardmenu-open"
                onClick={onDelete}>
                <FontAwesomeIcon icon={faTrashCan} />
            </div>
            }
        </div>
    </div>
}