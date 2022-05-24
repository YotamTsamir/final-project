import {boardService} from '../../services/board.service'

export function loadBoards() {
    return async (dispatch, getState) => {
        try {
            const boards = await boardService.query()
            dispatch({type: 'SET_BOARDS', boards})
            
        } catch (err){
            console.log('err:', err)
        }
    }
}