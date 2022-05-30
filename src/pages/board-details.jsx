import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { getBoard, setNewBoard, deleteBoard, editBox, editBoxes, editBoard, toggleFavourite } from '../store/action/board-action'
import { BoxList } from "../cmps/box-list"
import { utilService } from "../services/util.service"
import { boardService } from "../services/board.service"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import { useFormRegister } from "../hooks/useFormRegister"
import { BoardHeaderBar } from '../cmps/board-header-bar.jsx'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDraggable } from "react-use-draggable-scroll"

export const Board = () => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    const [isAdd, setIsAdd] = useState(false)
    // const ref = useRef()
    // const { events } = useDraggable(ref)

    const [isBoardMenu, setIsBoardMenu] = useState(false)
    const [isFilter, setIsFilter] = useState(false)
    const [boxes, setBoxes] = useState([])
    const [register, newBoxTitle, EditBoxTitle] = useFormRegister({ title: '' })
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        const { boardId } = params
        dispatch(getBoard(boardId))
    }, [])

    useEffectUpdate(() => {
        if (!board._id) navigate('/boards')
        onFilterBoxes({})
    }, [board])


    const setAddBox = () => {
        setIsAdd(!isAdd)
    }

    const onFilterBoxes = async (filter) => {
        let boxList = board.boxes
        if (filter.filterBy) {
            boxList = await boardService.boxFilterByTaskAtt(boxList, filter)
        }
        setBoxes(boxList)
    }

    const onToggleMenu = () => {
        setIsBoardMenu(!isBoardMenu)
        if (isFilter) setIsFilter(!isFilter)
    }
    const onToggleFilter = () => {
        setIsFilter(!isFilter)
        if (isBoardMenu) setIsBoardMenu(!isBoardMenu)
    }
    const onDeleteBoard = async (boardId) => {
        dispatch(deleteBoard(boardId))
    }
    const onEditBoard = async (boardId, field, change) => {
        const newBoard = await boardService.editBoardStyle(boardId, field, change)
        dispatch(setNewBoard(newBoard))
    }

    const onToggleStarBoard = async () => {
        dispatch(toggleFavourite(board._id))
    }


    const onAddBox = async (ev, boardId) => {
        ev.preventDefault()
        if (!newBoxTitle.title) {
            setIsAdd(false)
            return
        }
        const box = { id: utilService.makeId(4), tasks: [], title: newBoxTitle.title }
        const newBoard = await boardService.addBox(boardId, box)
        setIsAdd(false)
        EditBoxTitle('')
        dispatch(setNewBoard(newBoard))
    }
    const onDragEnd = (res) => {
        const { destination, source, draggableId } = res
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return
        if (res.type === 'box') {
            let currBoard = { ...board }
            let newBoxes = [...currBoard.boxes]
           
            if ((source.index - destination.index) < 1) {
                currBoard.boxes.map((box, index) => {
                    if (index < source.index) return
                    if (index < destination.index) return newBoxes[index] = currBoard.boxes[index + 1]
                    if (index === destination.index) return newBoxes[index] = currBoard.boxes[source.index]
                    if (index === currBoard.boxes.length - 1) return newBoxes[index] = currBoard.boxes[index]
                })
            } else if ((source.index - destination.index) >= 1) {
                currBoard.boxes.map((box, index) => {
                    if (index > source.index) return
                    if (index > destination.index) return newBoxes[index] = currBoard.boxes[index - 1]
                    if (index === destination.index) return newBoxes[index] = currBoard.boxes[source.index]
                    if (index === 0) return newBoxes[index] = currBoard.boxes[index]
                })
            }
            currBoard.boxes = [...newBoxes]


            // newBoard.boxes.splice(oldIdx, 1)
            // console.log('new board is', newBoard)
            // newBoard.boxes.splice(source.index,1,source.index)

            dispatch(editBoard(currBoard))
            return
        }
        let currBox = board.boxes.find(box => box.id === destination.droppableId)
        if (destination.droppableId !== source.droppableId) {
            let oldBox = board.boxes.find(box => box.id === source.droppableId)
            const oldIdx = source.index
            currBox.tasks.splice(destination.index, 0, oldBox.tasks[oldIdx])
            oldBox.tasks.splice(oldIdx, 1)
            let oldBoxNew = { ...oldBox, tasks: [...oldBox.tasks] }
            let currBoxNew = { ...currBox, tasks: [...currBox.tasks] }
            dispatch(editBoxes(board._id, [currBoxNew, oldBoxNew]))
            return
        }
        let newBox = [...currBox.tasks]
        if ((source.index - destination.index) < 1) {
            currBox.tasks.map((task, index) => {
                if (index < source.index) return
                if (index < destination.index) return newBox[index] = currBox.tasks[index + 1]
                if (index === destination.index) return newBox[index] = currBox.tasks[source.index]
                if (index === currBox.tasks.length - 1) return newBox[index] = currBox.tasks[index]
            })
        } else if ((source.index - destination.index) >= 1) {
            currBox.tasks.map((task, index) => {
                if (index > source.index) return
                if (index > destination.index) return newBox[index] = currBox.tasks[index - 1]
                if (index === destination.index) return newBox[index] = currBox.tasks[source.index]
                if (index === 0) return newBox[index] = currBox.tasks[index]
            })
        }

        currBox.tasks = newBox
        dispatch(editBox(board._id, currBox))
    }


    if (!boxes || !board._id) return <h1>Loading...</h1>
    return <div className="board-container" style={board.style}>
        <BoardHeaderBar
            board={board}
            deleteBoard={onDeleteBoard}
            dfBgs={boardService.getDefaultBgs()}
            onEditBoard={onEditBoard}
            onToggleMenu={onToggleMenu}
            isBoardMenu={isBoardMenu}
            onToggleFilter={onToggleFilter}
            isFilter={isFilter}
            onFilterBoxes={onFilterBoxes}
            onToggleStarBoard={onToggleStarBoard} />
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable type="box" droppableId={board._id} direction="horizontal">
                {provided => {
                    return (
                        <div ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <div className="board">
                                <BoxList board={board} boxes={boxes} />
                                {(!isAdd) &&
                                    <div className="add-box before-click" onClick={() => setAddBox()}><span className="plus-sign">+</span> Add another list</div>}
                                {isAdd && <div className="add-box"><form onSubmit={(ev) => { onAddBox(ev, board._id) }}>
                                    <input className="add-box-input" {...register('title')} />
                                    <button className="save-btn list-save">Add list</button>
                                    <button onClick={() => setAddBox()} className="close-new-task list-close">X</button>
                                </form></div>}

                            </div>


                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>

        </DragDropContext>
    </div >


    //     <DragDropContext onDragEnd={onDragEnd}>
    //         <div className="board">
    //             <BoxList board={board} boxes={boxes} />
    //             {(!isAdd) && <div className="add-box" onClick={() => setAddBox()}>+ add another list</div>}
    //             {isAdd && <div className="add-box"><form onSubmit={(ev) => { onAddBox(ev, board._id) }}><input {...register('title')} /></form></div>}
    //         </div>
    //     </DragDropContext>
    // </div>
}

// const onDown = (ev) => {
//     isClick = true
//     posX = ev.pageX
// }

// const onUp = () => {
//     isClick = false
// }

// const onMove = (ev) => {
//     ev.preventDefault()
//     if (!isClick) {
//         return
//     }
//     else if (ev.pageX > posX) {
//         posX = ev.pageX
//         x -= 1
//         window.scroll(x, 0)
//     }
//     else {
//         posX = ev.pageX
//         x += 1
//         window.scroll(x, 0)
//     }
// }
// const addMouseListeners = () => {
//     window.addEventListener('mousemove', onMove)
//     window.addEventListener('mousedown', onDown)
//     window.addEventListener('mouseup', onUp)
// }
// let isClick = false
// let posX
// let x = 0
// if ((source.index - destination.index) < 1) {
//     currBoard.boxes.map((box, index) => {
//         if (index < source.index) return
//         if (index < destination.index) return currBoard.boxes[index] = board.boxes[index + 1]
//         if (index === destination.index) return currBoard.boxes[index] = board.boxes[source.index]
//         if (index === board.boxes.length - 1) return currBoard.boxes[index] = board.boxes[index]
//     })
// } else if ((source.index - destination.index) >= 1) {
//     currBoard.boxes.map((box, index) => {
//         if (index > source.index) return
//         if (index > destination.index) return currBoard.boxes[index] = board.boxes[index - 1]
//         if (index === destination.index) return currBoard.boxes[index] = board.boxes[source.index]
//         if (index === 0) return currBoard.boxes[index] = board.boxes[index]
//     })
// }






