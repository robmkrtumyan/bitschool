import types from '../actionTypes'
import { isRequire, max, min, emailValidation } from '../../utils/validators'

const maxLength30 = max(30)
const minLength3 = min(3)

const initialState = {
    email: {
        valid: false,
        error: null,
        value: ""
    },
    name: {
        valid: false,
        error: null,
        value: ""
    },
    message: {
        valid: false,
        error: null,
        value: ""
    }
}

const contactReducer = (state = initialState, action) => {
    switch(action.type){
        case types.CONTACT_FORM_CHANGE_HANDLER: {
            const { name, value } = action.target
            let valid = true
            let error = isRequire(value) || maxLength30(value) || minLength3(value) || (name === "email" && emailValidation(value));
            if(error){
                valid = false
            }
            return{
                ...state,
                [name]: {
                    valid,
                    error,
                    value
                }
            }
        }
        default: return state
    }
}

export default contactReducer