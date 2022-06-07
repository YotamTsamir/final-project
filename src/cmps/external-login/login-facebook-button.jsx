import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux'
import { useEffect, useState } from "react"
import { login, signup } from '../../store/action/user-action'
import { utilService } from '../../services/util.service'

import { userService } from '../../services/user-service'
export const FacebookLoginButton = () => {
    const dispatch = useDispatch()

    const [users, setUsers] = useState(null)
    const [entity, setEntity] = useState({
        isLoggedIn: false,
        userId: '',
        name: '',
        email: '',
        picture: ''
    })

    let fbContent;
    // const componentCLicked =() => {
    //     console.log('component clicked')

    // }

    useEffect(() => {
        (async () => {
            const users = await userService.getUsers();
            setUsers(users)
        })()
        console.log(users)
    }, [])

    const responseFacebook = (res) => {
        console.log("LOGIN SUCCESS FACEBOOK! current user: ", res)

        if (users.find((user) => user.email === res.email)) {
            const newUser = {
                username: res.email,
                password: 'yes'
            }
            dispatch(login(newUser))
        } else {
            const newUser = {
                _id: utilService.makeId(),
                email: res.email,
                username: res.email,
                fullname: res.name,
                avatar: res.picture.data.url,
                password: 'yes'
            }
            dispatch(signup(newUser))
        }
    }


    const onFailure = (res) => {
        console.log("LOGIN FAILED!, res: ", res)
    }





    return <div className="facebook-login">
        {!entity.isLoggedIn &&

                <FacebookLogin
                    appId="1435463920247790"

                    fields="name,email,picture"
                    onFailure={onFailure}
                    callback={responseFacebook}
                />
            }

    </div>
}