import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import './ContactForm.css'
import { withRouter } from 'react-router-dom'
import { isRequire, max, min, emailValidation } from '../utils/validators'
import {contactContext} from '../Context/context'

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

class ContactForm extends Component {
    state = {
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
        },
        loading: false,
        errorMessage: ""
    }

    changeHandler = (event) => {
        const {name, value} = event.target
        let valid = true
        let error = isRequire(value) || maxLength30(value) || minLength3(value) || (name === "email" && emailValidation(value));
        if(error){
            valid = false
        }
        this.setState({
            [name]: {
                valid: valid,
                error: error,
                value: value
            }
        })
    }

    sendFormHandler = () => {
        const formData = {...this.state}
        for(let key in formData){
            if(typeof formData[key] === "object" && formData[key].hasOwnProperty("value")){
                formData[key] = formData[key].value
            } else{
                delete formData[key]
            }
        }

        this.setState({
            loading: true,
            errorMessage: null
        })

        fetch(`${API_HOST}/form`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error)
                throw data
            this.props.history.push('/')
            console.log(data)
        })
        .catch(error=>{
            this.setState({
                loading: false,
                errorMessage: error.message
            })
            console.log(error)
        })
    }

    render() {
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
                            onChange={this.changeHandler}
                            value={this.state[input.name].value}
                            as={input.as || undefined}
                            row={input.row || undefined}
                            required
                        />
                        <Form.Text className="required-field ml-1">
                            {this.state[input.name].error}
                        </Form.Text>
                    </Col>
                </Form.Group>
            )
        })
        
        return (
            <contactContext.Consumer>
                {
                    (context) => {
                        console.log("context", context)
                        return <>
                        <Form className="form_wrapper" onSubmit={(e) => e.preventDefault()}>
                            {this.state.errorMessage}
                            {inputJSX}
                            <Form.Group as={Row}>
                                <Col className="d-flex justify-content-center">
                                    <Button 
                                        type="submit" 
                                        className="submit_btn"
                                        onClick={this.sendFormHandler}
                                    >
                                        Send
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </>
                    }
                }
                
            </contactContext.Consumer>
        )
    }
}

export default withRouter(ContactForm)
