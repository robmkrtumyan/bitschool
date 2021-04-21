import types from '../actionTypes'

const initialState = {
    loading: false
}

const globalReducer = (state = initialState, action) => {
    switch(action.type){
        case types.TURN_ON_OFF_LOADING: {
            return{
                ...state,
                loading: action.isLoading
            }
        }

        default: return state
    }
}

export default globalReducer