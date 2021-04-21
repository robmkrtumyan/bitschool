import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import todoReducer from './reducers/todoReducer'
import globalReducer from './reducers/globalReducer'

const reducer = combineReducers({
    todoState: todoReducer,
    globalState: globalReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
window.store = store

export default store;