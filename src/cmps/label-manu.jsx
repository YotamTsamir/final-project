import { boardService } from "../services/board.service"
import { useDispatch } from 'react-redux'
import { setNewBoard,editTask } from "../store/action/board-action"
// dispatch(setNewBoard(newBoard))

export const LabelManu = ({ board, task, box,onEditTaskTitle,setIsEdit }) => {
    const dispatch = useDispatch()
    const onAddLabel = async (ev, labelId) => {
        let newTask;
    if(task.labelIds.includes(labelId)) {
    const labelIdx = task.labelIds.findIndex(label => label === labelId)
    task.labelIds.splice(labelIdx,1)
    newTask = {...task,labelIds:task.labelIds}
    console.log(newTask)
    } else {
    newTask = {...task,labelIds:[...task.labelIds,labelId]}
    }
    dispatch(editTask(board._id,box.id,newTask))
    }

    return <div className="label-manu">
        <h1 >Labels</h1>
        <hr />
        <input type="text" />
        <p>Labels</p>
        {(board.labels.map(label => {
            return (
                <div className="label-choice" key={label.id} onClick={(ev) => onAddLabel(ev, label.id)} style={{ backgroundColor: label.color }}>{label.title}</div>
            )
        }))}
    </div>
}