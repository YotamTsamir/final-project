import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { boardService } from "../services/board.service"
import { editTask, getBoard, loadBoards, setNewBoard } from "../store/action/board-action"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import { TimeAgo } from "../services/time-ago"
export const ArchivedTasks = ({ board }) => {
    const [tasks, setTasks] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        setArchivedTasks()
    }, [board])

    const setArchivedTasks = () => {
        let tasks = []
        board.boxes.map(box => {
            box.tasks.map((task,idx) => {
              
                if (task.archivedAt) tasks.push({ task, inBox: box })

            })
        })
        setTasks(tasks)
    }

    const sendToBoard = (task, box, taskIdx) => {
        console.log(task.archivedAt)
        const newTask = { ...task, archivedAt: '' }
        setTasks(tasks.splice(taskIdx, 1))
        dispatch(editTask(board._id, box.id, newTask))
    }
    const onDeleteTask = async (task, box) => {
        await boardService.deleteTask(board._id, box.id, task.id)
        dispatch(getBoard(board._id))
    }
    if(!tasks) return <h1>Loading...</h1>
    return <div className="archived-tasks">
        {tasks.map((task, index) => {
            return (
                <div key={task.id} className="task-archived">
                    <div className="task-archived-txt" >
                        <span>{task.task.title}</span>
                        <p>
                            <FontAwesomeIcon icon={faArchive} />
                            <span>Archived</span>
                        </p>
                    </div>
                    <div className="archived-tasks-btns">
                        <button onClick={() => sendToBoard(task.task, task.inBox, index)}>
                            <p>Send to board</p>
                        </button>
                        <button onClick={() => onDeleteTask(task.task, task.inBox, index)}>
                            <p>Delete</p>
                        </button>
                    </div>
                </div>
            )
        })}
    </div>
}