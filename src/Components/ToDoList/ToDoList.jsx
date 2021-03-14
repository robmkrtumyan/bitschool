import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import uuid from 'react-uuid'
import AddTask from './AddTask/AddTask'
import Task from './Task/Task'
import withScreenSizes from '../HOC/withScreenSizes'
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
        let selectedTasks = new Set(this.state.selectedTasks)
        if(!selectedTasks.has(id)){
            selectedTasks.add(id)
        }
        else{
            selectedTasks.delete(id)
        }
        this.setState({ selectedTasks  })
    }

    deleteCheckedHandlerTasks = () => {
        let tasks = [...this.state.tasks]
        tasks = tasks.filter(task => !this.state.selectedTasks.has(task._id))
        this.setState({
            tasks,
            selectedTasks: new Set()
        })
    }

    checkedAllHandler = () => {
        const {tasks, selectedTasks} = this.state
        let selectedTask = selectedTasks
        if(tasks.length === selectedTask.size){
            selectedTask.clear()
        } else{
            tasks.forEach( task => {
                selectedTask.add(task._id)
            })
        }
        this.setState({
            selectedTasks: selectedTask
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

                        <Button 
                            variant="primary"
                            className="ml-5"
                            onClick={this.checkedAllHandler}
                        >
                            {tasks.length === selectedTasks.size ? "Remove All" : "Check All"}
                        </Button>
                    </Row>
                </div>
            </Container>
        )
    }
}

export default withScreenSizes(ToDoList);
