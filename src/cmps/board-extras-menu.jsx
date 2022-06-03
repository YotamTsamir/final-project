import { useState } from "react"
import { useDispatch } from "react-redux"
import { editBoard } from "../store/action/board-action"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { useFormRegister } from "../hooks/useFormRegister"
import { utilService } from "../services/util.service"


export const BoardExtrasMenu = ({ setAddTask, setBoardExtrasMenu, box, board }) => {
    const [register, newBox, EditBox] = useFormRegister({ title: box.title })
    const [onCopy, setOnCopy] = useState(false)
    const dispatch = useDispatch()

    const onAddTask = () => {
        setAddTask()
        setBoardExtrasMenu(false)
    }

    const onCopyBox = (ev) => {
        ev.preventDefault()
        let newTasks = [...box.tasks]
        let newBoxTasks = newTasks.map(task => {
            task = { ...task, id: utilService.makeId(4) }
            return task
        })
        let sentBox = { ...box, title: newBox.title, tasks: newBoxTasks, id: utilService.makeId(4) }
        const newBoard = { ...board }
        const newBoxIdx = newBoard.boxes.findIndex(currBox => currBox.id === box.id)
        newBoard.boxes.splice(newBoxIdx + 1, 0, sentBox)
        setBoardExtrasMenu(false)
        dispatch(editBoard(newBoard))

    }

    return <div className="board-extras-menu">
        {(!onCopy) && <div>
            <div className="extras-header">List actions</div>
            <div onClick={() => { onAddTask() }} className="extras-btn extras-add">Add card...</div>
            <div onClick={() => { setOnCopy(!onCopy) }} className="extras-btn">Copy card...</div>
            <div className="extras-btn">Move card...</div>
            <div className="extras-btn">Watch</div>
            <hr className="extras-hr" />
        </div>}
        {(onCopy) && <div className="extras-copy-menu">
            <div className="extras-header flex">
                <span onClick={() => setOnCopy(false)} className="fa-extras-back"><FontAwesomeIcon icon={faAngleLeft} /></span> Copy list</div>
            <span className="extras-copy-name">Name</span>
            <form onSubmit={(ev) => onCopyBox(ev)}><textarea className="task-edit" {...register('title')}></textarea>
                <button className="save-btn">Create list</button></form>
        </div>
        }
    </div >
}