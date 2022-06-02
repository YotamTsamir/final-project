
export const Activities = ({ board }) => {


console.log(board.activities)
    if (!board.activities) return <h1>Loading...</h1>
    return <div className="archived-tasks">
        {board.activities.map((activity, index) => {
            return (
                <div key={activity?.id} className="task-archived">
                    <div className="task-archived-txt" >
                        <p>{activity?.user.fullname || 'guest'} {activity?.action} {activity?.object.title} {activity?.about}</p>
                    </div>
                </div>
            )
        })}
    </div>
}