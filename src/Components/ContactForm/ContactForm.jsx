import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import './ContactForm.css'

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
        email: "",
        name: "",
        message: ""
    }

    changeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
    }

    sendFormHandler = () => {
        const contactFormData = {...this.state}
        console.log("Contact Form Data -> ", contactFormData)
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
                            value={this.state[input.name]}
                            as={input.as || undefined}
                            row={input.row || undefined}
                        />
                    </Col>
                </Form.Group>
            )
        })
        
        return (
            <div>
                <Form className="form_wrapper" onSubmit={this.onSubmitHandler}>
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
            </div>
        )
    }
}

export default ContactForm
