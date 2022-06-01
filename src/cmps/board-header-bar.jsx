import { useEffect, useState } from "react"
import { setNewBoard } from '../store/action/board-action'
import { boardService } from "../services/board.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX, faFilter, faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { BoardMenu } from '../cmps/board-menu.jsx'
import { BoxFilterMenu } from './box-filter-menu.jsx'

export const BoardHeaderBar = ({ onToggleStarBoard, onFilterBoxes, onToggleFilter, isFilter, isBoardMenu, onToggleMenu, deleteBoard, dfBgs, board, onEditBoard }) => {
    const [isDark, setIsDark] = useState(false)
    const [filter, setFilter] = useState({
        filterBy: '',
        value: ''
    })

    useEffect(() => {
        getIsDarkTheme()
    }, [board])

    useEffect(() => {
        onFilterBoxes(filter);
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

    const getIsDarkTheme = async () => {
        if (board.style.backgroundColor) return
        const colorTheme = await boardService.getBoardColorTheme(board.style.backgroundImage)
        setIsDark(colorTheme.isDark)
        return colorTheme.isDark
    }

  


    const toggleStarBoard = () => {
        onToggleStarBoard()
    }


    return <header className={`board-header-container 
    ${isDark ? 'is-dark' : 'is-light'}`}>
        <div className="left-side-container">
            <h1 className="board-title">{board.title}</h1>
            <button
                className={`fav-btn ${board.isStarred ? "starred-board" : "star-board"}`}
                onClick={toggleStarBoard}>
                {!board.isStarred &&
                    <FontAwesomeIcon icon={faStarRegular} />}
                {board.isStarred &&
                    <FontAwesomeIcon icon={faStar} />}
            </button>
        </div>
        <div className="header-btn-contianer">
            {!isBoardMenu && <button className="menu-btn"
                onClick={onToggleMenu}>
                <span>
                    <FontAwesomeIcon icon={faBars} />
                </span>
                <p>Show Menu</p>
            </button>}
            {isBoardMenu && <BoardMenu
                board={board}
                deleteBoard={deleteBoard}
                dfBgs={dfBgs}
                onEditBoard={onEditBoard}
                onToggleMenu={onToggleMenu}
            />}
            <button className="filter-btn"
                onClick={onToggleFilter}>
                <span>
                    {!isFilter && <FontAwesomeIcon icon={faFilter} />}
                    {isFilter && <FontAwesomeIcon icon={faX} />}
                </span>
                <p>Filter</p>
            </button>
            {isFilter &&
                <BoxFilterMenu
                    handleChange={handleChange}
                    filter={filter}
                    board={board} />}
        </div>
    </header>
}