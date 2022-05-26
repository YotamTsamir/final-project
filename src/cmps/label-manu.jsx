import { boardService } from "../services/board.service"
import { useDispatch } from 'react-redux'
import { setNewBoard, editTask } from "../store/action/board-action"
// dispatch(setNewBoard(newBoard))

export const LabelManu = ({ topic, board, task, box, colors }) => {
    const dispatch = useDispatch()
    const onAddLabel = async (ev, labelId) => {
        let newTask;
        if (task.labelIds.includes(labelId)) {
            const labelIdx = task.labelIds.findIndex(label => label === labelId)
            task.labelIds.splice(labelIdx, 1)
            newTask = { ...task, labelIds: task.labelIds }
            console.log(newTask)
        } else {
            newTask = { ...task, labelIds: [...task.labelIds, labelId] }
        }
        dispatch(editTask(board._id, box.id, newTask))
    }

    const onChangeColor = async (color) => {
        let newTask;
        console.log(color)
        newTask = { ...task, color:color }
        dispatch(editTask(board._id, box.id, newTask))
    }

    return <div className={`label-manu ${topic}`}>
        <h1 >{topic}</h1>
        <hr />
        <input type="text" />
        <p>{topic}</p>
        {(topic === 'Labels') && (board.labels.map(label => {
            return (
                <div className="label-choice" key={label.id} onClick={(ev) => onAddLabel(ev, label.id)} style={{ backgroundColor: label.color }}>{label.title}</div>
            )
        }))}
        <div className="color-grid">
            {(topic === 'Cover') && (colors.map(color => {
                return (
                    <div key={color} className="cover-menu-color" onClick={() => onChangeColor(color)} style={{ backgroundColor: color }}></div>
                )
            }))}
        </div>
    </div>
}