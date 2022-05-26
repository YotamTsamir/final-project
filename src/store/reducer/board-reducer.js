const initialState = {
    board: {},
    task: {},
    box: {},
    boards: [],
}
export function boardReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break;
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break;
        case 'ADD_TASK':
            // newState = { ...board, }
            break;
        case 'SET_TASK':
            newState = {...state, task: action.task, box: action.box}
        break;
        case 'EDIT_TASK':
            newState = {...state, task: action.task}
        default:
    }

    return newState;

}
