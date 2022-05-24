import { TaskList } from "./task-list"


export const BoxPreview = ({box,board,onAddTask}) => {
    if(!box) return <h1>Loading</h1>
    return <div className="box">
        <h2 className="box-title">{box.title}</h2>
        <TaskList board={board} onAddTask={onAddTask} box={box} tasks={box.tasks}/>
    </div>    
}