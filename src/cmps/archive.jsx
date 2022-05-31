import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { boardService } from "../services/board.service"
import { editTask, getBoard, loadBoards, setNewBoard } from "../store/action/board-action"

export const ArchivedTasks = ({ board }) => {
    const [tasks, setTasks] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        let tasks = []
        board.boxes.map(box => {
            box.tasks.map(task => {
                if (task.archivedAt) tasks.push({task,inBox:box})
            })
        })
        setTasks(tasks)
    }, [])

    const sendToBoard = (task,box,taskIdx) => {
        const newTask = {...task,archivedAt:''}
        // let tasks = []
        // board.boxes.map(box => {
        //     box.tasks.map(task => {
        //         if (task.archivedAt) tasks.push({task,inBox:box})
        //     })
        // })
        setTasks(tasks.splice(taskIdx,1))
        dispatch(editTask(board._id, box.id, newTask))
    }
    const onDeleteTask = async (task,box) => {
        await boardService.deleteTask(board._id,box.id,task.id)
        dispatch(getBoard(board._id))
    }

    return <div className="archived-tasks">
        {tasks.map((task,index) => {
            return (
                <div key={task.id}>
                <div className="task" >{task.task.title}</div>
                <button onClick={()=>sendToBoard(task.task,task.inBox,index)}>Send to board</button>
                <button onClick={()=>onDeleteTask(task.task,task.inBox,index)}>Delete</button>
                </div>
            ) 
        })}
    </div>
}