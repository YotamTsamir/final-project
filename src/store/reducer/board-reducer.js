const initialState = {
    board: {},
    task:{}
}
export function boardReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_BOARDS':
            return {
                ...state,
                boards: action.boards
            }
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break;
        case 'ADD_TASK':
            // newState = { ...board, }
            break;
        case 'TOGGLE_DETAILS':
            newState = {...state, task: action.task}
        default:
    }

    return newState;

}
