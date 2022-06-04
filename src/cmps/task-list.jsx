import { TaskPreview } from "./task-preview"
import { utilService } from '../services/util.service'
import { boardService } from "../services/board.service"
import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { setNewBoard } from "../store/action/board-action"
import { useFormRegister } from "../hooks/useFormRegister"
import { Draggable } from "react-beautiful-dnd"


export const TaskList = ({ labelFilter, newBoardFilter, tasks, board, box }) => {
    const [isShown, setIsShown] = useState(true)
    const getStyle = (style, snapshot) => {
        if (!snapshot.isDropAnimating) {
            return {
                ...style,
                transition: `all 3s ease`,
                backgroundColor: "blue"
            }
        }
    }
 
    // patching the existing style

    // if(!labelFilter.map(labelId=>{
    //     if(task.labelIds.includes(labelId)) return true
    // })) return


    return <div className="task-list">
        {tasks.map((task, index) => <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided, snapshot) => {
                if (!task.title.includes(newBoardFilter)) return
                if(labelFilter.length){
                  if (!labelFilter.find(currLabelId=>task.labelIds.includes(currLabelId))) return
                }
                return <div
                    style={getStyle(provided.draggableProps.style, snapshot)}
                    className="task-father" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} index={index} >
                    <TaskPreview box={box} board={board} key={task.id} task={task} />
                </div>
            }}
        </Draggable>
        )}

    </div>
}