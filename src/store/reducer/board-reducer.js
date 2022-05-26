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
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] }
            break;
        case 'REMOVE_BOARD':
            newState = { ...state, boards: state.boards.filter(board => board._id !== action.boardId) }
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
        case 'EDIT_BOX':
            newState = {...state, box: action.box}
        break;
        case 'EDIT_TASK':
            newState = { ...state, task: action.task }
        default:
    }

    return newState;

}
