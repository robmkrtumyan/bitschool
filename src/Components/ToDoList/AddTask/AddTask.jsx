import React, { Component } from 'react'
import './AddTask.css'
import {Container, Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap'

class AddTask extends Component {
    state = {
        inputValue: ""
    }

    changeInputHandler = (event) => {
        const {value} = event.target
        this.setState({
            inputValue: value,
        })
    }

    addHandler = (event) => {
        const {key, type} = event
        if(!this.state.inputValue || type === "keypress" && key !== "Enter")
            return
        
        this.props.addTaskHandler(this.state.inputValue)
        this.setState({
            inputValue: ""
        })
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <label htmlFor="new-task">Add Task</label>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <InputGroup className="mb-3">
                            <FormControl
                                className="new-task"
                                placeholder="Add Task"
                                onKeyPress={this.addHandler}
                                onChange={this.changeInputHandler}
                                value={this.state.inputValue}
                            />
                            <InputGroup.Append>
                                <Button 
                                    variant="outline-secondary"
                                    className="todo-button"
                                    onClick={this.addHandler}
                                >
                                    Add
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default AddTask