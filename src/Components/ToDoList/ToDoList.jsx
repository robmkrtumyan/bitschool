import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import uuid from 'react-uuid'
import AddTask from './AddTask/AddTask'
import Task from './Task/Task'
import './ToDoList.css'

class ToDoList extends Component {
    state = {
        tasks: [
            {
                _id: uuid(),
                title: "Task 1"
            },
            {
                _id: uuid(),
                title: "Task 2"
            },
            {
                _id: uuid(),
                title: "Task 3"
            }
        ],
    }

    addTaskHandler = (value) => {
        const tasks = [...this.state.tasks]
        tasks.push({
            title: value,
            _id: uuid()
        })
        this.setState({
            tasks,
        })
    }

    deleteTaskHandler = (_id) => {
        let tasks = [...this.state.tasks]
        tasks = tasks.filter(task => task._id !== _id)
        this.setState({
            tasks
        })
    }

    render() {
        const {tasks} = this.state
        const showTasks = tasks.map( task => {
            return( 
                <Col key={uuid()} md={3} lg={4}>
                    <Task 
                        task={task} 
                        deleteTask={this.deleteTaskHandler}
                    />
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
                        {showTasks.length ? showTasks : <p>Not found any Tasks</p>}
                    </Row>
                </div>
            </Container>
        )
    }
}

export default ToDoList
