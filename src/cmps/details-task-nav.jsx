import { useState } from 'react'
import { LabelMenu } from './label-menu'
import { setTask, toggleDetails, editTask } from "../store/action/board-action"
import { useSelector, useDispatch } from 'react-redux'

export const DetailsTaskNav = ({ board, task, box, onEditTaskTitle}) => {
    const [menuState, setMenuState] = useState({
        'Edit label': false,
        'Edit dates': false,
        'Change members': false,
        'Edit dates': false,
        "Cover": false
    })
    const [dateValue, setDateValue] = useState(Date.now())
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
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

    const menuBtns = [
        { txt: 'Edit label'},
        { txt: 'Cover'},
        { txt: 'Change members'},
        { txt: 'Move'},
        { txt: 'Copy'},
        { txt: 'Edit dates'},
        { txt: 'Archive'},
    ].filter(({txt}) => !(task.color && txt === 'Cover'))

    const colors=['#7BC86C','#F5DD29', '#EF7564', '#CD8DE5', '#5BA4CF','#29CCE5','#6DECA9','orange','#FF8ED4', '#8675A9']

    return <section>
        <div className='add-to-card'>Add to card</div>
        <div className="details-task-nav">
            {menuBtns.map(btn => {
                return (
                    <button key={btn.txt} className="details-task-nav-btn" onClick={() => {toggleMenu(btn.txt)}}>
                        {btn.txt}
                        {(menuState['Edit label']) && btn.txt === 'Edit label' && <LabelMenu topic={'Labels'} setIsEdit={setIsEdit} onEditTaskTitle={onEditTaskTitle} task={task} box={box} board={board} />}
                        {(menuState['Cover']) && btn.txt === 'Cover' && <LabelMenu topic={'Cover'} colors={colors} task={task} box={box} board={board}/>}
                        { (menuState['Edit dates']) && btn.txt === 'Edit dates' && <LabelMenu topic={'Date'} task={task} box={box} board={board} emitDateValue={emitDateValue}/>}
                        {(menuState['Change members']) && btn.txt === 'Change members' && <LabelMenu topic={'Change members'} task={task} box={box} board={board} />}
                    </button>
                )
            })}
        </div>
            {(menuState['Edit dates']) && 
            <button onClick={(ev) => { toggleEditTask()}}>Save</button>
        }
    </section>
}