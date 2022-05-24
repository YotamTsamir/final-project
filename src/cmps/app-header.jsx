import { NavLink } from "react-router-dom"


export const AppHeader = () => {
    return <div className="app-header">
        <h1>Traillo</h1>
        <div className="app-header-links">
        <NavLink className="nav-link" to='/login'>Login</NavLink>
        <NavLink className="nav-link" to='/signup'>Sign Up Now!</NavLink>

        </div>
    </div>
}