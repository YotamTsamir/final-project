import { utilService } from "./util.service"


export const checkListService = {
    addTodo,
    editTodo,
    addCheckList
}


function addCheckList(title,task){
    const newCheckList = { id:utilService.makeId(4),title:title, todos: [] }
    const newTask = { ...task, checkLists: [...task.checkLists, newCheckList] }
    return newTask
}

function addTodo(newTitle,checkList,task){
    const todoToAdd = { id: utilService.makeId(3), title: newTitle, isDone: false }
    const newCheckList = { ...checkList, todos: [...checkList.todos, todoToAdd] }
    const currCheckListIdx = task.checkLists.findIndex(currCheckList => currCheckList.id === checkList.id)
    const newTask = { ...task }
    newTask.checkLists[currCheckListIdx] = newCheckList
    return newTask
}

function editTodo(newTitle,checkList,task,todo){
    const currCheckListIdx = task.checkLists.findIndex(currCheckList => currCheckList.id === checkList.id)
    const todoIdx = checkList.todos.findIndex(currTodo => currTodo.id === todo.id)
    const newTask = { ...task }
    const newTodo = { ...todo, title: newTitle }
    newTask.checkLists[currCheckListIdx].todos[todoIdx] = newTodo
    console.log(newTask.checkLists[currCheckListIdx])
    return newTask
}