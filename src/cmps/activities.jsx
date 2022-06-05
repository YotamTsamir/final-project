import { TimeAgo } from "../services/time-ago"
export const Activities = ({ board }) => {


    const getTimeStamp = (activity) => {
        const timeStamp = activity.timeStamp
        console.log('timeStamp', activity.timeStamp)
        const timeAgo = TimeAgo(timeStamp)
        return timeAgo
    }
    console.log(board.activities)
    if (!board.activities) return <h1>Loading...</h1>
    return <div className="board-menu-activities">
        <div className="activity-tasks ">
            {board.activities.map((activity, index) => {
                return (
                    <div key={activity?.id} className="task-activities">
                        <div className="avatar-task-activity">
                        <div className="activity-avatar">
                            {(activity.user.fullname !== 'Guest') ?
                                <img src={activity.user.avatar} />
                                :
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUqOq31iJPIGiwT8if3AxZugFDpkNPz5YXTg&usqp=CAU" />}
                        </div>
                        <div className="activity-txt-time-ago">
                        <div className="task-activity-txt" >
                            <p>
                                <span className="bold-span"> {activity?.user.fullname || 'Guest'}</span>
                                {activity?.action}
                                <span className="underline-span">{activity?.object.title}</span>
                                {activity?.about}
                            </p>
                        </div>
                        <div className="activities-time-ago">{getTimeStamp(activity)}</div>
                    </div>
                    </div>
                        </div>
                )
            })}
        </div>
    </div>
}