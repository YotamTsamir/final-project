import { NavLink } from "react-router-dom"
import logo from "../imgs/logo.png"

export const AppHeader = () => {
    return <div className="app-header">
        <div className="logo-container">
            <img className="logo" src={logo}/>
            <h1>Traillo</h1>
        </div>
       
        <div className="app-header-links">
        <NavLink className="nav-link" to='/boards'>Boards</NavLink>
        <NavLink className="nav-link login" to='/login'>Login</NavLink>
        <NavLink className="nav-link signup" to='/signup'>Sign up</NavLink>
        <NavLink className="nav-link" to='/b/849QB'>Board</NavLink>
        </div>
    </div>
}   