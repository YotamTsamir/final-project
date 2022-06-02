import { useState } from "react"


export const CheckList = ({ checkList, task }) => {
    const [editTodo, setEditTodo] = useState(false)

    const addTodo = () => {
        setEditTodo('add-todo')
    }

    const onAddTodo = (todo) => {
        const newCheckList = {...checkList,todos:{...checkList.todos,todo}}
    }

    return <div className="check-list">
        <h1>{checkList.title}</h1>
        <div className="progress-bar"></div>
        {checkList.todos.map(todo => {
            return (
        //    (editTodo) && 
           <div className="todo">{todo}</div>
        )
        })}
       {(!editTodo) && <button onClick={()=>addTodo()}>Add an item</button>}
    </div>
}