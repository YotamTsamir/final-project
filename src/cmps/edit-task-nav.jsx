import { useState } from 'react'
import { LabelManu } from './label-manu'

export const EditTaskNav = ({board,task}) => {
    const [labelManu, setLabelManu] = useState(false)

    const openLabelManu = () => {
        setLabelManu(!labelManu)
    }

    return <section>

        <div className="edit-task-nav">
            <button className="edit-task-nav-btn">Open card</button>
            <button onClick={() => { openLabelManu() }} className="edit-task-nav-btn">Edit label</button>
            <button className="edit-task-nav-btn">Change members</button>
            <button className="edit-task-nav-btn">Change cover</button>
            <button className="edit-task-nav-btn">Move</button>
            <button className="edit-task-nav-btn">Copy</button>
            <button className="edit-task-nav-btn">Edit dates</button>
            <button className="edit-task-nav-btn">Archive</button>
        </div>
        {(labelManu) && <LabelManu task={task} board={board}/> }
    </section>
}