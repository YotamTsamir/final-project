import { boardService } from "../../services/board.service"
import { userService } from "../../services/user-service"
import { socketService, SOCKET_EVENT_LOAD_BOARD, SOCKET_EVENT_PUSH_NOTIFICATION } from "../../services/socket.service"

export function getBoard(boardId) {
    return async (dispatch) => {
        const board = await boardService.getById(boardId)
        dispatch({ type: 'SET_BOARD', board })
    }
}

export function addBox(boardId, box, activity) {
    return async dispatch => {
        let board = await boardService.saveBox(boardId, box)
        const boardAndActivity = { board, activity }
        socketService.emit(SOCKET_EVENT_LOAD_BOARD, boardAndActivity)
        board.activities.unshift(activity)
        await boardService.save(board)
        dispatch({ type: 'SET_BOARD', board })
    }
}

export function addTask(boardId, task, boxId, activity) {
    return async dispatch => {
        let board = await boardService.saveTask(boardId, task, boxId)

        if (activity) board.activities.unshift(activity)
        await boardService.save(board)
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
        // console.log(boards)
        dispatch({ type: 'SET_BOARDS', boards })
    }
}

export function updateUserImgInBoards(user) {
    return async (dispatch) => {
        const boards = await boardService.updateUserImgInBoards(user)
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
        socketService.emit(SOCKET_EVENT_LOAD_BOARD, board)
        dispatch({ type: 'SET_BOARD', board })
        await boardService.save(board)
    }
}

export function updateBoard(user, boardId) {
    return async (dispatch) => {
        const board = await boardService.addBoardMember(user, boardId)
        socketService.emit(SOCKET_EVENT_LOAD_BOARD, board)
        dispatch({ type: 'SET_BOARD', board })
    }
}




export function editComment(boardId, box, newTask, comment) {
    return async (dispatch) => {
        const task = await boardService.editComment(boardId, box.id, newTask, comment)

        console.log('task action')
        dispatch({
            type: 'SET_TASK',
            task,
            box
        })
    }
}

export function editTask(boardId, boxId, task, activity) {
    return async dispatch => {
        let board = await boardService.saveTask(boardId, task, boxId)
        if (activity) board.activities?.unshift(activity)
        await boardService.save(board)
        const boardAndActivity = { board, activity }
        socketService.emit(SOCKET_EVENT_LOAD_BOARD, boardAndActivity)
        dispatch({ type: 'SET_BOARD', board })
    }
}

export function editBox(boardId, box) {
    return async dispatch => {
        const board = await boardService.saveBox(boardId, box)
        const bigBoard = { board }
        socketService.emit(SOCKET_EVENT_LOAD_BOARD, bigBoard)
        dispatch({ type: 'SET_BOARD', board })
    }
}

export function editBoxes(boardId, boxes, activity) {
    return async dispatch => {
        console.log('I AM HERE')
        let board = await boardService.editBoxes(boardId, boxes)
        board.activities.unshift(activity)
        // const board = await boardService.save(currBoard)
        const boardAndActivity = { board, activity }
        socketService.emit(SOCKET_EVENT_LOAD_BOARD, boardAndActivity)
        dispatch({ type: 'SET_BOARD', board })
    }
}
export function addComment(boardId, box, newTask) {
    return async (dispatch) => {
        const task = await boardService.addComment(boardId, box.id, newTask)
        dispatch({
            type: 'SET_TASK',
            task,
            box
        })
    }
}
export function setTask(task, box) {
    return (dispatch) => {
        dispatch({ type: 'SET_TASK', task, box })
    }
}
export function onRemoveComment(boardId, box, newTask, comment) {
    console.log('onRemoveComment action', newTask)
    return async (dispatch) => {
        const task = await boardService.removeComment(boardId, box, newTask, comment)
        dispatch({ type: 'SET_TASK', task, box })
    }
}

export function setCheckList(checkList) {
    return dispatch => {
        dispatch({ type: 'SET_CHECKLIST', checkList })
    }
}

export function setNewBoard(board) {
    console.log(board)
    return async (dispatch) => {
        dispatch({ type: 'SET_BOARD', board })
    }
}

export function toggleFavourite(boardId) {
    return async dispatch => {
        const board = await boardService.toggleBoardStarred(boardId)
        dispatch({ type: 'UPDATE_BOARD', board })
        dispatch({ type: 'SET_BOARD', board })
    }
}