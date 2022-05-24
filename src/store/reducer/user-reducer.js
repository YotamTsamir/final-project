import { userService } from "../../services/user-service";

const initialState = {
    // user: userService.getLoggedinUser(),
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.user }
        default:
            return state
    }

    return newState;

}