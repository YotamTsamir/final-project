import { boardService } from "../../services/board.service"
import { socketService, SOCKET_EVENT_CHANGE_BOARD } from "../../services/socket.service"

export function getBoard(boardId) {
    return async (dispatch) => {
        const board = await boardService.getById(boardId)
        dispatch({ type: 'SET_BOARD', board })
    }
}

export function toggleLabels(labelState) {
    return async (dispatch) => {
        dispatch({ type: 'SET_LABELS', labelState })
    }
}

export function loadBoards() {
    return async (dispatch) => {
        const boards = await boardService.query()
        dispatch({ type: 'SET_BOARDS', boards })
    }
}



export function addBoard(newBoard) {
    return async (dispatch) => {
        const board = await boardService.addNewBoard(newBoard)
        dispatch({ type: 'ADD_BOARD', board })
    }
}

export function deleteBoard(boardId) {
    return async (dispatch) => {
        await boardService.remove(boardId)
        dispatch({ type: 'REMOVE_BOARD', boardId })
        dispatch({ type: 'SET_BOARD', board: {} })
    }
}

export function editBoard(board) {
    return async (dispatch) => {
        socketService.emit(SOCKET_EVENT_CHANGE_BOARD, board)
        dispatch({ type: 'SET_BOARD', board })
        await boardService.save(board)
    }
}



export function editComment(boardId, boxId, taskId, comment) {
    return async dispatch => {
        const board = await boardService.editComment(boardId, boxId, taskId, comment)
        const box = board.boxes.find(box => box.id === boxId)
        const task = box.tasks.find(task => task.id === taskId)
        dispatch({ type: 'SET_BOARD', board })

        dispatch({ type: 'SET_TASK', task, box })
    }
}


export function editTask(boardId, boxId, task) {
    return async dispatch => {
        const board = await boardService.updateTask(boardId, task, boxId)
        socketService.emit(SOCKET_EVENT_CHANGE_BOARD, board)
        const box = board.boxes.find(box => box.id === boxId)
        dispatch({ type: 'SET_BOARD', board })
    }
}

export function editBox(boardId, box) {
    return async dispatch => {
        const board = await boardService.saveBox(boardId, box)
        socketService.emit(SOCKET_EVENT_CHANGE_BOARD, board)
        dispatch({ type: 'SET_BOARD', board })
    }
}

export function editBoxes(boardId, boxes) {
    return async dispatch => {
        const board = await boardService.editBoxes(boardId, boxes)
        socketService.emit(SOCKET_EVENT_CHANGE_BOARD, board)
        dispatch({ type: 'SET_BOARD', board })
    }
}

export function setTask(task, box) {
    return (dispatch) => {
        dispatch({ type: 'SET_TASK', task, box })
    }
}
export function onRemoveComment(boardId, boxId, taskId, commentId) {
    return async (dispatch) => {
        const board = await boardService.removeComment(boardId, boxId, taskId, commentId)
        dispatch({ type: 'SET_BOARD', board })
    }
}

export function setNewBoard(board) {
    return async (dispatch) => {
        dispatch({ type: 'SET_BOARD', board })
    }
}

export function toggleFavourite(boardId) {
    console.log('im togglin a newboard ');
    return async dispatch => {
        const board = await boardService.toggleBoardStarred(boardId)
        dispatch({ type: 'UPDATE_BOARD', board })
        dispatch({ type: 'SET_BOARD', board })
    }
}