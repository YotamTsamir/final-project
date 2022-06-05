import { TimeAgo } from "../services/time-ago"
export const Activities = ({ board }) => {


    const getTimeStamp = (activity) => {
        const timeStamp = activity.timeStamp
        console.log('timeStamp',activity.timeStamp)
        const timeAgo = TimeAgo(timeStamp)
        return timeAgo
    }

    if (!board.activities) return <h1>Loading...</h1>
    return <div className="board-menu">
    <div className="archived-tasks ">
        {board.activities.map((activity, index) => {
            return (
                <div key={activity?.id} className="task-archived">

                    <div className="task-archived-txt" >
                        <p> <span className="bold-span"> {activity?.user?.fullname || 'guest'}</span> {activity?.action} <span className="underline-span">{activity?.object.title}</span> {activity?.about}</p>
                    </div>
                    <div className="activities-time-ago">{getTimeStamp(activity)}</div>
                </div>
            )
        })}
    </div>
    </div>
}