import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'

export const BoardThumbnailPreview = ({ board, fourthChild, onToggleFavourite }) => {

    const toggleFavourite = (ev) => {
        ev.preventDefault()
        onToggleFavourite(board._id)
    }


    return <div className={`board-prev ${fourthChild}`}
        style={board.style}>
        <div className='bg-shadow'>
            <NavLink to={`/b/${board._id}`}
                key={board._id}
                className="to-board">
                <div>
                    <div className='board-prev-title'>{board.title}</div>
                    <div className={`toggle-fav-board ${board.isStarred ? 'is-starred' : ''
                        }`}
                        onClick={toggleFavourite}>
                        {!board.isStarred &&
                            <FontAwesomeIcon icon={faStarRegular} />}
                        {board.isStarred &&
                            <FontAwesomeIcon icon={faStar} />}
                    </div>
                </div>
            </NavLink>
        </div>
    </div >
}