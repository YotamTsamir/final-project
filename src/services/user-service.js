import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    updateUser
}

window.us = userService

async function login(credentials) {
    const user = await httpService.post('auth/login', credentials)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))


}

async function logout() {

    // socketService.emit('unset-user-socket');
    sessionStorage.clear(STORAGE_KEY_LOGGEDIN)
    return await httpService.post('auth/logout')
}

async function updateUser(user) {
    await storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    return user;
}



async function signup(userInfo) {
    console.log(userInfo)
    await httpService.post('auth/signup', userInfo)
    const user = await storageService.post(STORAGE_KEY, userInfo)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}


function getLoggedinUser() {
    const user = (sessionStorage.getItem(STORAGE_KEY_LOGGEDIN)) ? sessionStorage.getItem(STORAGE_KEY_LOGGEDIN) : null
    return JSON.parse(user || null)
}









// import { storageService } from './async-storage.service'
// import { httpService } from './http.service'
// const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// var gWatchedUser = null;

// export const userService = {
//     login,
//     logout,
//     signup,
//     getLoggedinUser,
//     saveLocalUser,
//     getUsers,
//     getById,
//     remove,
//     update,

// }

// window.userService = userService


// function getUsers() {
//     // return storageService.query('user')
//     return httpService.get(`user`)
// }

// async function getById(userId) {
//     // const user = await storageService.get('user', userId)
//     const user = await httpService.get(`user/${userId}`)
//     // gWatchedUser = user;
//     return user;
// }
// function remove(userId) {
//     // return storageService.remove('user', userId)
//     return httpService.delete(`user/${userId}`)
// }

// async function update(user) {
//     // await storageService.put('user', user)
//     user = await httpService.put(`user/${user._id}`, user)
//     // Handle case in which admin updates other user's details
//     if (getLoggedinUser()._id === user._id) saveLocalUser(user)
//     return user;
// }

// async function login(userCred) {
//     // const users = await storageService.query('user')
//     // const user = users.find(user => user.username === userCred.username)
//     // return _saveLocalUser(user)
//     console.log('userCred:',userCred)
//     const user = await httpService.post('auth/login', userCred)
//     // socketService.emit('set-user-socket', user._id);
//     if (user) return saveLocalUser(user)
// }
// async function signup(userCred) {
//     console.log('userCred:',userCred)
//     // const user = await storageService.post('user', userCred)
//     const user = await httpService.post('auth/signup', userCred)
//     // socketService.emit('set-user-socket', user._id);
//     return saveLocalUser(user)
// }
// async function logout() {
//     sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
//     // socketService.emit('unset-user-socket');
//     return await httpService.post('auth/logout')
// }




// function saveLocalUser(user) {
//     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
//     return user
// }

// function getLoggedinUser() {
//     return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
// }


// // ;(async ()=>{
// //     await userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
// //     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
// //     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// // })()


// // This is relevant when backend is connected
// // ;(async () => {
// //     var user = getLoggedinUser()
// //     if (user) socketService.emit('set-user-socket', user._id)
// // })();

