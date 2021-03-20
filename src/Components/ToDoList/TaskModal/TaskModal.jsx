import React, { Component } from 'react'
import { Modal, Form, FormControl, Button } from 'react-bootstrap'

class TaskModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            title: "",
            description: "",
            ...props.editTask
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
        const { title, description } = this.state
        const {key, type} = event
        if(!title || !description || (type === "keypress" && key !== "Enter"))
            return

        onSubmit(this.state)
        onHide()
    }

    render() {
        const { onHide, editTask } = this.props
        const { title, description } = this.state
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
                        </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant="secondary">Close</Button>
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

export default TaskModal
