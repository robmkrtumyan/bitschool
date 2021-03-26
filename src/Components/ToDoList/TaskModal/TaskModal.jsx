import React, { Component } from 'react'
import { Modal, Form, FormControl, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'

class TaskModal extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            title: "",
            description: "",
            ...props.editTask,
            date: props.editTask ? new Date(props.editTask.date): new Date()
        }

        this.inputFocus = React.createRef()
    }

    componentDidMount(){
        this.inputFocus.current.focus()
    }

    changeInputHandler = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    addHandler = (event) => {
        const { onHide, onSubmit } = this.props
        const { title, description, date } = this.state
        const {key, type} = event
        if(!title || !description || (type === "keypress" && key !== "Enter"))
            return
        
        const formData = {
            ...this.state,
            date: date.toISOString(date).slice(0, 10)
        }
        
        onSubmit(formData)
        onHide()
    }

    setDate = (date) => {
        this.setDate({
            date
        })
    }

    render() {
        const { onHide, editTask } = this.props
        const { title, description, date } = this.state
        return (
            <Modal
                show={true}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {editTask ? "Edit Task" : "Add Task"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form className="mb-3" onSubmit={this.formSubmit}>
                            <Form.Group>
                                <FormControl
                                    name="title"
                                    ref={this.inputFocus}
                                    className="new-task"
                                    placeholder="Add Title"
                                    onKeyPress={this.addHandler}
                                    onChange={this.changeInputHandler}
                                    value={title}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control 
                                    name="description"
                                    style={{resize: "none"}}
                                    placeholder="Description"
                                    onKeyPress={this.addHandler}
                                    value={description}
                                    onChange={this.changeInputHandler}
                                    as="textarea" 
                                    rows={3} 
                                />
                            </Form.Group>
                            <Form.Group>
                                <DatePicker 
                                    selected={date} 
                                    onChange={date => this.setDate(date)}
                                />
                            </Form.Group>
                        </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={(event) => onHide()} variant="secondary">Close</Button>
                    <Button 
                        variant="primary"
                        onClick={this.addHandler}
                        disabled={!title || !description}
                    >
                        {editTask ? "Save": "Add Task"}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

TaskModal.propType = {
    onHide: PropTypes.func.isRequired,
    editTask: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
}

export default TaskModal
