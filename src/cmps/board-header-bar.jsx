import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX, faFilter } from '@fortawesome/free-solid-svg-icons'
import { BoardMenu } from '../cmps/board-menu.jsx'
import { BoxFilterMenu } from './box-filter-menu.jsx'

export const BoardHeaderBar = ({ onFilterBoxes, onToggleFilter, isFilter, isBoardMenu, onToggleMenu, deleteBoard, dfBgs, board, onEditBoard }) => {
    const [filter, setFilter] = useState({
        filterBy: '',
        value: ''
    })
    useEffect(() => {
        onFilterBoxes(filter)
    }, [filter])

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        if (target.value === filter.value) {
            return setFilter({
                filterBy: '',
                value: ''
            })
        }

        setFilter({
            filterBy: field,
            value: value
        })
    }

    return <div className="board-bar">
        <button className="menu-btn"
            onClick={onToggleMenu}>
            {!isBoardMenu && <FontAwesomeIcon icon={faBars} />}
            {isBoardMenu && <FontAwesomeIcon icon={faX} />}
            <p>Menu</p>
        </button>
        {isBoardMenu && <BoardMenu
            board={board}
            deleteBoard={deleteBoard}
            dfBgs={dfBgs}
            onEditBoard={onEditBoard}
            onToggleMenu={onToggleMenu} />}

        <button className="filter-btn"
            onClick={onToggleFilter}>
            {!isFilter && <FontAwesomeIcon icon={faFilter} />}
            {isFilter && <FontAwesomeIcon icon={faX} />}
            <p>Filter</p>
        </button>
        {isFilter &&
            <BoxFilterMenu
                handleChange={handleChange}
                filter={filter}
                board={board} />}
    </div>
}