const initialState = {
    board: {},
    task: {},
    box: {},
    boards: [],
    checklist:{},
    isLabelOpen: ''

}
export function boardReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break;
        case 'SET_CHECKLIST':
            newState = { ...state, checklist: action.checklist }
            break;
        case 'UPDATE_BOARD':
            newState = {
                ...state, boards: state.boards.map(board =>
                    board._id === action.board._id ? action.board : board)
            }
            break;
        case 'SET_LABELS':
            newState = { ...state, isLabelOpen: action.labelState }
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
            break;
        case 'SET_TASK':
            newState = { ...state, task: action.task, box: action.box }
            break;
        case 'EDIT_BOX':
            newState = { ...state, box: action.box }
            break;
        case 'EDIT_TASK':
            newState = { ...state, task: action.task }
        default:
    }

    return newState;

}
