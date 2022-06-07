import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import {  useEffect, useState } from "react"
import { login, signup } from '../../store/action/user-action'
import { utilService } from '../../services/util.service'

import { userService } from '../../services/user-service'
export const LoginGoogleButton = ({ onLogin }) => {
    const dispatch = useDispatch()
    const clientId = "900836762463-e973v7b979c97kphq1ubsj6mt1jk33ot.apps.googleusercontent.com"
    const [users, setUsers] = useState(null)
    
    useEffect(() => {
        (async () => {
            const users = await userService.getUsers();
            setUsers(users)
          })()
          console.log(users)// const user = boards.board.find(())
    }, [])

    const onSuccess = (res) => {
        console.log("GOOGLE LOGIN SUCCESS! current user: ", res.profileObj)
        const objUser = res.profileObj
        if(users.find((user) => user.email === objUser.email)) {
            const newUser = {
                username: objUser.givenName + objUser.familyName,
                password: 'yes'
            }
            dispatch(login(newUser))
        } else {
            const newUser = {
                _id: utilService.makeId(),
                email: objUser.email,
                username:  objUser.givenName + objUser.familyName,
                fullname: objUser.name,
                avatar: objUser.imageUrl,
                password: 'yes'
            }
            dispatch(signup(newUser))
        } 
    }
    const onFailure = (res) => {
        console.log("LOGIN FAILED!, res: ", res)
    }


    return <div id="signInButton">
        <GoogleLogin

            clientId={clientId}
            buttonText="Continue with Google "
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    </div>
}