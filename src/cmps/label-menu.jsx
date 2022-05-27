import { useState } from "react";
import { boardService } from "../services/board.service"
import { useDispatch } from 'react-redux'
import { setNewBoard, editTask } from "../store/action/board-action"
import DatePicker from 'react-date-picker';
import { utilService } from "../services/util.service";

// dispatch(setNewBoard(newBoard))

export const LabelMenu = ({ topic, board, task, box, colors }) => {
    const [value, onChange] = useState(new Date());
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

    const onChangeDate = (value) => {
        onChange(value)
        const newTask = {
            ...task, date: {
                month: utilService.getMonthName(value.getMonth()),
                day: value.getDate(), isComplete: ''
            }
        }
        dispatch(editTask(board._id, box.id, newTask))
    }

    const onAddMember = (member) => {
        const newTask = { ...task, members: [...task.members, member]}
        dispatch(editTask(board._id, box.id, newTask))
    }

    const onChangeColor = async (color) => {
        let newTask;
        newTask = { ...task, color: color }
        dispatch(editTask(board._id, box.id, newTask))
    }

    return <div className={`label-menu ${topic}`}>
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
        {(topic === 'Date') && <div>
            <DatePicker
                isOpen={true} closeCalendar={false} onChange={onChangeDate} value={value}
            />
        </div>}
        {(topic === 'Change members') && <div>
            {board.members.map(member => {
                return(
                    <div onClick={() => onAddMember(member)} className="members-div">{member.userName}</div>
                )
            })}
        </div>}
    </div>
}