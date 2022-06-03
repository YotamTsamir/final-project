import { useEffect, useState } from "react"
import { useFormRegister } from "../hooks/useFormRegister"
import { boardService } from "../services/board.service"
import { faClock, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { utilService } from "../services/util.service"
import { Droppable,Draggable } from "react-beautiful-dnd"


export const CheckList = ({ board, box, checkList, task }) => {
    const [editTodo, setEditTodo] = useState(false)
    const [register, newTodo, setNewTodo] = useFormRegister({ todo: '' })
    const [registery, editedTodo, setEditedTodo] = useFormRegister({ editedTodo: '' })
    const [doneTodos, setDoneTodos] = useState(0)

   

    const addTodo = () => {
        setEditTodo('add-todo')
    }

    const onAddTodo = (ev) => {
        ev.preventDefault()
        const todoToAdd = { id: utilService.makeId(3), title: newTodo.todo, isDone: false }
        const newCheckList = { ...checkList, todos: [...checkList.todos, todoToAdd] }
        const currCheckListIdx = task.checkLists.findIndex(currCheckList => currCheckList.id === checkList.id)
        let newTask = { ...task }
        newTask.checkLists[currCheckListIdx] = newCheckList
        console.log('task saving is', newTask)
        setNewTodo({ editedTodo: '' })
        setEditTodo('')
        boardService.saveTask(board._id, newTask, box.id)
    }

    const onEditTodo = (ev, todo) => {
        ev.preventDefault()
        const currCheckListIdx = task.checkLists.findIndex(currCheckList => currCheckList.id === checkList.id)
        const todoIdx = checkList.todos.findIndex(currTodo => currTodo.id === todo.id)
        let newTask = { ...task }
        let newTodo = { ...todo, title: editedTodo.editedTodo }
        newTask.checkLists[currCheckListIdx].todos[todoIdx] = newTodo
        setEditedTodo({ todo: '' })
        setEditTodo('')
        setDoneTodos(doneTodos + 1)
        boardService.saveTask(board._id, newTask, box.id)

    }

    const toggleIsDone = (todo) => {
        const currCheckListIdx = task.checkLists.findIndex(currCheckList => currCheckList.id === checkList.id)
        const todoIdx = checkList.todos.findIndex(currTodo => currTodo.id === todo.id)
        let newTask = { ...task }
        let newTodo = { ...todo }
        if (todo.isDone) {
            newTodo.isDone = false
            setDoneTodos(doneTodos + 1)
        }
        else {
            newTodo.isDone = true
            setDoneTodos(doneTodos - 1)
        }
        newTask.checkLists[currCheckListIdx].todos[todoIdx] = newTodo
        boardService.saveTask(board._id, newTask, box.id)
    }

    console.log(checkList)

    return <div className="check-list">
        <h1>{checkList.title}</h1>
        <div className="progress-bar"></div>
        <Droppable type={{task,box}} droppableId={checkList.id}>
            {provided => {
                return (
                    <div className="check-list-container" ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {checkList.todos.map((todo,index) => {
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