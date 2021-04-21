import React, {useReducer} from 'react'
import {withRouter} from 'react-router-dom'
import '../ContactForm/ContactForm'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { isRequire, max, min, emailValidation } from '../utils/validators'

import Spinner from '../Spinner/Spinner'

const API_HOST = "http://localhost:3001"

const maxLength30 = max(30)
const minLength3 = min(3)

const inputDetails = [
    {
        labelTxt: "Email",
        name: "email",
        type: "email",
        placeholder: "Enter Email*"
    },
    {
        labelTxt: "Name",
        name: "name",
        type: "text",
        placeholder: "Enter Name*"
    },
    {
        labelTxt: "Message",
        name: "message",
        type: null,
        placeholder: "Send Your Message*",
        as: "textarea",
        rows: 3
    }
]

const initialState = {
    formData: {
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
    },
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "changeHandler": {
            const {target} = action
            const {name, value} = target
            let valid = true
            let error = isRequire(value) || maxLength30(value) || minLength3(value) || (name === "email" && emailValidation(value));
            if(error){
                valid = false
            }
            return{
                ...state,
                formData: {
                    ...state.formData,
                    [name]: {
                        valid,
                        error,
                        value
                    }
                }
            }
        }
        case "SET_LOADING": {
            return{
                ...state,
                loading: true
            }
        }

        case "REMOVE_LOADING": {
            return{
                ...state,
                loading: true
            }
        }
        
        default: return state
    }
}



const ContactFormReducer = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { 
        formData,
        loading 
        // changeHandler, 
        // sendFormHandler  
    } = state

    const sendFormHandler = () => {
        const formDetails = {...formData}
        for(let key in formDetails){
            if(typeof formDetails[key] === "object" && formDetails[key].hasOwnProperty("value")){
                formDetails[key] = formDetails[key].value
            } else{
                delete formDetails[key]
            }
        }

        dispatch({type: "SET_LOADING"})

        fetch(`${API_HOST}/form`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDetails)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error)
                throw data

            props.history.push('/')
        })
        .catch(error=>{
            dispatch({type: "REMOVE_LOADING"})
            console.log(error)
        })
    }

    const inputJSX = inputDetails.map((input, index) => {
        return(
            <Form.Group as={Row} controlId="formHorizontalEmail" key={index}>
                <Form.Label column sm={3}>
                    { input.labelTxt }
                </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        name={input.name} 
                        type={input.type} 
                        placeholder={input.placeholder} 
                        onChange={(e) => dispatch({type: "changeHandler", target: e.target})}
                        value={formData[input.name].value} 
                        as={input.as || undefined} 
                        row={input.row || undefined} 
                        required />
                </Col>
            </Form.Group>
            )
    })

    return (
            <>
                <Form className="form_wrapper" onSubmit={(e)=> e.preventDefault()}>
                    {inputJSX}
                    <Form.Group as={Row}>
                        <Col className="d-flex justify-content-center">
                        <Button 
                            type="submit" 
                            className="submit_btn" 
                            onClick={sendFormHandler}
                        >
                            Send
                        </Button>
                        </Col>
                    </Form.Group>
                </Form>
                {
                    loading && <Spinner />
                }
            </>
    )
}
export default withRouter(ContactFormReducer)