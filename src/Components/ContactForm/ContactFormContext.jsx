import React, {useContext} from 'react'
import '../ContactForm/ContactForm'
import { contactContext } from '../Context/context'
import { Form, Button, Col, Row } from 'react-bootstrap'
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

    const ContactFormContext = () => {
        const context = useContext(contactContext)
        const { formData, changeHandler, sendFormHandler, loading } = context

        const inputJSX = inputDetails.map((input, index) => {
            return(
                <Form.Group as={Row} controlId="formHorizontalEmail" key={index}>
                    <Form.Label column sm={3}>
                        { input.labelTxt }
                    </Form.Label>
                    <Col sm={9}>
                    <Form.Control name={input.name} type={input.type} placeholder={input.placeholder} onChange={changeHandler}
                        value={formData[input.name].value} as={input.as || undefined} row={input.row || undefined} required />
                    <Form.Text className="required-field ml-1">
                        {formData[input.name].error}
                    </Form.Text>
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
                        <Button type="submit" className="submit_btn" onClick={sendFormHandler}>
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
export default ContactFormContext