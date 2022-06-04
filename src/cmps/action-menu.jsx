import { useState } from "react";
import { boardService } from "../services/board.service"
import { useDispatch } from 'react-redux'
import { BgImgList } from "./bg-image-list";
import { setNewBoard, editTask, editBoard } from "../store/action/board-action"
import DatePicker from 'react-date-picker';
import Calendar from 'react-calendar'
import { utilService } from "../services/util.service";
import { TaskBgPreview } from '../cmps/task/task-bg-preview';
//Need to implement the component and it's function
import { TaskCoverMenu } from "./task/task-cover-menu";
import { useFormRegister } from "../hooks/useFormRegister";
import { checkListService } from "../services/check-list.service";


export const ActionMenu = ({ topic, board, task, box, colors, toggleMenu }) => {
    const [dfBgs, onSetImages] = useState(boardService.getDefaultBgs())
    const [register, newCheckListTitle, setCheckListTitle] = useFormRegister({ title: '' })
    const [registry, newLabelTxt, setNewLabelTxt] = useFormRegister({ txt: '' })
    const [labelFilter, newLabelFilter, setNewLabelFilter] = useFormRegister({ txt: '' })
    const [value, onChange] = useState(new Date());
    const [createLabel, onCreateLabel] = useState(false)
    const [newLabelColor, setNewLabelColor] = useState('')
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
        if (task.members.find(currMember => currMember.userName === member.userName)) {
            const memberIdx = task.members.findIndex(currMember => currMember.userName === member.userName)
            task.members.splice(memberIdx, 1)
            newTask = { ...task, members: task.members }
        } else {
            newTask = { ...task, members: [...task.members, member] }
        }

        dispatch(editTask(board._id, box.id, newTask))
    }

    const onChangeDate = (value) => {
        onChange(value)


        const newTask = {
            ...task, date: {
                timeStamp: value,
                month: utilService.getMonthName(value.getMonth()),
                day: value.getDate(), isComplete: ''
            }
        }
        dispatch(editTask(board._id, box.id, newTask))
    }

    const onChangeBgImg = async ({ target }) => {
        let newTask;
        console.log(target.value)
        newTask = { ...task, bg: target.value }
        dispatch(editTask(board._id, box.id, newTask))
    }

    const onChangeBgColor = async (color) => {
        let newTask;
        newTask = { ...task, bg: color }
        dispatch(editTask(board._id, box.id, newTask))
    }

    const onCreateCheckList = async (ev) => {
        ev.preventDefault()
        const newTask = checkListService.addCheckList(newCheckListTitle.title, task)
        setCheckListTitle({ title: '' })
        toggleMenu(topic)
        dispatch(editTask(board._id, box.id, newTask))
    }

    const onSubmitCreateLabel = (ev) => {
        ev.preventDefault()
        if (!newLabelColor) return
        console.log(newLabelColor)
        const newLabel = { id: utilService.makeId(4), title: newLabelTxt.txt, color: newLabelColor }
        board.labels.push(newLabel)
        dispatch(editBoard(board))
    }

    return <div className={`menu-choice ${topic}`}>
        <div className="h1-topic-container">
            <h1 className="h1-topic">{topic}</h1>
        </div>
        <hr />
        {(topic === 'Members' || topic === 'Labels') && <input {...labelFilter('txt')} />}
        {(topic === 'Members') && <p>Board members</p>}
        <div className="labels-container">
            {(topic === 'Labels') && (!createLabel) && (board.labels.map(label => {
                if (!label.title.includes(newLabelFilter.txt)) return
                return (
                    <div className="label-choice"
                        key={label.id}
                        onClick={(ev) => onAddLabel(ev, label.id)}
                        style={{ backgroundColor: label.color }}>
                        {label.title}</div>
                )
            }))
            }
            {(topic === 'Labels') && (!createLabel) && <button onClick={() => { onCreateLabel(!createLabel) }}>Create a new label</button>}
        </div>
        {(createLabel) && <div>
            <p>Name</p>
            <form onSubmit={(ev) => { onSubmitCreateLabel(ev) }}><input {...registry('txt')} /></form>
            <div className="color-grid">
                {(colors.map(color => {
                    return (
                        <div key={color} className="cover-menu-color" value={color} onClick={() => setNewLabelColor(color)} style={{ backgroundColor: color }}></div>
                    )
                }))}
                <button onClick={(ev) => { onSubmitCreateLabel(ev) }}>Create</button>
            </div>
        </div>}
        <div >
            {(topic === 'Cover') && <div>
                <TaskBgPreview />
                <div className="color-grid">
                    {(colors.map(color => {
                        return (
                            <div key={color} className="cover-menu-color" value={color} onClick={() => { }} style={{ backgroundColor: color }}></div>
                        )
                    }))}
                </div>
                <div className="bg-container cover-menu">
                    <h4 className="cover-menu-h4">Photos from Unsplash</h4>
                    <TaskCoverMenu
                        dfBgs={dfBgs}
                        onChange={onChangeBgImg}
                        toggleMenu={toggleMenu}
                        topic={topic} />
                </div>
            </div>
            }

            {(topic === 'Date') && <div>
                <Calendar onChange={onChangeDate} value={value} />
            </div>}

            {(topic === 'Members') && <div className="members-container">
                {board.members.map((member, idx) => {
                    if (!member.fullname.includes(newLabelFilter.txt)) return
                    return (<div key={idx} onClick={() => onAddMember(member)} className="members-div">
                        {board.members &&
                            <div className="board-members">
                                <div  >
                                    <img className={`member-preview ${idx}`} src={member.avatar} />
                                </div>

                            </div>
                        }
                        {member.fullname} ({member.userName}) </div>
                    )
                })}
            </div>}
            {(topic === 'Checklist') &&
                <div className="add-checklist-container">
                    <form onSubmit={(ev) => onCreateCheckList(ev)}>
                        <h4>Title</h4>
                        <input {...register('title')} />
                        <div className="create-checklist-btns">
                            <button className="create-new-checklist" type="submit">
                                Create
                            </button>
                            <button
                                className="cancel-checklist-creation"
                                type="button"
                                onClick={() => toggleMenu(topic)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>}
        </div>
    </div>
}