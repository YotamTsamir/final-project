import { TaskPreview } from "./task-preview"
import {utilService} from '../services/util.service'
import { boardService } from "../services/board.service"


export const TaskList = ({ tasks, board, box,onAddTask }) => {

    // const onAddTask = (boardId, boxId) => {
    //     const task = {id:utilService.makeId(4),title:prompt('what would you like to do?')}
    //     boardService.addTask(boardId, task, boxId)
    // }

    // if (!tasks.length) return <h1>Loading...</h1>
    return <div>
        {tasks.map(task => <TaskPreview board={board} key={task.title} task={task} />)}
        <div onClick={() => { onAddTask(board._id, box.id) }} className='add-card'>+ add a card</div>
    </div>
}