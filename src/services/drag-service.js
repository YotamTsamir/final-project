
export const dragService = {
    changeBoxesPos,
    moveTaskToOtherBox,
    moveTaskInBox
}

function changeBoxesPos(board, source, destination) {
    let currBoard = { ...board }
    let newBoxes = [...currBoard.boxes]
    if ((source.index - destination.index) < 1) {
        currBoard.boxes.map((box, index) => {
            if (index < source.index) return
            else if (index < destination.index) return newBoxes[index] = currBoard.boxes[index + 1]
            else if (index === destination.index) return newBoxes[index] = currBoard.boxes[source.index]
            else if (index === currBoard.boxes.length - 1) return newBoxes[index] = currBoard.boxes[index]
        })
    } else if ((source.index - destination.index) >= 1) {
        currBoard.boxes.map((box, index) => {
            if (index > source.index) return
            else if (index > destination.index) return newBoxes[index] = currBoard.boxes[index - 1]
            else if (index === destination.index) return newBoxes[index] = currBoard.boxes[source.index]
            else if (index === 0) return newBoxes[index] = currBoard.boxes[index]
        })
    }

    currBoard.boxes = [...newBoxes]
    return currBoard
}

function moveTaskToOtherBox(board,source,destination){
    let currBox = board.boxes.find(box => box.id === destination.droppableId)
    if (destination.droppableId !== source.droppableId) {
        let oldBox = board.boxes.find(box => box.id === source.droppableId)
        const oldIdx = source.index
        currBox.tasks.splice(destination.index, 0, oldBox.tasks[oldIdx])
        oldBox.tasks.splice(oldIdx, 1)
        let oldBoxNew = { ...oldBox, tasks: [...oldBox.tasks] }
        let currBoxNew = { ...currBox, tasks: [...currBox.tasks] }
        return [currBoxNew,oldBoxNew]
    }
}

function moveTaskInBox(board,source,destination){
    let currBox = board.boxes.find(box => box.id === destination.droppableId)
    let newBox = [...currBox.tasks]
    if ((source.index - destination.index) < 1) {
        currBox.tasks.map((task, index) => {
            if (index < source.index) return
            else if (index < destination.index) return newBox[index] = currBox.tasks[index + 1]
            else if (index === destination.index) return newBox[index] = currBox.tasks[source.index]
            else if (index === currBox.tasks.length - 1) return newBox[index] = currBox.tasks[index]
        })
    } else if ((source.index - destination.index) >= 1) {
        currBox.tasks.map((task, index) => {
            if (index > source.index) return
            else if (index > destination.index) return newBox[index] = currBox.tasks[index - 1]
            else if (index === destination.index) return newBox[index] = currBox.tasks[source.index]
            else if (index === 0) return newBox[index] = currBox.tasks[index]
        })
    }
    currBox.tasks = newBox
    return currBox
}