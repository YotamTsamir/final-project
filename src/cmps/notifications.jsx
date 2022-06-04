import { useEffect, useState } from "react"
import { userService } from "../services/user-service"

export const Notifications = ({user}) => {
    // const [user, setUser] = useState('')
    const [noti,setNoti] = useState(user.notifications)
    useEffect(()=>{
        user = userService.getLoggedinUser()
    },[])


    if (!user.notifications) return <h1>Loading...</h1>
    return <div className="notifications">
        {user.notifications.map((notification, index) => {
            return (
                <div key={notification?.id} className="task-archived">
                    <div className="task-archived-txt" >
                        <p>{notification?.user.fullname || 'guest'} {notification?.action} {notification?.object.title} {notification?.about}</p>
                    </div>
                </div>
            )
        })}
    </div>
}

