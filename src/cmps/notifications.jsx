import { useEffect, useState } from "react"
import { userService } from "../services/user-service"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from '@fortawesome/free-solid-svg-icons'


export const Notifications = ({ user }) => {
    // const [user, setUser] = useState('')
    const [noti, setNoti] = useState(user.notifications)
    useEffect(() => {
        user = userService.getLoggedinUser()
    }, [])


    //need to add a toggle function to "read-unread-toggle" span

    // console.log(user.notifications)
    if (!user.notifications) return <div className="notifications-container">
        <h4>Notifications</h4>
        <div><hr /></div>
        <div>No notification at the moment...</div>
    </div>
    return <div className="notifications-container">
        <h4>Notifications</h4>
        <div><hr /></div>
        <div className="notification-list">
            {user.notifications.map((notification, index) => {
                return (
                    <div key={notification?.id} className="task-archived">
                        <div className="task-archived-txt" >
                            <span
                                className={`read-unread-toggle ${notification?.isRead || 'unread'}`}
                            // onClick={() => toggleRead(notification.id)}
                            >
                                <FontAwesomeIcon className="fa-circle" icon={faCircle} />
                            </span>
                            <div className={`notification-container ${notification?.isRead || 'unread'}`}>
                                <div className="notification-user">
                                    <div className="not-user-img"
                                        style={{
                                            background: `url(${notification.user.avatar})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}></div>
                                    <p className="not-user-name">
                                        {notification?.user.fullname || 'guest'}
                                    </p>
                                </div>
                                <div className="notification-details">
                                    <p className="not-action">
                                        {notification?.action}
                                    </p>
                                    <p className="not-object">
                                        {notification?.object.title}
                                    </p>
                                    <p className="not-about">
                                        {notification?.about}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {(index !== user.notifications.length - 1) &&
                            <div><hr className="divider" /></div>
                        }
                    </div>
                )
            })}
        </div>
    </div>
}

