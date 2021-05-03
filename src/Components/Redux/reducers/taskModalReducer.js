import types from '../actionTypes'

const initialState = {
    title: "",
    description: "",
    date: new Date()
}

const taskModalReducer = (state = initialState, action) => {
    switch(action.type){
        case types.CHANGE_MODAL_INPUT: {
            const { name, value } = action.target
            return{
                ...state,
                [name]: value
            }
        }

        case types.CHANGE_MODAL_DATE: {
            return{
                ...state,
                date: action.date
            }
        }

        case types.EDIT_MODAL_TASK: {
            const {editTask} = action
            return{
                ...state,
                ...editTask,
                date: new Date(editTask.date)
            }
        }

        case types.RESET_MODAL_TASK: {
            return{
                ...initialState
            }
        }

        default: return state
    }
}

export default taskModalReducer;