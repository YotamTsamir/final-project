import { useState } from 'react'
import { LabelMenu } from './label-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
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
        { txt: 'Open card' },
        { txt: 'Edit labels' },
        { txt: 'Change cover' },
        { txt: 'Change members', fa: <FontAwesomeIcon className="fa font-clock" icon={faUser} /> },
        { txt: 'Move', fa: <FontAwesomeIcon className="fa font-clock" icon={faArrowRight} /> },
        { txt: 'Copy' },
        { txt: 'Edit dates', fa: <FontAwesomeIcon className="fa font-clock" icon={faClock} /> },
        { txt: 'Archive' },
    ].filter(({ txt }) => !(task.color && txt === 'Cover'))
    const colors = ['#7BC86C', '#F5DD29', '#EF7564', '#CD8DE5', '#5BA4CF', '#29CCE5', '#6DECA9', 'orange', '#FF8ED4', '#8675A9']


    return <section>
        {/* <div className='add-to-card'>Add to card</div> */}
        <div className="edit-task-nav">
            {menuBtns.map(btn => {
                return (
                    <div>

                        <button key={btn.txt} className="edit-task-nav-btn" onClick={() => { toggleMenu(btn.txt) }}>
                            {btn.fa} {btn.txt}
                        </button>
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
