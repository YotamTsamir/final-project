import { useState } from 'react'
import { NavLink } from "react-router-dom"
import logo from "../imgs/logo.png"
import { HeaderNav } from "./header-nav.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export const AppHeader = () => {
    const [isLoginBarOpen, setIsLoginBarOpen] = useState(false)


    const onToggleLoginBar = () => {
        setIsLoginBarOpen(!isLoginBarOpen)
    }



    return <div className="app-header">
        <div className="logo-and-nav">
            <div className="logo-container">
                <img className="logo" src={logo} />
                <h1>Tredux</h1>
            </div>
            <div className="main-nav-container">
                <HeaderNav />
                <NavLink className="nav-link" to='/boards'>Boards</NavLink>
            </div>
        </div>

        <div className="user-nav-links">
            <button className='toggle-login-bar'
                onClick={onToggleLoginBar}>
                <h1></h1>
            </button>
            {/* <div className='main-search-container'>
                <input type="text"
                    className='main-search'
                    placeholder="Search" />
            </div> */}
            {isLoginBarOpen &&
                <div className="signin-signup-links">
                    <h2>Account<hr /></h2>
                    <NavLink className="nav-link login" to='/login'>Login</NavLink>
                    <NavLink className="nav-link signup" to='/signup'>Sign up</NavLink>
                </div>
            }
        </div>
    </div>
}   