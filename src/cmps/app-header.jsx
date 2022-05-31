import { useState } from 'react'
import { NavLink } from "react-router-dom"
import logo from "../imgs/logo.png"
import { HeaderNav } from "./header-nav.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'


export const AppHeader = () => {
    const [isLoginBarOpen, setIsLoginBarOpen] = useState(false)


    const onToggleLoginBar = () => {
        setIsLoginBarOpen(!isLoginBarOpen)
    }



    return <div className="app-header">
        <div className="logo-and-nav">
            <NavLink to="/" className="logo-container">
                <img className="logo" src={logo} />
                <h1>Tredux</h1>
            </NavLink>
            <div className="main-nav-container">
                <HeaderNav />
            </div>
        </div>

        <div className="user-nav-links">
            <button className='toggle-login-bar'
                onClick={onToggleLoginBar}>
                <h1>
                    <FontAwesomeIcon icon={faUser}/>
                </h1>
            </button>
            {/* <div className='main-search-container'>
                <input type="text"
                    className='main-search'
                    placeholder="Search" />
            </div> */}
            {isLoginBarOpen &&
                <div className="signin-signup-links">
                    <h2>Account<hr /></h2>
                    <NavLink className="nav-link avatar" to='/avatar'>Avatar settings</NavLink>
                    <NavLink className="nav-link login" to='/login'>Login</NavLink>
                    <NavLink className="nav-link signup" to='/signup'>Sign up</NavLink>
                </div>
            }
        </div>
    </div>
}   