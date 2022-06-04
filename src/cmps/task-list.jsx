import { TaskPreview } from "./task-preview"
import { utilService } from '../services/util.service'
import { boardService } from "../services/board.service"
import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { setNewBoard } from "../store/action/board-action"
import { useFormRegister } from "../hooks/useFormRegister"
import { Draggable } from "react-beautiful-dnd"


export const TaskList = ({ tasks, board, box }) => {
    const getStyle = (style, snapshot) => {
        if (!snapshot.isDropAnimating) {
            return {
                ...style,
                transition: `all 3s ease`,
                backgroundColor: "blue"
            }
        }}

        // patching the existing style


        return <div className="task-list">
            {tasks.map((task, index) => <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => {
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