import React, {useRef, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import './ContactForm.css'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { changeContactFormHandlerThunk, sendFormHandlerThunk } from '../Redux/action'
import Spinner from '../Spinner/Spinner'

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


const ContactForm = (props) => {
    const {
        formData,
        loading,
        changeContactFormHandlerThunk,
        sendFormHandlerThunk
    } = props

    const inpFocus = useRef(null)
    useEffect(() => {
        inpFocus.current.focus()
    }, [])

    const inputJSX = inputDetails.map((input, index) => {
        return(
            <Form.Group as={Row} controlId="formHorizontalEmail" key={index}>
                <Form.Label column sm={3}>
                    { input.labelTxt }
                </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        ref={index === 0 ? inpFocus : null}
                        name={input.name} 
                        type={input.type} 
                        placeholder={input.placeholder} 
                        onChange={(e) => changeContactFormHandlerThunk(e.target)}
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
                            onClick={() => sendFormHandlerThunk(formData, props.history)}
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

const mapStateToProps = (state) => {
    const {email, name, message} = state.contactState
    return{
        formData:{
            email,
            name,
            message,
        },
        loading: state.globalState.loading
    }
}

const mapDispatchToProps = {
    changeContactFormHandlerThunk,
    sendFormHandlerThunk
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactForm))