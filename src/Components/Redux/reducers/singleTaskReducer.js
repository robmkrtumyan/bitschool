import types from '../actionTypes'

const initialState = {
    singleTask: null,
    editTask: false
}

const singleTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SINGLE_TASK: {
            return{
                ...state,
                singleTask: action.data,
                editTask: false
            }
        }
        case types.TOGGLE_SINGLE_TASK_EDIT: {
            return{
                ...state,
                editTask: !state.editTask
            }
        }
        default:
            return state
    }
}

export default singleTaskReducer;