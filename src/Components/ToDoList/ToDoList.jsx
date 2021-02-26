import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AddTask from './AddTask/AddTask'
import Task from './Task/Task'
import './ToDoList.css'

class ToDoList extends Component {
    state = {
        tasks: ["Task 1", "Task 2", "Task 3"],
    }

    addTaskHandler = (value) => {
        const tasks = [...this.state.tasks]
        tasks.push(value)
        this.setState({
            tasks,
        })

    }

    render() {
        const {tasks} = this.state
        const showTasks = tasks.map( (task, index) => {
            return( 
                <Col key={index} md={3} lg={4}>
                    <Task task={task} />
                </Col>
            )
        })
        return (
            <Container>
                <div className="todo-wrapper">
                    <Row>
                        <Col>
                            <AddTask 
                                addTaskHandler={this.addTaskHandler}
                            />
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-around">
                        {showTasks}
                    </Row>
                </div>
            </Container>
        )
    }
}

export default ToDoList
