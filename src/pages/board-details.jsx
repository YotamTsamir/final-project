import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { getBoard, setNewBoard } from '../store/action/board-action'
import { BoxList } from "../cmps/box-list"
import { utilService } from "../services/util.service"
import { boardService } from "../services/board.service"
import { useFormRegister } from "../hooks/useFormRegister"
import { TaskDetails } from "../cmps/task-details"

export const Board = () => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    const [isAdd, setIsAdd] = useState(false)
    const [windowPos, setWindowPos] = useState('')
    const [register, newBoxTitle, EditBoxTitle] = useFormRegister({ title: ''})
    const params = useParams()
    const dispatch = useDispatch()
    let isClick = false
    let posX
    let x = 0


    useEffect(() => {
        const { boardId } = params
        addMouseListeners()
        setWindowPos(0)
        dispatch(getBoard(boardId))
    }, [])

    const addMouseListeners = () => {
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mousedown', onDown)
        window.addEventListener('mouseup', onUp)
    }

    const onDown = (ev) => {
        isClick = true
        posX = ev.pageX
    }

    const onUp = () => {
        isClick = false
    }

    const onMove = (ev) => {
        ev.preventDefault()
        if (!isClick) {
            return
        }
        // let dis = ev.pageX - posX
        // posX = ev.pageX
        // window.scroll(dis,0)
        // console.log(dis)
        else if (ev.pageX > posX) {
            posX = ev.pageX
            x-=1
            window.scroll(x, 0)
        }
        else {
            posX = ev.pageX
            x+=1
            window.scroll(x, 0)
        }
      
    }

    const setAddBox = () => {
        isAdd ? setIsAdd(false) : setIsAdd(true)

    }

    // const onAddTask = async (ev,boardId, boxId,input) => {
    //     ev.preventDefault()
    //     const task = { id: utilService.makeId(4), title:input }
    //     const newBoard = await boardService.addTask(boardId, task, boxId)
    //     dispatch(setNewBoard(newBoard))
    // }

    const onAddBox = async (ev,boardId) => {
        ev.preventDefault()
        const box = { id: utilService.makeId(4), tasks: [], title:newBoxTitle.title }
        const newBoard = await boardService.addBox(boardId, box)
        setIsAdd(false)
        EditBoxTitle('')
        dispatch(setNewBoard(newBoard))
    }
    

    if (!board.boxes) return <h1>Loading...</h1>
    return <div className="board">
        <BoxList board={board} boxes={board.boxes} />
        <TaskDetails />
        {(!isAdd) ? <div className="add-box" onClick={() => setAddBox()}>+ add another list</div>:
        <div className="add-box"><form onSubmit={(ev) => { onAddBox(ev,board._id) }}><input {...register('title')} /></form></div>}
      
    </div>
}





