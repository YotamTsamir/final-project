import { boardService } from "../services/board.service"
import { useDispatch } from 'react-redux'
import { setNewBoard,editTask } from "../store/action/board-action"
// dispatch(setNewBoard(newBoard))

export const LabelManu = ({ board, task, box,onEditTaskTitle,setIsEdit }) => {
    const dispatch = useDispatch()
    const onAddLabel = async (ev, labelId) => {
      const newBoard = await boardService.editTaskTitle(board._id,box,task,false,labelId)
      dispatch(setNewBoard(newBoard))
    // console.log(task)
    // const newTask = task.labelIds.push(labelId)
    // dispatch(editTask(newTask))
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