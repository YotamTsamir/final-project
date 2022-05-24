import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { appReducer } from './reducer/app-reducer';
import { boardReducer } from './reducer/board-reducer'
import { userReducer } from './reducer/user-reducer';

const rootReducer = combineReducers({
  boardModule: boardReducer,
  userModule: userReducer,
  appModule: appReducer
});


// export const store = createStore(rootReducer, applyMiddleware(thunk))
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();
// Lets wire up thunk and also redux-dev-tools:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
// export const store = createStore(rootReducer, applyMiddleware(thunk))
