import { useState } from 'react'
import {TaskDetails} from './task-details'
import { LabelMenu } from './label-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowUpRightFromSquare , faTag, faFillDrip, faCopy, faInbox} from '@fortawesome/free-solid-svg-icons'
import { faClock, faUser, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'

export const EditTaskNav = ({ board, task, box, onEditTaskTitle, setIsEdit, isEdit }) => {
    const [labelMenu, setLabelMenu] = useState(false)
    const [coverMenu, setCoverMenu] = useState(false)
    const [dateMenu, setDateMenu] = useState(false)
    const [userMenu, setUserMenu] = useState(false)
    const [editStuff, setEditStuff] = useState({ label: '', cover: '', date: '', user: '' })
    const [menuState, setMenuState] = useState({
        'Edit labels': false,
        'Edit dates': false,
        'Change members': false,
        "Change cover": false
    })

    const toggleMenu = (menuName) => {
        const newMenuState = {}
        for (const key in menuState) {
            newMenuState[key] = key === menuName ? !menuState[menuName] : false
        }
        setMenuState(newMenuState)
    }
    // const toggleEditTask = () => {
    //     setIsEdit(!isEdit)
    // }
    // const openLabelMenu = () => {
    //     setLabelMenu(!labelMenu)
    // }
    // const openUserMenu = () => {
    //     setUserMenu(!userMenu)
    // }
    // const openCoverMenu = () => {
    //     setCoverMenu(!coverMenu)
    // }
    // const openDateMenu = () => {
    //     setDateMenu(!dateMenu)
    // }

    // const openLabelMenu = () => {
    //     setLabelMenu(!labelMenu)
    // }
    
 
    const openDateMenu = () => {
        setDateMenu(!dateMenu)
    }

   


    const menuBtns = [
        { txt: 'Open card',func:openDateMenu ,fa: <FontAwesomeIcon style={{color:'#fefefe'}} className="icon-task-menu fa-solid fa-arrow-up-right-from-square" icon={faArrowUpRightFromSquare} inverse /> },
        { txt: 'Edit labels',fa:<FontAwesomeIcon className="icon-task-menu fa-solid fa-tag" icon={faTag}/> },
        { txt: 'Change cover', fa: <FontAwesomeIcon className="icon-task-menu fa-solid fa-fill-drip" icon={faFillDrip} />},
        { txt: 'Change members', fa: <FontAwesomeIcon className="icon-task-menu fa font-clock" icon={faUser} /> },
        { txt: 'Move', fa: <FontAwesomeIcon className="icon-task-menu fa font-clock" icon={faArrowRight} /> },
        { txt: 'Copy' , fa: <FontAwesomeIcon className="icon-task-menu fa-solid fa-copy" icon={faCopy}/>},
        { txt: 'Edit dates', fa: <FontAwesomeIcon className="icon-task-menu fa font-clock" icon={faClock} /> },
        { txt: 'Archive', fa: <FontAwesomeIcon className="icon-task-menu fa-solid fa-inbox" icon={faInbox} /> },
    ]
    const colors = ['#7BC86C', '#F5DD29', '#EF7564', '#CD8DE5', '#5BA4CF', '#29CCE5', '#6DECA9', 'orange', '#FF8ED4', '#8675A9']


    return <section>
        {/* <div className='add-to-card'>Add to card</div> */}
        <div className="edit-task-nav white-icons">
            {menuBtns.map(btn => {
                return (
                    <div>

                      {(btn.txt !== 'Archive' && btn.txt !== 'Open card') && <button key={btn.txt} className="edit-task-nav-btn" onClick={() => { toggleMenu(btn.txt) }}>
                            {btn.fa} {btn.txt}
                        </button>}
                        {(btn.txt === 'Archive' || btn.txt === 'Open card') && <button key={btn.txt} className="edit-task-nav-btn" onClick={() => { btn.func() }}>
                            {btn.fa} {btn.txt}
                        </button>}
                    </div>
                )
            })}

            {(menuState['Edit labels']) && <LabelMenu className="label-choice" topic={'Labels'} setIsEdit={setIsEdit} onEditTaskTitle={onEditTaskTitle} task={task} box={box} board={board} />}
            {(menuState['Change cover']) && <LabelMenu className="cover-choice" topic={'Cover'} colors={colors} task={task} box={box} board={board} />}
            {(menuState['Edit dates']) && <LabelMenu topic={'Date'} task={task} box={box} board={board} />}
            {(menuState['Change members']) && <LabelMenu topic={'Members'} task={task} box={box} board={board} />}
        </div>
    </section>
}
