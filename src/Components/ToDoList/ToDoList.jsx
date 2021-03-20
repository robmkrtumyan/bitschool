import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import uuid from 'react-uuid'
import Task from './Task/Task'
import './ToDoList.css'
import Confirm from './DeleteConfirm/Confirm'
import TaskModal from './TaskModal/TaskModal'

class ToDoList extends Component {
    state = {
        tasks: [
            {
                _id: uuid(),
                title: "Task 1",
                description: "Task 1"
            },
            {
                _id: uuid(),
                title: "Task 2",
                description: "Task 2"
            },
            {
                _id: uuid(),
                title: "Task 3",
                description: "Task 3"
            }
        ],
        selectedTasks: new Set(),
        openToggleModal: false,
        openToggleConfirm: false,
        editTask: null
    }

    toggleOpenModal = () => {
        const {openToggleModal} = this.state
        this.setState({
            openToggleModal: !openToggleModal
        })
    }

    toggleOpenConfirm = () => {
        const {openToggleConfirm} = this.state
        this.setState({
            openToggleConfirm: !openToggleConfirm
        })
    }

    addTaskHandler = (formData) => {
        const tasks = [...this.state.tasks]
        tasks.push({
            _id: uuid(),
            ...formData
        })
        this.setState({
            tasks
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
        const { tasks, selectedTasks } = this.state
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

    getOneOfSelectedTasks = () => {
        if(this.state.selectedTasks.size !== 1){
            return
        }
        let id = null
        this.state.selectedTasks.forEach(_id => {
            id = _id
        })

        return this.state.tasks.find(task => task._id === id)
    }

    setEditTask = (editTask) => {
        this.setState({
            editTask
        })
    }

    removeEditedTask = () => {
        this.setState({
            editTask: null
        })
    }

    editTaskHandler = (editTask) => {
        const tasks = [...this.state.tasks]
        const taskIndex = tasks.findIndex(task => task._id === editTask._id)
        tasks[taskIndex] = editTask
        this.setState({
            tasks
        })
    }



    render() {
        const {
            tasks, 
            selectedTasks, 
            openToggleModal,
            openToggleConfirm,
            editTask
        } = this.state
        const showTasks = tasks.map( task => {
            return( 
                <Col key={uuid()} md={3} lg={4}>
                    <Task 
                        task={task} 
                        deleteTask={this.deleteTaskHandler}
                        checkedToggleHandler={this.checkedToggleHandler}
                        selectedTaskCheck={selectedTasks.has(task._id)}
                        selectedTask={selectedTasks.has(task._id)}
                        setEditTask={this.setEditTask}
                    />
                </Col>
            )
        })
        return (
            <>
                <Container>
                    <div className="todo-wrapper">
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <Button
                                    onClick={this.toggleOpenModal}
                                >
                                    Add New Task
                                </Button>
                            </Col>
                        </Row>
                        <Row className="justify-content-around mt-4">
                            {showTasks.length ? showTasks : <p>Not found any Tasks</p>}
                        </Row>
                        <Row  className="justify-content-center mt-3">
                            <Button 
                                variant="danger"
                                onClick={this.toggleOpenConfirm}
                                disabled={!!!selectedTasks.size}
                            >
                                Delete All Checked Tasks
                            </Button>

                            <Button 
                                variant="primary"
                                className="ml-5"
                                onClick={this.checkedAllHandler}
                                disabled={!!!tasks.length}
                            >
                                {selectedTasks.size && tasks.length === selectedTasks.size ? "Remove All" : "Check All"}
                            </Button>
                        </Row>
                    </div>
                </Container>

                { openToggleModal && <TaskModal
                    onHide={this.toggleOpenModal}
                    onSubmit={this.addTaskHandler}
                /> }

                { editTask && <TaskModal
                    onHide={this.removeEditedTask}
                    editTask={editTask}
                    onSubmit={this.editTaskHandler}
                /> }

                { openToggleConfirm && <Confirm
                    taskCountOrTitle={selectedTasks.size > 1 ? selectedTasks.size : this.getOneOfSelectedTasks().title}
                    deleteConfirm={this.deleteCheckedHandlerTasks}
                    onHide={this.toggleOpenConfirm}
                />}
            </>
        )
    }
}

export default ToDoList;
