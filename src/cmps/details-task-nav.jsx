import { useState } from 'react'
import { ActionMenu } from './action-menu'
import { setTask, toggleDetails, editTask } from "../store/action/board-action"
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faClock, faUser, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import labelImg from '../imgs/label.png'
import copyImg from '../imgs/copy.png'
import archiveImg from '../imgs/archive.png'
import coverImg from '../imgs/cover.png'
import { boardService } from '../services/board.service'
export const DetailsTaskNav = ({ board, task, box, onEditTaskTitle, isEdit, setIsEdit }) => {
    const [menuState, setMenuState] = useState({
        'Labels': false,
        'Dates': false,
        'Members': false,
        "Cover": false,
        "Checklist":false
    })

    const [dateValue, setDateValue] = useState(Date.now())
    const dispatch = useDispatch()

    const toggleMenu = (menuName) => {
 
        const newMenuState = {}
        for (const key in menuState) {
            newMenuState[key] = key === menuName ? !menuState[menuName] : false
        }
        setMenuState(newMenuState)
    }

    const toggleEditTask = () => {
        setIsEdit(!isEdit)
    }

    const emitDateValue = (value) => {
        setDateValue(value)
    }

    const createCheckList = () => {
        const newTask={...task,checklists:[...task.checklists,]}
    }

    const menuBtns = [
        { txt: 'Labels', fa: <img className="menu-imgs" src={labelImg} /> },
        { txt: 'Cover', fa: <img className="menu-imgs" src={coverImg} /> },
        { txt: 'Members', fa: <FontAwesomeIcon className="menu-imgs fa font-clock" icon={faUser} /> },
        { txt: 'Move', fa: <FontAwesomeIcon className="menu-imgs fa font-clock" icon={faArrowRight} /> },
        {txt:'Checklist'},
        { txt: 'Copy', fa: <img className="menu-imgs" src={copyImg} /> },
        { txt: 'Dates', fa: <FontAwesomeIcon className="menu-imgs fa font-clock" icon={faClock} /> },
        { txt: 'Archive', fa: <img className="menu-imgs" src={archiveImg} /> },
    ].filter(({ txt }) => !(task.color && txt === 'Cover'))

    const colors = ['#7BC86C', '#F5DD29', '#EF7564', '#CD8DE5', '#5BA4CF', '#29CCE5', '#6DECA9', 'orange', '#FF8ED4', '#8675A9']

    return <section className='details-task-nav-contianer'>
        <div className='add-to-card'>Add to card</div>
        <div className="details-task-nav">
            {menuBtns.map((btn, idx) => {
                return (<div key={idx} className='details-action-menu'>
                    <button key={idx} className="details-task-nav-btn" onClick={() => { toggleMenu(btn.txt) }}>
                        <div className='details-btn-txt-fa'>

                            {btn.fa} {btn.txt}
                        </div>
                    </button>

                    {(menuState['Labels']) && btn.txt === 'Labels' && <ActionMenu
                        topic={'Labels'} setIsEdit={setIsEdit} onEditTaskTitle={onEditTaskTitle}
                        task={task} box={box} board={board} />}

                    {(menuState['Cover']) && btn.txt === 'Cover' && <ActionMenu
                        topic={'Cover'} colors={colors}
                        task={task} box={box} board={board} />}

                    {(menuState['Dates']) && btn.txt === 'Dates' && <ActionMenu
                        topic={'Date'} task={task}
                        box={box} board={board} emitDateValue={emitDateValue} />}

                    {(menuState['Members']) && btn.txt === 'Members' && <ActionMenu
                        topic={'Members'} task={task} box={box} board={board} />}
                    {(menuState['Checklist']) && btn.txt === 'Checklist' && <ActionMenu
                        topic={'checkList'} task={task} box={box} board={board} />}
                </div>)
            })}
        </div>
        {(menuState['Dates']) &&
            <button onClick={(ev) => { toggleEditTask() }}>Save</button>
        }
    </section>
}