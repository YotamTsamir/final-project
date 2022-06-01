import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useFormRegister } from "../hooks/useFormRegister"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrello } from "@fortawesome/free-brands-svg-icons"
import { useNavigate, useParams } from "react-router-dom"
import { userService } from "../services/user-service"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrello } from '@fortawesome/free-brands-svg-icons'

export const Login = () => {
    const { user } = useSelector((storeState) => storeState.userModule)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [signUp, editSignUp] = useState(false)
    const [registerSignUp, newSignUp, setSignUp] = useFormRegister({
        username: '',
        password: '',
    })

    const { isSignUp, username, password, repassword, fullname, email } = newSignUp

    const isDisabled = () => {
        if (username && password) return false
        return true
    }

    const onSignUp = (ev) => {
        ev.preventDefault()
        console.log('username login', username)
        if (!username || !password) return
        userService.login(newSignUp)
        // dispatch(signup({ email, username, fullname, password }))
        // navigate('/boards')
    }

    return <div className="signup">
        <div className="signup-name-logo">
            <div>
                <FontAwesomeIcon icon={faTrello} />
            </div>
            <div className="name">Tredux</div>
        </div>
        <div className="signup-section">
            <form className="signup-form" onSubmit={(ev) => (onSignUp(ev))}>
                <div className="signup-title">Log in for your account </div>
                <div className="signup-input-container">
                    <input
                        autoComplete='off'
                        className="signup-input"
                        placeholder="Username"
                        required
                        {...registerSignUp('username')}
                    />
                    <input
                        autoComplete='off'
                        {...registerSignUp('password')}
                        className="signup-input"
                        type="password"
                        placeholder="Password"
                        required
                    />
                    {isDisabled() ? <button
                        className="signup-btn"
                        disabled
                    >Login!</button> : <button
                        className="signup-btn"
                    >Login!</button>}
                </div>
            </form>
        </div>

        {/* <footer className="signup-footer">hello</footer> */}

    </div>
}