import { NavLink } from "react-router-dom"


export const AppHeader = () => {
    return <div className="app-header">
        <h1>Traillo</h1>
        <div className="app-header-links">
        <NavLink className="nav-link" to='/boards'>Boards</NavLink>
        <NavLink className="nav-link login" to='/login'>Login</NavLink>
        <NavLink className="nav-link signup" to='/signup'>Sign up</NavLink>
        <NavLink className="nav-link" to='/b/xnyzQ'>Board</NavLink>

        </div>
    </div>
}   