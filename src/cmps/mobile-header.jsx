
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useLocation } from "react-router-dom"
import { HeaderNav } from "./header-nav.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { faBell as faBellRegular } from '@fortawesome/free-regular-svg-icons'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import { boardService } from '../services/board.service'
import { Notifications } from './notifications.jsx'
import { userService } from '../services/user-service'
import { useNavigate} from "react-router-dom"
import { logout, updateUser } from '../store/action/user-action.js'
import { socketService } from '../services/socket.service.js'
import { SOCKET_EVEN_SET_USER, SOCKET_EVENT_PUSH_NOTIFICATION } from '../services/socket.service.js'



export const MobileHeader = () => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    const { user } = useSelector((storeState) => storeState.userModule)
    const [isLoginBarOpen, setIsLoginBarOpen] = useState(false)
    const [scroll, setScroll] = useState(0)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const [headerTheme, setHeaderTheme] = useState({
        style: {
            backgroundColor: '#026aa7'
        },
        isDark: false,
    })
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {

        (async () => {
            const user = await userService.getLoggedinUser()
            // dispatch(updateUser(user))
            if (user) socketService.emit(SOCKET_EVEN_SET_USER, user._id)
        })()
        socketService.on(SOCKET_EVENT_PUSH_NOTIFICATION, pushNotification)

    }, [user])

    useEffect(() => {
        getIsDarkTheme()
    }, [board])

    useEffect(() => {
        resetHeaderTheme()
    }, [location.pathname])
    const pathToHome = () => {
        navigate('/')
    }
    const getHeaderClassname = () => {
        return `${(location.pathname === '/boards') ? 'isDark' :
            headerTheme.isDark ? 'is-dark' : 'is-light'}        } 
                ${!isHomePage ? '' : ' home-page-header'
            } 
                ${(!scroll && isHomePage) ? ' scrolled' : ''}`
    }
    const onLogOut = (ev) => {
        ev.preventDefault()
        dispatch(logout())
        navigate('/')
        onToggleLoginBar()
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
    const findPath = () => {
        if (location.pathname === '/boards' || location.pathname.includes('/b/')) return true
    }
    const onToggleLoginBar = () => {
        setIsLoginBarOpen(!isLoginBarOpen)

    }
    const checkIfMobile = () => {
        setIsMobile(window.width <= '480px')
        
    }
    const checkUnreadNots = () => {
        if (!user) return
        const isUnreadNotifications = user.notifications.some(not => {
            return !not.isRead
        })
        return isUnreadNotifications
    }

    const pushNotification = async (yes) => {
        const user = await userService.getById(yes.memberId)
        user.notifications.push(yes.activity)
        const updatedUser = await userService.updateUser(user)
        dispatch(updateUser(updatedUser))
        return
    }


    return <div className={`app-header ${getHeaderClassname()}`}
        style={headerTheme.style}></div>

        {/* {checkIfMobile() &&
            <div className='mobile-top-header'>
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
                <div className="user-nav-links">
                    {((user) || findPath()) &&
                        <button className='toggle-login-bar'
                            onClick={onToggleLoginBar}>
                            {!user &&
                                <h1>
                                    <FontAwesomeIcon icon={faUser} />
                                </h1>
                            }
                            {user &&
                                <h1 className='header-user-avatar'
                                    style={{
                                        background: `url(${user.avatar})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}>

                                </h1>
                            }
                        </button>
                    }
                </div>
            </div>

        
       
       
                {user &&
                    <button
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        className={`notification-btn ${checkUnreadNots() ? `unread` : ` empty`}`}
                    >
                        <FontAwesomeIcon icon={faBellRegular} />
                    </button>
                }
                {(isNotificationsOpen) && <Notifications user={user} />}

                {isLoginBarOpen &&
                    <div className="signin-signup-links">
                        <h2>Account<hr /></h2>
                        <div className='small-right-menu-container'>
                            {user &&
                                <React.Fragment>
                                    <NavLink
                                        onClick={onToggleLoginBar}
                                        className="nav-link-avatar"
                                        to='/avatar'>
                                        <div>Avatar settings</div>
                                        <span
                                            style={{
                                                background: `url(${user.avatar})`,
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat'
                                            }}>
                                        </span>
                                    </NavLink>
                                    <NavLink to='/' onClick={(ev) => onLogOut(ev)} className="nav-link-avatar">Logout</NavLink>
                                </React.Fragment>
                            }
                            
                        </div>
                    </div>
                }
            }
            </div>
        </div>
    }
    </div> */}
}

