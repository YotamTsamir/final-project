import { useState } from "react"
import { BoxPreview } from "./box-preview"
import { Draggable } from "react-beautiful-dnd"

export const BoxList = ({ boxes, board, onAddTask }) => {
    const [editTitleId, setEditTitleId] = useState('')
    const [newTaskId, setAddNewTask] = useState('')
    const [editStuff, setEditStuff] = useState({ editTitle: '', newTask: '' })

    if (!boxes) return <h1>Loading...</h1>
    return (
        boxes.map((box, index) => {
            return <Draggable key={box.id} draggableId={box.id} index={index}>
                {provided => {
                    return <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} index={index} >
                        <BoxPreview index={index} editTitleId={editTitleId}
                            setAddNewTask={setAddNewTask} newTaskId={newTaskId}
                            setEditTitleId={setEditTitleId} onAddTask={onAddTask}
                            board={board} box={box} key={box.id} />
                    </div>
                }}
            </Draggable>
        })
    )

}