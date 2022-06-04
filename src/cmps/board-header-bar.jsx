import { useEffect, useState } from "react"
import { boardService } from "../services/board.service"
import { utilService } from "../services/util.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AddMember } from "./add-member"
import { faBars, faX, faFilter, faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { BoardMenu } from '../cmps/board-menu.jsx'
import { BoxFilterMenu } from './box-filter-menu.jsx'

export const BoardHeaderBar = ({ labelFilter, setLabelFilter, boardFilter, onEditBoardTitle, onToggleStarBoard, deleteBoard, board, onEditBoardStyle }) => {
    const [isDark, setIsDark] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isAddMember, setIsAddMember] = useState(false)
    const [isFilterOrMenuOpen, setIsFilterOrMenuOpen] = useState(false)
    const [inputWidth, setInputWidth] = useState({ width: '100%' })
    const [boardTitleEdit, setBoardTitleEdit] = useState({
        title: board.title
    })


    useEffect(() => {
        getIsDarkTheme()
    }, [board])

    const handleTitleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        resizeInput(value)
        setBoardTitleEdit((prevState) => ({
            ...prevState, [field]: value
        }))
    }

    const onChangeTitle = (ev) => {
        ev.preventDefault()
        const field = ev.target.name
        const value = boardTitleEdit.title
        onEditBoardTitle(board._id, field, value)
        onToggleEditTitle()
    }

    const onOpenFilterOrMenu = (val) => {
        if (val === isFilterOrMenuOpen) val = false
        setIsFilterOrMenuOpen(val)
    }

    const onToggleEditTitle = () => {
        setIsEditTitle(!isEditTitle)
    }


    const getIsDarkTheme = async () => {
        if (board.style.backgroundColor) return
        const colorTheme = await boardService.getBoardColorTheme(board.style.backgroundImage)
        setIsDark(colorTheme.isDark)
        return colorTheme.isDark
    }

    const resizeInput = (txt) => {
        setInputWidth({ width: txt.length + 'ch' })
    }

    return <header className={`board-header-container 
    ${isDark ? 'is-dark' : 'is-light'}`}>
        <div className="left-side-container">
            {!isEditTitle &&
                <h1 className="board-title" onClick={onToggleEditTitle}>{board.title}</h1>
            }
            {isEditTitle &&
                <form className="board-title form" onSubmit={onChangeTitle} name="title">
                    <input type="text"
                        value={boardTitleEdit.title}
                        name="title"
                        onBlur={onChangeTitle}
                        onChange={handleTitleChange}
                        autoFocus
                        onFocus={handleTitleChange}
                        style={inputWidth} />
                </form>
            }
            <button
                className={`fav-btn ${board.isStarred ? "starred-board" : "star-board"}`}
                onClick={onToggleStarBoard}>
                {!board.isStarred &&
                    <FontAwesomeIcon icon={faStarRegular} />}
                {board.isStarred &&
                    <FontAwesomeIcon icon={faStar} />}
            </button>
            <span className="line-between-header">|</span>
            {board.members &&
                <div className="curr-task-members">
                    {board.members.map((member, idx) => {
                        return <div
                            key={idx}
                            className={`member-preview ${idx}`} >
                            <img src={member.avatar} />
                        </div>
                    })}

                </div>
            }
            <button className="add-member-board" onClick={() => setIsAddMember(!isAddMember)}>Add member</button>
            {(isAddMember) && <AddMember board={board} />}
        </div>
        <div className="header-btn-contianer">
            {(isFilterOrMenuOpen !== 'menu') && <button className="menu-btn"
                onClick={() => onOpenFilterOrMenu('menu')}>
                <span>
                    <FontAwesomeIcon icon={faBars} />
                </span>
                <p>Show Menu</p>
            </button>}
            {(isFilterOrMenuOpen === 'menu') && <BoardMenu
                board={board}
                deleteBoard={deleteBoard}
                onEditBoardStyle={onEditBoardStyle}
                onToggleMenu={onOpenFilterOrMenu}
            />}
            <button className="filter-btn"
                onClick={() => onOpenFilterOrMenu('filter')}>
                <span>
                    {(isFilterOrMenuOpen !== 'filter') && <FontAwesomeIcon icon={faFilter} />}
                    {(isFilterOrMenuOpen === 'filter') && <FontAwesomeIcon icon={faX} />}
                </span>
                <p>Filter</p>
            </button>
            {(isFilterOrMenuOpen === 'filter') &&
                <BoxFilterMenu
                    labelFilter={labelFilter}
                    setLabelFilter={setLabelFilter}
                    boardFilter={boardFilter}
                    board={board}
                    onToggleMenu={onOpenFilterOrMenu} />}
        </div>
    </header>
}