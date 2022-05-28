import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX, faFilter } from '@fortawesome/free-solid-svg-icons'
import { BoardMenu } from '../cmps/board-menu.jsx'

export const BoardHeaderBar = ({ onFilterBoxes, onToggleFilter, isFilter, isBoardMenu, onToggleMenu, deleteBoard, dfBgs, board, onEditBoard }) => {
    const [filter, setFilter] = useState({
        filterBy: '',
        value: ''
    })

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        console.log(field, value)
        setFilter({
            filterBy: field,
            value: value
        })
        onFilterBoxes(filter)
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
            <h6>Contains Keywords...</h6>
            <input type="text"
                name="title"
                placeholder="search by keywords..."
                value={filter.filterBy === "title" ?
                    filter.value : ''}
                onChange={handleChange} />
            <div><hr /></div>
            <h6>Contain label...</h6>
            <div className="filter-by-label">
                {board.labels.map(label => {
                    return <div className="label-picker-container">
                        <input type="checkbox"
                            name="labels"
                            id={`check-label-${label.id}`}
                            value={label.id}
                            onClick={handleChange} />
                        <label
                            htmlFor={`check-label-${label.id}`}
                            style={{ backgroundColor: label.color }}>
                            <p>{label.title}</p>
                        </label>
                    </div>
                })}
            </div>
        </div>}
    </div>
}