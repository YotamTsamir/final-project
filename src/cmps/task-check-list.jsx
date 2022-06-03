import { useEffect, useState } from "react"
import { useFormRegister } from "../hooks/useFormRegister"
import { boardService } from "../services/board.service"
import { faClock, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { utilService } from "../services/util.service"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { checkListService } from '../services/check-list.service'
import { useDispatch } from "react-redux"
import { setNewBoard,editTask } from "../store/action/board-action"


export const CheckList = ({ board, box, checkList, task }) => {
    const [editTodo, setEditTodo] = useState(false)
    const [register, newTodo, setNewTodo] = useFormRegister({ todo: '' })
    const [registery, editedTodo, setEditedTodo] = useFormRegister({ editedTodo: '' })
    const [doneTodos, setDoneTodos] = useState(0)
    const [completePerc,setCompletePerc] = useState(0)
    const dispatch = useDispatch()
    useEffect(()=>{
        calcCompletePercentage()
    },[checkList])
    const calcCompletePercentage = () => {
        const whole = checkList.todos.length
        const completedPercent = (doneTodos*100)/whole 
        setCompletePerc(completedPercent)
    }

    const addTodo = () => {
        setEditTodo('add-todo')
    }

    const onAddTodo = (ev) => {
        ev.preventDefault()
        const newTask = checkListService.addTodo(newTodo.todo,checkList,task)
        setNewTodo({ editedTodo: '' })
        setEditTodo('')
        // boardService.saveTask(board._id, newTask, box.id)
       dispatch(editTask(board._id, box.id, newTask))
    }

    const onEditTodo = (ev, todo) => {
        ev.preventDefault()
        const newTask = checkListService.editTodo(editedTodo.editedTodo,checkList,task,todo)
        setEditedTodo({ todo: '' })
        setEditTodo('')
        dispatch(editTask(board._id, box.id, newTask))
        console.log('current board is', board)
    }

    const toggleIsDone = (todo) => {
        const currCheckListIdx = task.checkLists.findIndex(currCheckList => currCheckList.id === checkList.id)
        const todoIdx = checkList.todos.findIndex(currTodo => currTodo.id === todo.id)
        let newTask = { ...task }
        let newTodo = { ...todo }
        if (todo.isDone) {
            newTodo.isDone = false
            setDoneTodos(doneTodos - 1)
        }
        else {
            newTodo.isDone = true
            setDoneTodos(doneTodos + 1)
        }
        newTask.checkLists[currCheckListIdx].todos[todoIdx] = newTodo
        dispatch(editTask(board._id, box.id, newTask))
        calcCompletePercentage()
    }

    console.log(completePerc)


    return <div className="check-list">
        <h1>{checkList.title}</h1>
        <div className="progress-bar"></div>
        <Droppable type={{ task, box }} droppableId={checkList.id}>
            {provided => {
                return (
                    <div className="check-list-container" ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {checkList.todos.map((todo, index) => {
                            return (
                                //    (editTodo) && 
                                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                    {provided => {
                                        return <div className="todo-drag"  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} index={index} >
                                            <div className="todo-container ">
                                                {(todo.isDone) && <div onClick={() => toggleIsDone(todo)}><FontAwesomeIcon icon={faSquareCheck} /></div>}
                                                {(!todo.isDone) && <div onClick={() => toggleIsDone(todo)}><FontAwesomeIcon icon={faSquare} /></div>}
                                                {(!editTodo || editTodo !== todo.id) && <div onClick={() => setEditTodo(todo.id)} className={(todo.isDone) ? 'line-through' : ''} >{todo.title}</div>}
                                                {(editTodo === todo.id) && <div><form onSubmit={(ev) => onEditTodo(ev, todo)}><input {...registery('editedTodo')} /></form></div>}
                                            </div>
                                        </div>
                                    }}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )
            }}
        </Droppable>
        {(!editTodo) && <button onClick={() => addTodo()}>Add an item</button>}
        {(editTodo === 'add-todo') && <div><form onSubmit={(ev) => { onAddTodo(ev) }}><input {...register('todo')} /></form></div>}
    </div>
}