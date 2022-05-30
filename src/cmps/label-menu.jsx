import { useState } from "react";
import { boardService } from "../services/board.service"
import { useDispatch } from 'react-redux'
import { setNewBoard, editTask } from "../store/action/board-action"
import DatePicker from 'react-date-picker';
import { utilService } from "../services/util.service";

// dispatch(setNewBoard(newBoard))

export const LabelMenu = ({ topic, board, task, box, colors, emitDateValue }) => {
    const [value, onChange] = useState(new Date());
    const dispatch = useDispatch()

    const onAddLabel = async (ev, labelId) => {
        let newTask;
        if (task.labelIds.includes(labelId)) {
            const labelIdx = task.labelIds.findIndex(label => label === labelId)
            task.labelIds.splice(labelIdx, 1)
            newTask = { ...task, labelIds: task.labelIds }
        } else {
            newTask = { ...task, labelIds: [...task.labelIds, labelId] }
        }
        dispatch(editTask(board._id, box.id, newTask))
    }
    
    const onAddMember = (member) => {
        // const newTask = { ...task, members: [...task.members, member]}
        let newTask;
        console.log(member.userName)
        console.log(task.members)
        if(task.members.find(currMember=> currMember.userName === member.userName)){
            const memberIdx = task.members.findIndex(currMember => currMember.userName === member.userName)
            task.members.splice(memberIdx,1)
            newTask={...task,members:task.members}
        } else {
            newTask= {...task,members:[...task.members,member]}
        }

        dispatch(editTask(board._id, box.id, newTask))
    }

    const onChangeDate = (value) => {

        onChange(value)
        // emitDateValue && emitDateValue(value)
        const newTask = {
            ...task, date: {
                month: utilService.getMonthName(value.getMonth()),
                day: value.getDate(), isComplete: ''
            }
        }
        dispatch(editTask(board._id, box.id, newTask))
    }
   

    const onChangeColor = async (color) => {
        let newTask;
        newTask = { ...task, color: color }
        dispatch(editTask(board._id, box.id, newTask))
    }

    return <div className={`label-choice ${topic}`}>
        <div className="h1-topic-container">
        <h1 className="h1-topic">{topic}</h1>
        </div>
        <hr />
        <input type="text" />
        <p>{topic}</p>
        <div className="labels-container">
        {(topic === 'Labels') && (board.labels.map(label => {
            return (
                <div className="label-choice" key={label.id} onClick={(ev) => onAddLabel(ev, label.id)} style={{ backgroundColor: label.color }}>{label.title}</div>
            )
        }))}
        </div>
        <div className="color-grid">
            {(topic === 'Cover') && (colors.map(color => {
                return (
                    <div key={color} className="cover-menu-color" onClick={() => onChangeColor(color)} style={{ backgroundColor: color }}></div>
                )
            }))}
        </div>
        {(topic === 'Date') && <div>
            <DatePicker
                isOpen={true} closeCalendar={false} onChange={onChangeDate} value={value} onClick={(ev) => {ev.stopPropagation()}}
            />
        </div>}
        {(topic === 'Members') && <div className="members-contianer">
            {board.members.map((member,idx) => {
                return(
                    <div key={idx} onClick={() => onAddMember(member)} className="members-div">{member.userName}</div>
                )
            })}
        </div>}
    </div>
}