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
        'Open card': false,
        'Dates': false,
        'Edit label': false,
        "Change members": false,
        "Move": false,
        "Change cover": false,
        "Edit dates": false,
        "Archive": false,
        
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

    const openLabelMenu = () => {
        setLabelMenu(!labelMenu)
    }
    
    const openCoverMenu = () => {
        setCoverMenu(!coverMenu)
    }
    const openDateMenu = () => {
        setDateMenu(!dateMenu)
    }

    const openUserMenu = () => {
        setUserMenu(!userMenu)
    }


    const menuBtns = [
        // { txt: 'Open card', func: openTask },
        { txt: 'Edit label', func: openLabelMenu },
        { txt: 'Change members', func: openUserMenu,fa:<FontAwesomeIcon className="fa font-user" icon={faUser} /> },
        { txt: 'Change cover', func: openCoverMenu },
        { txt: 'Move', func: '',fa:<FontAwesomeIcon className="fa font-arrow-right" icon={faArrowRight} /> },
        { txt: 'Copy', func: '' },
        { txt: 'Edit dates', func: openDateMenu,fa:<FontAwesomeIcon className="fa font-clock" icon={faClock} /> },
        { txt: 'Archive', func: '' },
    ]

    const colors=['#7BC86C','#F5DD29', '#EF7564', '#CD8DE5', '#5BA4CF','#29CCE5','#6DECA9','orange','#FF8ED4', '#8675A9']
    return <section>
                <div className='add-to-card'>Add to card</div>
        <div className="edit-task-nav">
            {menuBtns.map(btn => {
                return (
                    <button key={btn.txt} className="edit-task-nav-btn" onClick={() => { toggleMenu(btn.txt) }}>
                        {btn.txt}
                        {(menuState['Edit labels']) && btn.txt === 'Edit labels' && <LabelMenu topic={'Labels'} setIsEdit={setIsEdit} onEditTaskTitle={onEditTaskTitle} task={task} box={box} board={board} />}
                        {(menuState['Change cover']) && btn.txt === 'Change cover' && <LabelMenu topic={'Cover'}  task={task} box={box} board={board} colors={colors} />}
                        {(menuState['Edit dates']) && btn.txt === 'Edit dates' && <LabelMenu topic={'Dates'} task={task} box={box} board={board} />}
                        {(menuState['Change members']) && btn.txt === 'Change members' && <LabelMenu topic={'Members'} task={task} box={box} board={board} />}
                    </button>
                )
            })}
        </div>
    </section>
}
