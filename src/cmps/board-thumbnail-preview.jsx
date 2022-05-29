import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export const BoardThumbnailPreview = ({ board, onRemove, fourthChild }) => {

    return <div className={`board-prev ${fourthChild}`}
        style={board.style}>
        <div className='bg-shadow'>
            <NavLink to={`/b/${board._id}`}
                key={board._id}
                className="to-board">
                <div>
                    <div className='board-prev-title'>{board.title}</div>
                </div>
            </NavLink>
        </div>
    </div >
}