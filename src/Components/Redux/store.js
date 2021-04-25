import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import todoReducer from './reducers/todoReducer'
import singleTaskReducer from './reducers/singleTaskReducer'
import globalReducer from './reducers/globalReducer'
import contactReducer from './reducers/contactReducer'

const reducer = combineReducers({
    todoState: todoReducer,
    singleTaskState: singleTaskReducer,
    contactState: contactReducer,
    globalState: globalReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
window.store = store

export default store;