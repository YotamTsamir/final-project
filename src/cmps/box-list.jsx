import { useState } from "react"
import { BoxPreview } from "./box-preview"

export const BoxList = ({ boxes, board, onAddTask }) => {
    const [editTitleId, setEditTitleId] = useState('')
    const [newTaskId,setAddNewTask] = useState('')
    const [editStuff,setEditStuff] = useState({editTitle:'',newTask:''})

    if (!boxes) return <h1>Loading...</h1>
    return boxes.map(box => <BoxPreview editTitleId={editTitleId}
        setAddNewTask={setAddNewTask} newTaskId={newTaskId}
        setEditTitleId={setEditTitleId} onAddTask={onAddTask}
        board={board} box={box} key={box.id} />)
}