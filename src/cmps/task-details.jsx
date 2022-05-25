import { useSelector, useDispatch } from 'react-redux'
import { toggleDetails } from "../store/action/board-action"


export const TaskDetails = () => {
    const { task } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    const onToggleDetails = () => {
        dispatch(toggleDetails())
    }

    if (!task) return 
    return <div className={`task-details ${task ? '' : 'hidden'}`}>
        <button onClick={onToggleDetails}>X</button>
        <h1>Task Details</h1>
        <pre>{JSON.stringify(task)}</pre>
    </div>
}