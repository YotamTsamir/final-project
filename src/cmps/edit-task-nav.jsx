import { useState } from 'react'
import { LabelManu } from './label-manu'

export const EditTaskNav = ({ board, task, box, onEditTaskTitle, setIsEdit, openTask }) => {
    const [labelMenu, setLabelMenu] = useState(false)
    const [coverMenu, setCoverMenu] = useState(false)

    const openLabelMenu = () => {
        setLabelMenu(!labelMenu)
    }
    const openCoverMenu = () => {
        setCoverMenu(!coverMenu)
    }

    const menuBtns = [
        { txt: 'Open card', func: openTask },
        { txt: 'Edit label', func: openLabelMenu },
        { txt: 'Change members', func: '' },
        { txt: 'Change cover', func: openCoverMenu },
        { txt: 'Move', func: '' },
        { txt: 'Copy', func: '' },
        { txt: 'Edit dates', func: '' },
        { txt: 'Archive', func: '' },
    ]

    const colors=['red','blue','grey','black','yellow','orange']

    return <section>
        <div className="edit-task-nav">
            {menuBtns.map(btn => {
                return (
                    <button key={btn.txt} className="edit-task-nav-btn" onClick={() => { btn.func() }}>{btn.txt}</button>
                )
            })}
        </div>
        {(labelMenu) && <LabelManu topic={'Labels'} setIsEdit={setIsEdit} onEditTaskTitle={onEditTaskTitle} task={task} box={box} board={board} />}
        {(coverMenu) && <LabelManu topic={'Cover'} colors={colors} task={task} box={box} board={board}/>}
    </section>
}