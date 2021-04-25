import types from '../actionTypes'

const initialState = {
    loading: false,
    errorMessage: "",
    successMessage: ""
}

const globalReducer = (state = initialState, action) => {
    switch(action.type){
        case types.TURN_ON_OFF_LOADING: {
            return {
                ...state,
                loading: action.isLoading,
                errorMessage: action.loading ? "" : state.errorMessage,
                successMessage: action.loading ? "" : state.successMessage
            }
        }

        case types.SET_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.error
            }
        }

        case types.SUCCESS_MESSAGE: {
            return {
                ...state,
                successMessage: action.successMessage
            }
        }

        default: return state
    }
}

export default globalReducer