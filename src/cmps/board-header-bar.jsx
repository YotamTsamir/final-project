import React, { useEffect, useState } from "react"
import { boardService } from "../services/board.service"
import { NavLink } from "react-router-dom"
import { utilService } from "../services/util.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { AddMember } from "./add-member"
import { faBars, faX, faFilter, faStar } from '@fortawesome/free-solid-svg-icons'
// import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { BoardMenu } from '../cmps/board-menu.jsx'
import { BoxFilterMenu } from './box-filter-menu.jsx'
import { BoardHeaderCmpsLeft } from './board-header-cmps-left.jsx'
import { BoardHeaderCmpsRight } from './board-header-cmps-right.jsx'

export const BoardHeaderBar = ({ labelFilter, setLabelFilter, boardFilter, onEditBoardTitle, onToggleStarBoard, deleteBoard, board, onEditBoardStyle }) => {
    const [isDark, setIsDark] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isAddMember, setIsAddMember] = useState(false)
    const [isFilterOrMenuOpen, setIsFilterOrMenuOpen] = useState(false)
    const [inputWidth, setInputWidth] = useState({ width: '100%' })
    const [defaultBgs, setDefaultBgs] = useState([])
    const [isMobile, setIsMobile] = useState(false)
    const [boardTitleEdit, setBoardTitleEdit] = useState({
        title: board.title
    })

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth <= 480)
        })
    }, [])

    useEffect(() => {
        getIsDarkTheme()
        setBgs()
    }, [board])

    const setBgs = async () => {
        const bgs = await boardService.getDefaultBgs()
        setDefaultBgs(bgs)
    }

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
                <h1 className={`board-title ${isMobile ? 'title-on-mobile' : ''}`} onClick={onToggleEditTitle}>{board.title}</h1>
            }
            {isEditTitle &&
                <form className={`board-title form ${isMobile ? 'title-on-mobile' : ''}`} onSubmit={onChangeTitle} name="title">
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
            {!isMobile &&
                <BoardHeaderCmpsLeft
                    setIsAddMember={setIsAddMember}
                    onToggleStarBoard={onToggleStarBoard}
                    board={board}
                    isAddMember={isAddMember}
                    isMobile={isMobile} />
            }
        </div>
        <div className={`header-btn-contianer`}>
            {(isFilterOrMenuOpen !== 'menu') &&
                <button className={`menu-btn ${isMobile ? 'menu-btn-on-mobile' : ''}`}
                    onClick={() => onOpenFilterOrMenu('menu')}>
                    <span>
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                    {!isMobile && <p>Show Menu</p>}
                </button>}

            {(isFilterOrMenuOpen === 'menu') &&
                <BoardMenu
                    setIsAddMember={setIsAddMember}
                    onToggleStarBoard={onToggleStarBoard}
                    isAddMember={isAddMember}
                    board={board}
                    deleteBoard={deleteBoard}
                    onEditBoardStyle={onEditBoardStyle}
                    onToggleMenu={onOpenFilterOrMenu}
                    dfBgs={defaultBgs}
                    isMobile={isMobile}
                />}

            <BoardHeaderCmpsRight
                isFilterOrMenuOpen={isFilterOrMenuOpen}
                onOpenFilterOrMenu={onOpenFilterOrMenu}
                isMobile={isMobile}
            />

            {(isFilterOrMenuOpen === 'filter') &&
                <BoxFilterMenu
                    labelFilter={labelFilter}
                    setLabelFilter={setLabelFilter}
                    boardFilter={boardFilter}
                    board={board}
                    onToggleMenu={onOpenFilterOrMenu}
                    isFilterOrMenuOpen={isFilterOrMenuOpen}
                    onOpenFilterOrMenu={onOpenFilterOrMenu}
                    isMobile={isMobile} />}
            <NavLink to={`dashboard/${board._id}`}><button className="filter-btn dash-board">Dash board</button></NavLink>
        </div>
    </header>
}