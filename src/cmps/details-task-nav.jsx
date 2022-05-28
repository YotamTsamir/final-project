import { useState } from 'react'
import { LabelMenu } from './label-menu'
import { setTask, toggleDetails, editTask } from "../store/action/board-action"
import { useSelector, useDispatch } from 'react-redux'

export const DetailsTaskNav = ({ board, task, box, onEditTaskTitle }) => {
    const [menuState, setMenuState] = useState({
        'Labels': false,
        'Dates': false,
        'Members': false,
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
        { txt: 'Labels'},
        { txt: 'Cover'},
        { txt: 'Members'},
        { txt: 'Move'},
        { txt: 'Copy'},
        { txt: 'Dates'},
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
                        {(menuState['Labels']) && btn.txt === 'Labels' && <LabelMenu topic={'Labels'} setIsEdit={setIsEdit} onEditTaskTitle={onEditTaskTitle} task={task} box={box} board={board} />}
                        {(menuState['Cover']) && btn.txt === 'Cover' && <LabelMenu topic={'Cover'} colors={colors} task={task} box={box} board={board}/>}
                        { (menuState['Dates']) && btn.txt === 'Dates' && <LabelMenu topic={'Dates'} task={task} box={box} board={board} emitDateValue={emitDateValue}/>}
                        {(menuState['Members']) && btn.txt === 'Members' && <LabelMenu topic={'Members'} task={task} box={box} board={board} />}
                    </button>
                )
            })}
        </div>
            {(menuState['Dates']) && 
            <button onClick={(ev) => { toggleEditTask()}}>Save</button>
        }


        
        </section>
}