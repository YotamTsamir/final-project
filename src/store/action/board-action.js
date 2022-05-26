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
        try {
            const boards = await boardService.query()
            // console.log(boards)
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setTask(task, box){
    return (dispatch) => {
        dispatch({type: 'SET_TASK', task, box})
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