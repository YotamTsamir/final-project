import { boardService } from "../../services/board.service"

export function getBoard(boardId) {
    return async (dispatch) => {
        const board = await boardService.getById(boardId)
        dispatch({ type: 'SET_BOARD', board })
    }
}

// console.log(loadBoards())
export function loadBoards() {
    return async (dispatch, getState) => {
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
    }
}

export function editTask(boardId, boxId, task) {
    return async dispatch => {
        const board = await boardService.editTask(boardId, boxId, task)
        dispatch({ type: 'SET_BOARD', board })
    }
}
export function editBox(boardId, box) {
    return async dispatch => {
        const board = await boardService.editBox(boardId, box)
        dispatch({ type: 'SET_BOARD', board })
    }
}

export function setTask(task, box) {
    return (dispatch) => {
        dispatch({ type: 'SET_TASK', task, box })
    }
}

export function setNewBoard(board) {
    return async (dispatch) => {
        dispatch({ type: 'SET_BOARD', board })
    }
}
// export function setNewBoard(dispatch, board) {
//     dispatch({ type: 'SET_BOARD', board })
// }