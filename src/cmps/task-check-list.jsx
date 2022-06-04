import { useEffect, useState } from "react"
import { useFormRegister } from "../hooks/useFormRegister"
import { boardService } from "../services/board.service"
import { faClock, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { utilService } from "../services/util.service"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { checkListService } from '../services/check-list.service'
import { useDispatch } from "react-redux"
import { setNewBoard, editTask } from "../store/action/board-action"
import { userService } from "../services/user-service"


export const CheckList = ({ board, box, checkList, task }) => {
    const [editTodo, setEditTodo] = useState(false)
    const [register, newTodo, setNewTodo] = useFormRegister({ todo: '' })
    const [registery, editedTodo, setEditedTodo] = useFormRegister({ editedTodo: '' })
    const [doneTodos, setDoneTodos] = useState(0)
    const [completePerc, setCompletePerc] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        calcCompletePercentage()
    }, [checkList])
    const calcCompletePercentage = () => {
        const whole = checkList.todos.length
        const completedPercent = (doneTodos * 100) / whole
        setCompletePerc(completedPercent)
    }

    const addTodo = () => {
        setEditTodo('add-todo')
    }

    const closeTodo = () => {
        setEditTodo('')
    }

    const onAddTodo = (ev) => {
        ev.preventDefault()
        const newTask = checkListService.addTodo(newTodo.todo, checkList, task)
        setNewTodo({ editedTodo: '' })
        setEditTodo('')
        // boardService.saveTask(board._id, newTask, box.id)
        // const activity = { user:userService.getLoggedinUser(), action: `added`, isRead: false, id: utilService.makeId(), object: box, about: 'to his board', timeStamp: Date.now() }
        dispatch(editTask(board._id, box.id, newTask))
    }

    const onEditTodo = (ev, todo) => {
        ev.preventDefault()
        const newTask = checkListService.editTodo(editedTodo.editedTodo, checkList, task, todo)
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
        let activity
        if (todo.isDone) {
            newTodo.isDone = false
            activity = { user:userService.getLoggedinUser(), action: `marked an item incomplete`, isRead: false,
            id: utilService.makeId(), object:todo, about: `on ${task.title}`, timeStamp: Date.now() }
            setDoneTodos(doneTodos - 1)
        }
        else {
            newTodo.isDone = true
            activity = { user:userService.getLoggedinUser(), action: `has completed`, isRead: false,
            id: utilService.makeId(), object:todo, about: `on ${task.title}`, timeStamp: Date.now() }
            setDoneTodos(doneTodos + 1)
        }
        newTask.checkLists[currCheckListIdx].todos[todoIdx] = newTodo
        dispatch(editTask(board._id, box.id, newTask,activity))
        calcCompletePercentage()
    }



    return <div className="check-list">
        <div className="checklist-header">
            <span className="left-side-icons"><FontAwesomeIcon icon={faSquareCheck} /></span>
            <h1 className="section-header">{checkList.title}</h1>
        </div>
        <div className="progress-bar"></div>
        <Droppable type={{ task, box }} droppableId={checkList.id}>
            {provided => {
                return (
                    <div className="check-list-container" ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {checkList.todos.map((todo, index) => {
                            return (
                                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                    {provided => {
                                        return <div className="todo-drag"  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} index={index} >
                                            <div className="todo-container ">
                                                {(todo.isDone) &&
                                                    <span onClick={() => toggleIsDone(todo)} className="left-side-icons">
                                                        <FontAwesomeIcon icon={faSquareCheck} />
                                                    </span>}
                                                {(!todo.isDone) &&
                                                    <span onClick={() => toggleIsDone(todo)} className="left-side-icons">
                                                        <FontAwesomeIcon icon={faSquare} />
                                                    </span>}
                                                {(!editTodo || editTodo !== todo.id) &&
                                                    <div onClick={() => setEditTodo(todo.id)} className={`todo-txt ${(todo.isDone) ? 'line-through' : ''}`} >
                                                        {todo.title}
                                                    </div>}
                                                {(editTodo === todo.id) &&
                                                    <div  className="edit-todo-container">
                                                        <form 
                                                        onSubmit={(ev) => onEditTodo(ev, todo)}
                                                        className="edit-todo-form">
                                                            <textarea {...registery('editedTodo')} className="edit-todo-textarea" value={todo.title} />
                                                            <div className="edit-todo-btns">
                                                                <button
                                                                    type="submit"
                                                                    className="save-todo-btn save-cancel-btns">
                                                                    Save
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="exit-edit-todo save-cancel-btns"
                                                                    onClick={closeTodo}>
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>}
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
        {(!editTodo) &&
            <button className="add-todo-btn"
                onClick={() => addTodo()}>
                Add an item
            </button>}
        {(editTodo === 'add-todo') &&
            <div>
                <form 
                onSubmit={(ev) => { onAddTodo(ev) }}
                className="add-todo-form">
                    <textarea
                        {...register('todo')}
                        className="add-todo-textarea"
                        placeholder="Add an item"
                    />
                    <div className="add-todo-btns">
                        <button
                            type="submit"
                            className="save-new-todo-btn save-cancel-btns">
                            Save
                        </button>
                        <button
                            type="button"
                            className="exit-new-todo save-cancel-btns"
                            onClick={closeTodo}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>}
    </div>
}