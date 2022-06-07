import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useFormRegister } from "../hooks/useFormRegister"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrello } from "@fortawesome/free-brands-svg-icons"
import { useNavigate, useParams } from "react-router-dom"
import { userService } from "../services/user-service"
import { login } from "../store/action/user-action"
import { LoginGoogleButton } from "../cmps/google login/login-button"
import { gapi } from "gapi-script"

export const Login = () => {
    const { user } = useSelector((storeState) => storeState.userModule)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [registerLogin, newLogin, setLogin] = useFormRegister({
        username: '',
        password: '',
    })


    const clientId = "900836762463-e973v7b979c97kphq1ubsj6mt1jk33ot.apps.googleusercontent.com"

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: "email",
                plugin_name: "chat",
            })
        }

        gapi.load('client:auth2', start)
    }, [])


    useEffect(() => {
        if (user) navigate('/boards')
    }, [user])


    const onLogin = (ev) => {
        ev.preventDefault()
        dispatch(login(newLogin))
    }


    return <div className="signup">
        <div className="signup-name-logo">
            <div>
                <FontAwesomeIcon icon={faTrello} />
            </div>
            <div className="name">Tredux</div>
        </div>
        <div className="signup-section">
            <form className="signup-form" onSubmit={(ev) => (onLogin(ev))}>
                <div className="signup-title">Log in for your account </div>
                <div className="signup-input-container">
                    <input
                        autoComplete='off'
                        className="signup-input"
                        placeholder="Username"
                        required
                        {...registerLogin('username')}
                    />
                    <input
                        autoComplete='off'
                        {...registerLogin('password')}
                        className="signup-input"
                        type="password"
                        placeholder="Password"
                        required
                    />
                    {<button
                        className="signup-btn"
                    >Login!</button>}
                </div>
            <LoginGoogleButton onLogin={onLogin}/>
            </form>
        </div>
    </div>
}