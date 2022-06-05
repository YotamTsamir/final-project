import { userService } from '../../services/user-service.js'

export function loadUsers() {
    return async (dispatch) => {
        try {
            dispatch({ type: 'LOADING_START' })
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function updateUser(user) {
    return (dispatch) => {
        dispatch({ type: 'UPDATE_USER', user })
    }

}

export function login(credentials) {
    // Action Creator
    return async (dispatch) => {
        try {
        const user = await userService.login(credentials)
        dispatch({
            type: 'SET_USER',
            user,
        })
        } catch (err) {
            console.error('Error:', err)
            setUserMsg('Cannot login', 'bad')
        }
        
            
    }
}

export function logout() {
    // Action Creator
    return (dispatch) => {
        userService
            .logout()
            .then(() => {
                dispatch({
                    type: 'SET_USER',
                    user: null,
                })
            })
            .catch((err) => {
                console.error('Error:', err)
                setUserMsg('Cannot logout', 'bad')
            })
    }
}

export function signup(credentials) {
    // Action Creator

    return async (dispatch) => {
        const user = await userService.signup(credentials)
        dispatch({
            type: 'SET_USER',
            user,
        })

    }
}
export function setUserAvatar(user, imageUrl) {
    console.log('user action use', user)
    return async (dispatch) => {
        try {
            user.img = imageUrl
            await userService.updateUser(user)
            dispatch({
                type: 'SET_USER',
                user,
            })
        } catch (err) {
            console.log('error')
        }
    }
}

export function setUserMsg(msg, indication) {
    let fullMsg = { msg, indication }

    return (dispatch) => {
        dispatch({
            type: 'SET_MSG',
            fullMsg,
        })
    }
}


// export function removeUser(userId) {
//     return async (dispatch) => {
//         try {
//             await userService.remove(userId)
//             dispatch({ type: 'REMOVE_USER', userId })
//         } catch (err) {
//             console.log('UserActions: err in removeUser', err)
//         }
//     }
// }

