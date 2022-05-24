import { boardService } from "../../services/board.service"

export function getBoard(boardId) {
    return async (dispatch) => {
        const board = await boardService.getById(boardId)
        dispatch({ type: 'SET_BOARD', board })
    }
}

export function setNewBoard(board) {
    return async (dispatch) => {
        dispatch({ type: 'SET_BOARD', board })
    }
}