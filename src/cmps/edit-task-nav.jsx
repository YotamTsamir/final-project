import { useState } from 'react'
import { LabelMenu } from './label-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faClock,faUser, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'

export const EditTaskNav = ({ board, task, box, onEditTaskTitle, setIsEdit, openTask }) => {
    const [labelMenu, setLabelMenu] = useState(false)
    const [coverMenu, setCoverMenu] = useState(false)
    const [dateMenu, setDateMenu] = useState(false)
    const [userMenu, setUserMenu] = useState(false)
    const [editStuff,setEditStuff] = useState({label:'',cover:'',date:'',user:''})

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
        { txt: 'Open card', func: openTask },
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
        <div className="edit-task-nav">
            {menuBtns.map(btn => {
                return (
                    <button key={btn.txt} className="edit-task-nav-btn" onClick={() => { btn.func() }}>{btn.fa} {btn.txt}</button>
                )
            })}
        </div>
        {(labelMenu) && <LabelMenu topic={'Labels'} setIsEdit={setIsEdit} onEditTaskTitle={onEditTaskTitle} task={task} box={box} board={board} />}
        {(coverMenu) && <LabelMenu topic={'Cover'} colors={colors} task={task} box={box} board={board}/>}
        {(dateMenu) && <LabelMenu topic={'Date'} task={task} box={box} board={board}/>}
    </section>
}