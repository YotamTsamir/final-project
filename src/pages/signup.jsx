import { useState } from "react"
import { getRandomColor, utilService } from '../services/util.service.js'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrello } from "@fortawesome/free-brands-svg-icons"
import { useFormRegister } from "../hooks/useFormRegister"
import { isSunday } from "date-fns"
import { signup } from "../store/action/user-action"
import { useNavigate, useParams } from "react-router-dom"
import { userService } from "../services/user-service"

export const SignUp = () => {
    const { user } = useSelector((storeState) => storeState.userModule)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [signUp, editSignUp] = useState(false)
    const [registerSignUp, newSignUp, setSignUp] = useFormRegister({
        username: '',
        password: '',
        repassword: '',
        fullname: '',
        email: '',
        avatar: utilService.getRandomColor(),
        isSignUp: false,
    })

    const { isSignUp, username, password, repassword, fullname, email, avatar } = newSignUp

    const isDisabled = () => {
        if (email && username && password && fullname) return false
        return true
    }
    const onSignUp = (ev) => {
        console.log('ev', ev)
        ev.preventDefault()
        if (!email || !username || !password || !fullname) return
        const user = { username, password, fullname, email }
        console.log(user)
        userService.signup(user)
        dispatch(signup({ email, username, fullname, password, img: '' }))
        navigate('/boards')
    }




    return <div className="signup">
        <div className="signup-name-logo">
            <div className="signup-logo fa-trello">
                <FontAwesomeIcon icon={faTrello} />
            </div>
            <div className="name">Tredux</div>
        </div>

        <div className="signup-section">
            <form className="signup-form" onSubmit={(ev) => (onSignUp(ev))}>
                <div className="signup-title">Sign up for your account </div>
                <div className="signup-input-container">
                    <input
                        className="signup-input"
                        placeholder="Enter email"
                        required
                        {...registerSignUp('email')} />
                    <input
                        className="signup-input"
                        placeholder="Fullname"
                        required
                        {...registerSignUp('fullname')} />
                    <input
                        className="signup-input"
                        placeholder="Username"
                        required
                        {...registerSignUp('username')}
                    />
                    <input
                        {...registerSignUp('password')}
                        className="signup-input"
                        type="password"
                        placeholder="Password"
                        required
                    />

                    <div {...registerSignUp('avatar')}></div>
                    {isDisabled() ? <button
                        className="signup-btn"
                        disabled
                    >Signup!</button> : <button
                        className="signup-btn"
                    >Signup!</button>}
                </div>
            </form>
        </div>


    </div>
}