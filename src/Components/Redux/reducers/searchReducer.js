import types from '../actionTypes'

const initialState = {
    sort: null,
    search: "",
    status: null,
    create_lte: null,
    create_gte: null,
    complete_lte: null,
    complete_gte: null
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_DROPDOWN_VARIANT: {
            const { dropDown, value } = action
            return {
                ...state,
                [dropDown]: value
            }

        }

        case types.SEARCH_VALUE: {
            const { target } = action
            return{
                ...state,
                [target.name]: target.value
            }
        }

        case types.SEARCH_DATE: {
            const { name, date } = action
            return {
                ...state,
                [name]: date
            }
        }

        case types.SEARCH_RESET: {
            return{
                ...initialState
            }
        }

        default:
            return state
    }
}

export default searchReducer;