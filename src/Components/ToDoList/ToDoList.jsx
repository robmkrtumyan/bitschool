import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
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
        selectedTasks: new Set()
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

    checkedToggleHandler = (id) => {
        // let selectedTasks = [...this.state.selectedTasks]
        let selectedTasks = new Set(this.state.selectedTasks)
        if(!selectedTasks.has(id)){
            selectedTasks.add(id)
        }
        else{
            selectedTasks = selectedTasks.delete(selectedTaskId => selectedTaskId !== id)
        }
        this.setState({selectedTasks})
    }

    deleteCheckedHandlerTasks = () => {
        let tasks = [...this.state.tasks]
        tasks = tasks.filter(task => !this.state.selectedTasks.has(task._id))
        this.setState({
            tasks,
            selectedTasks: new Set()
        })
    }

    render() {
        const {tasks, selectedTasks} = this.state
        const showTasks = tasks.map( task => {
            return( 
                <Col key={uuid()} md={3} lg={4}>
                    <Task 
                        task={task} 
                        deleteTask={this.deleteTaskHandler}
                        checkedToggleHandler={this.checkedToggleHandler}
                        selectedTaskCheck={selectedTasks.has(task._id)}
                        selectedTask={selectedTasks.has(task._id)}
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
                                selectedTaskCheck={!!selectedTasks.size}
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-around">
                        {showTasks.length ? showTasks : <p>Not found any Tasks</p>}
                    </Row>
                    <Row  className="justify-content-center mt-3">
                        <Button 
                            variant="danger"
                            onClick={this.deleteCheckedHandlerTasks}
                            disabled={!!!selectedTasks.size}
                        >
                            Delete All Checked Tasks
                        </Button>
                    </Row>
                </div>
            </Container>
        )
    }
}

export default ToDoList
