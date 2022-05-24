export const TaskDetails = ({task}) => {
    console.log('AAAAAAAAAAAAAAAAAAAAAA',task)
    if (!task) return <h1>Loading...</h1>
    return <div className="task-details">
        <h1>Task Details</h1>
    </div>
}