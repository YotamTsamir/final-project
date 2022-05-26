import { useState } from 'react'
import { LabelManu } from './label-manu'

export const EditTaskNav = ({ board, task, box, onEditTaskTitle, setIsEdit }) => {
    const [labelManu, setLabelManu] = useState(false)

    const openLabelManu = () => {
        setLabelManu(!labelManu)
    }

    const manuBtns = [
        { txt: 'Open card', func: '' },
        { txt: 'Edit label', func: openLabelManu },
        { txt: 'Change members', func: '' },
        { txt: 'Change cover', func: '' },
        { txt: 'Move', func: '' },
        { txt: 'Copy', func: '' },
        { txt: 'Edit dates', func: '' },
        { txt: 'Archive', func: '' },
    ]

    return <section>
        <div className="edit-task-nav">
            {manuBtns.map(btn => {
                return (
                    <button key={btn.txt} className="edit-task-nav-btn" onClick={() => { btn.func() }}>{btn.txt}</button>
                )
            })}
        </div>
        {(labelManu) && <LabelManu setIsEdit={setIsEdit} onEditTaskTitle={onEditTaskTitle} task={task} box={box} board={board} />}
    </section>
}