import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RecentBoards } from './recent-boards.jsx'



export const HeaderNav = () => {
    const [isRecentOpen, setIsRecentOpen] = useState(false)

    const onToggleRecent = () => {
        setIsRecentOpen(!isRecentOpen)
    }

    return <nav className="app-header-nav">
        <div className="recent" onClick={onToggleRecent}>
            <p>Recent</p>
            {!isRecentOpen &&
                <FontAwesomeIcon icon={faAngleDown} />}
            {isRecentOpen &&
                <FontAwesomeIcon icon={faAngleUp} />}
        </div>
        {/* {isRecentOpen &&
                <RecentBoards />} */}

        <NavLink className="nav-link" to='/boards'>Boards</NavLink>
    </nav>
}