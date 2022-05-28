import { useState } from 'react'
import { LabelMenu } from './label-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faClock,faUser, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'

export const EditTaskNav = ({ board, task, box, onEditTaskTitle, setIsEdit, isEdit }) => {
    const [labelMenu, setLabelMenu] = useState(false)
    const [coverMenu, setCoverMenu] = useState(false)
    const [dateMenu, setDateMenu] = useState(false)
    const [userMenu, setUserMenu] = useState(false)
    const [editStuff,setEditStuff] = useState({label:'',cover:'',date:'',user:''})
    const [menuState, setMenuState] = useState({
        'Labels': false,
        'Dates': false,
        'Members': false,
        "Cover": false
    })
   
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




    const menuBtns = [
        { txt: 'Labels'},
        { txt: 'Cover'},
        { txt: 'Members',fa:<FontAwesomeIcon className="fa font-clock" icon={faUser} /> },
        { txt: 'Move',fa:<FontAwesomeIcon className="fa font-clock" icon={faArrowRight} /> },
        { txt: 'Copy'},
        { txt: 'Dates',fa:<FontAwesomeIcon className="fa font-clock" icon={faClock} /> },
        { txt: 'Archive'},
    ].filter(({txt}) => !(task.color && txt === 'Cover'))
    const colors=['#7BC86C','#F5DD29', '#EF7564', '#CD8DE5', '#5BA4CF','#29CCE5','#6DECA9','orange','#FF8ED4', '#8675A9']

    return <section>
                <div className='add-to-card'>Add to card</div>
        <div className="edit-task-nav">
            {menuBtns.map(btn => {
                return (
                    <button key={btn.txt} className="edit-task-nav-btn" onClick={() => { toggleMenu(btn.txt) }}>
                        {btn.txt}
                        {(menuState['Labels']) && btn.txt === 'Labels' && <LabelMenu topic={'Labels'} setIsEdit={setIsEdit} onEditTaskTitle={onEditTaskTitle} task={task} box={box} board={board} />}
                        {(menuState['Cover']) && btn.txt === 'Cover' && <LabelMenu topic={'Cover'} colors={colors} task={task} box={box} board={board} />}
                        {(menuState['Dates']) && btn.txt === 'Dates' && <LabelMenu topic={'Dates'} task={task} box={box} board={board} />}
                        {(menuState['Members']) && btn.txt === 'Members' && <LabelMenu topic={'Members'} task={task} box={box} board={board} />}
                    </button>
                )
            })}
        </div>
    </section>
}
