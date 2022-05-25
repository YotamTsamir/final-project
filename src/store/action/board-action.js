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
            // const { filterBy } = getState().robotModule
            const boards = await boardService.query()
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function toggleDetails(task){
    return (dispatch) => {
        dispatch({type: 'TOGGLE_DETAILS', task})
    }
}
export function setNewBoard(board) {
    return async (dispatch) => {
        dispatch({ type: 'SET_BOARD', board })
    }
}