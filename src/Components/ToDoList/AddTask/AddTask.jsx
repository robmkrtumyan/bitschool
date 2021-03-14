import React, { Component } from 'react'
import './AddTask.css'
import { Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap'
import withScreenSizes from '../../HOC/withScreenSizes'
import PropTypes from 'prop-types'

class AddTask extends Component {
    state = {
        inputValue: ""
    }

    changeInputHandler = (event) => {
        const {value} = event.target
        this.setState({
            inputValue: value
        })
    }

    addHandler = (event) => {
        const {key, type} = event
        if(!this.state.inputValue || (type === "keypress" && key !== "Enter"))
            return
        
        this.props.addTaskHandler(this.state.inputValue)
        this.setState({
            inputValue: ""
        })
    }

    render() {
        const {selectedTaskCheck} = this.props
        const inputValue = this.state.inputValue
        return (
            <div>
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <label htmlFor="new-task">Add Task</label>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <div className="d-flex justify-content-center mb-2">
                            {this.props.width > 1200 ? "Laptop Version" : "Mobile Version"}
                        </div>
                        <InputGroup className="mb-3">
                            <FormControl
                                className="new-task"
                                placeholder="Add Task"
                                onKeyPress={this.addHandler}
                                onChange={this.changeInputHandler}
                                value={this.state.inputValue}
                                disabled={selectedTaskCheck}
                            />
                            <InputGroup.Append>
                                <Button 
                                    variant="outline-secondary"
                                    className="todo-button"
                                    onClick={this.addHandler}
                                    disabled={selectedTaskCheck || !inputValue}
                                >
                                    Add
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}

AddTask.propTypes = {
    addTaskHandler: PropTypes.func.isRequired,
    selectedTaskCheck: PropTypes.bool.isRequired
}

export default withScreenSizes(AddTask);