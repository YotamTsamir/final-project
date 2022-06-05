import { useEffect, useState } from "react";
import { boardService } from "../services/board.service"
import { useDispatch } from 'react-redux'
import { BgImgList } from "./bg-image-list";
import { setNewBoard, editTask, editBoard } from "../store/action/board-action"
import DatePicker from 'react-date-picker';
import Calendar from 'react-calendar'
import { utilService } from "../services/util.service";
import { TaskBgPreview } from '../cmps/task/task-bg-preview';
import { userService } from "../services/user-service";
import { TaskCoverMenu } from "./task/task-cover-menu";
import { useFormRegister } from "../hooks/useFormRegister";
import { checkListService } from "../services/check-list.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'

export const ActionMenu = ({ topic, board, task, box, colors, toggleMenu, coverMenuClass }) => {
    const [defaultBgs, setDefaultBgs] = useState(null)
    const [register, newCheckListTitle, setCheckListTitle] = useFormRegister({ title: '' })
    const [registry, newLabelTxt, setNewLabelTxt] = useFormRegister({ txt: '' })
    const [labelFilter, newLabelFilter, setNewLabelFilter] = useFormRegister({ txt: '' })
    const [value, onChange] = useState(new Date());
    const [createLabel, onCreateLabel] = useState(false)
    const [newLabelColor, setNewLabelColor] = useState('')
    const dispatch = useDispatch()
    const [imageURL, setImageURL] = useState(null)


    useEffect(() => {
        setBgs()
        console.log('banaynay')
    }, [])

    const setBgs = async () => {
        const bgs = await boardService.getDefaultBgs()
        console.log(bgs)
        setDefaultBgs(bgs)
    }
    console.log(defaultBgs)


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
    }

    const  promptPicture  =  () => {
        const pictureUrl = prompt('Add a picture url')
        onChangeBgImg(pictureUrl)
    }

    useEffect(() => {
        promptPicture()
    }, [])

    useEffect(() => {
        console.log(imageURL)
    }, [imageURL])

    const onSaveDueDate = () => {
        const newTask = {
            ...task, date: {
                timeStamp: value,
                month: utilService.getMonthName(value.getMonth()),
                day: value.getDate(), isComplete: ''
            }
        }
        dispatch(editTask(board._id, box.id, newTask))
        toggleMenu(topic)
    }

    const onChangeBgImg = async (imgUrl) => {
        let newTask;
        // console.log(target.value)
        newTask = { ...task, bg: `url(${imgUrl})` }
        console.log(newTask)
        dispatch(editTask(board._id, box.id, newTask))
    }

    const onChangeBgClr = async (color) => {
        let newTask;
        newTask = { ...task, bg: color }
        dispatch(editTask(board._id, box.id, newTask))
    }

    const onCreateCheckList = async (ev) => {
        ev.preventDefault()
        const newTask = checkListService.addCheckList(newCheckListTitle.title, task)
        setCheckListTitle({ title: '' })
        toggleMenu(topic)
        const user = await userService.getLoggedinUser()
        const activity = {
            user, action: `added`, isRead: false, id: utilService.makeId(),
            object: { title: newCheckListTitle.title }, about: `to ${task.title}`, timeStamp: Date.now()
        }
        dispatch(editTask(board._id, box.id, newTask, activity))
    }

    const onSubmitCreateLabel = (ev) => {
        ev.preventDefault()
        if (!newLabelColor) return
        console.log(newLabelColor)
        const newLabel = { id: utilService.makeId(4), title: newLabelTxt.txt, color: newLabelColor }
        board.labels.push(newLabel)
        onCreateLabel(false)
        dispatch(editBoard(board))
    }

    return <div className={`menu-choice-${topic} ${coverMenuClass ? coverMenuClass : ''}`}>
        <div className="h1-topic-container">
            <h1 className="h1-topic">{topic}</h1>
        </div>
        <hr />
        {(topic === 'Members' || topic === 'Labels') && (!createLabel) && <input {...labelFilter('txt')} />}
        {(topic === 'Members') && <p>Board members</p>}
        <div className="labels-container">
            <div className="close-labels-btn" onClick={() => toggleMenu(topic)}>
                <FontAwesomeIcon icon={faX} />
            </div>
            {/* {(topic === 'Labels') && (board.labels.map(label => { */}
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
                        <div key={color} className="cover-menu-color flex-center" value={color} onClick={() => setNewLabelColor(color)} style={{ backgroundColor: color }}>
                            {(newLabelColor === color) && <FontAwesomeIcon icon={faCheck} />}
                        </div>
                    )
                }))}
                <button onClick={(ev) => { onSubmitCreateLabel(ev) }}>Create</button>
            </div>
        </div>}
        <div >
            {(topic === 'Cover') && <div>
                <TaskCoverMenu
                    dfBgs={defaultBgs}
                    board={board}
                    box={box}
                    onChangeBgImg={onChangeBgImg}
                    toggleMenu={toggleMenu}
                    topic={topic}
                    onChangeBgClr={onChangeBgClr}
                    task={task}
                />
            </div>
            }

            {(topic === 'Date') && <div className="date-container">
                <Calendar onChange={onChangeDate} value={value} />
                <button className="save-due-date"
                    onClick={onSaveDueDate}>Save</button>
            </div>}

            {(topic === 'Members') &&
                <div className="task-members">
                    {board.members.map((member, idx) => {
                        if (!member.fullname.includes(newLabelFilter.txt)) return
                        return (<div key={idx} onClick={() => onAddMember(member)} className="members-div">
                            {board.members &&
                                <div className="member-container">
                                    <div  >
                                        <img className={`member-preview ${idx}`} src={member.avatar} />
                                    </div>
                                </div>
                            }
                            <p className="member-name">{member.fullname} ({member.username})</p>
                        </div>
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