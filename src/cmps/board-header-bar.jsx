import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX, faFilter } from '@fortawesome/free-solid-svg-icons'
import { BoardMenu } from '../cmps/board-menu.jsx'

export const BoardHeaderBar = ({ onToggleFilter, isFilter, isBoardMenu, onToggleMenu, deleteBoard, dfBgs, board, onEditBoard }) => {
    const [filter, setFilter] = useState({
        filterBy: '',
        value: ''
    })

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        setFilter((prevState) => (
            { ...prevState, [field]: value }
        ))
    }


    return <div className="board-bar">
        <button className="menu-btn"
            onClick={onToggleMenu}>
            {!isBoardMenu && <FontAwesomeIcon icon={faBars} />}
            {isBoardMenu && <FontAwesomeIcon icon={faX} />}
        </button>
        {isBoardMenu && <BoardMenu
            board={board}
            deleteBoard={deleteBoard}
            dfBgs={dfBgs}
            onEditBoard={onEditBoard} />}

        <button className="filter-btn"
            onClick={onToggleFilter}>
            {!isFilter && <FontAwesomeIcon icon={faFilter} />}
            {isFilter && <FontAwesomeIcon icon={faX} />}
        </button>
        {isFilter && <div className="filter-container">
            <h5 className="filter-header">Hello Filter<hr /></h5>
            <input type="text"
                name="keyword"
                placeholder="search"
                value={filter.value}
                onChange={handleChange} />
        </div>}
    </div>
}