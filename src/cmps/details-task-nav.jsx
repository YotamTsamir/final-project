import { useState } from 'react'
import { LabelMenu } from './label-menu'

export const DetailsTaskNav = ({ board, task, box, onEditTaskTitle, setIsEdit,openTask }) => {
    const [labelMenu, setLabelMenu] = useState(false)

    const openLabelMenu = () => {
        setLabelMenu(!labelMenu)
    }

    const menuBtns = [
        { txt: 'Open card', func: openTask },
        { txt: 'Edit label', func: openLabelMenu },
        { txt: 'Change members', func: '' },
        { txt: 'Change cover', func: '' },
        { txt: 'Move', func: '' },
        { txt: 'Copy', func: '' },
        { txt: 'Edit dates', func: '' },
        { txt: 'Archive', func: '' },
    ]

    return <section>
        <div className="edit-task-nav">
            {menuBtns.map(btn => {
                return (
                    <button key={btn.txt} className="edit-task-nav-btn" onClick={() => { btn.func() }}>{btn.txt}</button>
                )
            })}
        </div>
        {(labelMenu) && <LabelMenu setIsEdit={setIsEdit} onEditTaskTitle={onEditTaskTitle} task={task} box={box} board={board} />}
    </section>
}