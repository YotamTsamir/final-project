import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useLocation } from "react-router-dom"
import { HeaderNav } from "./header-nav.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import { boardService } from '../services/board.service'
import { userService } from '../services/user-service'
import { useNavigate, useParams } from "react-router-dom"
export const AppHeader = () => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    const [isHomePage, setIsHomePage] = useState(false)
    const [isLoginBarOpen, setIsLoginBarOpen] = useState(false)
    const [scroll, setScroll] = useState(0)
    const [headerTheme, setHeaderTheme] = useState({
        style: {
            backgroundColor: '#026aa7'
        },
        isDark: false,
    })
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        scrollListener()
    }, [])

    useEffect(() => {
        getIsDarkTheme()
    }, [board])

    useEffect(() => {
        resetHeaderTheme()
    }, [location.pathname])

    const onToggleLoginBar = () => {
        setIsLoginBarOpen(!isLoginBarOpen)
    }

    const scrollListener = () => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY < 100
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck)
                setHeaderTheme({})
            }
        })
    }


    const getIsDarkTheme = async () => {
        if (!board || !board.style) return
        if (location.pathname === '/boards') return
        if (board.style.backgroundColor) {
            setHeaderTheme(() => ({
                style: {
                    backgroundColor: board.style.backgroundColor,
                    filter: "brightness(90%)"
                },
                isDark: true
            }))
            return
        }
        const colorTheme = await boardService.getBoardColorTheme(board.style.backgroundImage)
        const { r, g, b } = colorTheme.rgb
        setHeaderTheme(() => ({
            style: { backgroundColor: `rgb(${r}, ${g}, ${b})` },
            isDark: colorTheme.isDark
        }))
    }

    const resetHeaderTheme = () => {
        if (location.pathname === '/boards') {
            setHeaderTheme({
                style: {
                    backgroundColor: '#026aa7'
                },
                isDark: true,
            })
            setIsHomePage(false)
        } else if (location.pathname === '/') {
            setHeaderTheme({
                style: {
                    background: 'none'
                },
                isDark: false,
            })
            setIsHomePage(true)
        }
    }

    const onLogOut = (ev) => {
        ev.preventDefault()
        userService.logout()
        navigate('/')
    }


    return <div className={`app-header 
    ${headerTheme.isDark ? 'is-dark' : 'is-light'
        } 
        ${!isHomePage ? '' : ' home-page-header'
        } 
        ${(!scroll && isHomePage) ? ' scrolled' : ''}`}
        style={headerTheme.style}>
        <div className="logo-and-nav">
            <NavLink to="/" className="logo-container">
                <div className="header-logo fa-trello">
                    <FontAwesomeIcon icon={faTrello} />
                </div>
                <h1>Tredux</h1>
            </NavLink>
            {(location.pathname !== '/') &&
                <div className="main-nav-container">
                    <HeaderNav />
                </div>
            }
        </div>

        <div className='header-right-side'>
            <div className="user-nav-links">
                <button className='toggle-login-bar'
                    onClick={onToggleLoginBar}>
                    <h1>
                        <FontAwesomeIcon icon={faUser} />
                    </h1>
                </button>
                {isLoginBarOpen &&
                    <div className="signin-signup-links">
                        <h2>Account<hr /></h2>
                        <NavLink className="nav-link avatar" to='/avatar'>Avatar settings</NavLink>
                        <NavLink className="nav-link login" to='/login'>Login</NavLink>
                        <NavLink className="nav-link signup" to='/signup'>Sign up</NavLink>
                        <button onClick={(ev)=> onLogOut()}>Logout</button>
                    </div>
                }
            </div>
            }
        </div>
    </div>
}   