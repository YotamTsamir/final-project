import { useState } from "react"
// import { signup } from "../store/action/user-action"
import { useDispatch, useSelector } from 'react-redux'
export const SignUp = () => {
    const { user } = useSelector((storeState) => storeState.userModule)
    const [signUp, setSignUp] = useState({
        'username': '',
        'password': '',
        'repassword': '',
        'fullname': '',
        "email" : ''
    })
    return <div className="sign-up-container">
        <h2>Sign Up</h2>
        {/* <div className="form-container">
            <form action=""></form>
        </div> */}

    </div>
}