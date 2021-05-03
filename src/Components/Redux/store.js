import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import todoReducer from './reducers/todoReducer'
import singleTaskReducer from './reducers/singleTaskReducer'
import globalReducer from './reducers/globalReducer'
import contactReducer from './reducers/contactReducer'
import searchReducer from './reducers/searchReducer'
import taskModalReducer from './reducers/taskModalReducer'

const reducer = combineReducers({
    todoState: todoReducer,
    singleTaskState: singleTaskReducer,
    contactState: contactReducer,
    searchState: searchReducer,
    taskModalState: taskModalReducer,
    globalState: globalReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
window.store = store

export default store;