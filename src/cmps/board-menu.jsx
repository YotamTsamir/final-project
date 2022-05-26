import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

export const BoardMenu = ({boardId, deleteBoard}) => {



    return <div className="board-menu">
        <h5 className="menu-header">Hello Menu
        <hr/></h5>
        <button 
        className="delete-board-btn">
            <p>Delete Board</p>
            <FontAwesomeIcon icon={faDeleteLeft}/>
        </button>
    </div>
}