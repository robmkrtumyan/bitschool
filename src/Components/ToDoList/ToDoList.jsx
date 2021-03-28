import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import uuid from 'react-uuid'
import Task from './Task/Task'
import './ToDoList.css'
import Confirm from './DeleteConfirm/Confirm'
import TaskModal from './TaskModal/TaskModal'
import Spinner from '../Spinner/Spinner'

const API_HOST = "http://localhost:3001"

class ToDoList extends Component {
    state = {
        tasks: [ ],
        selectedTasks: new Set(),
        openToggleModal: false,
        openToggleConfirm: false,
        editTask: null,
        loading: false,
        deleteLoader: null
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
        this.setState({
            loading: true
        })
        fetch(`${API_HOST}/task`, {
            method:"POST",
            body:JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error)
                throw data.error
            const tasks = [...this.state.tasks]
            tasks.push(data)
            this.setState({
                tasks,
                openToggleModal: false
            })
        })
        .catch(error => {
            console.log("Error", error)
        })
        .finally(() => {
            this.setState({
                loading: false
            })
        })
    }

    deleteTaskHandler = (_id) => {
        (async () => {
            this.setState({
                deleteLoader: _id
            })
            try{
            const response = await fetch(`${API_HOST}/task/${_id}`, {
                method: "DELETE"
            })
            const data = await response.json()
            if(data.error) 
                throw data.error

            let tasks = [...this.state.tasks]
            tasks = tasks.filter(task => task._id !== _id)
            this.setState({
                tasks
            })
            }
            catch(error){
                console.log("Error request", error)
            }
            finally{
                this.setState({
                    deleteLoader: null
                })
            }
        })()
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
        this.setState({
            loading: true
        })
        const {selectedTasks} = this.state
        fetch(`${API_HOST}/task`, {
            method:"PATCH",
            body:JSON.stringify({ tasks: Array.from(selectedTasks) }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error)
                throw data.error
                let tasks = [...this.state.tasks]
                tasks = tasks.filter(task => !this.state.selectedTasks.has(task._id))
                this.setState({
                    tasks,
                    selectedTasks: new Set()
                })
        })
        .catch(error=>{
            console.log("Error", error)
        })
        .finally(() => {
            this.setState({
                loading: false
            })
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
        fetch(`${API_HOST}/task`, {
            method:"PUT",
            body:JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("Updated Data", data)
        })
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
        (async () => {
            this.setState({
                loading: true
            })
            try{
                const { _id } = editTask
                const response = await fetch(`${API_HOST}/task/${_id}`, {
                    method: "PUT",
                    body: JSON.stringify(editTask),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await response.json()
                if(data.error)
                    throw data.error
                const tasks = [...this.state.tasks]
                const taskIndex = tasks.findIndex(task => task._id === data._id)
                tasks[taskIndex] = data
                this.setState({
                    tasks,
                    editTask: null
                })
            }
            catch(error) {
                console.log("Error", error)
            }
            finally{
                this.setState({
                    loading: false
                })
            }            
        })()
    }

    componentDidMount(){
        this.setState({
            loading: true
        })
        fetch(`${API_HOST}/task`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                tasks: data
            })
        })
        .finally(() => {
            this.setState({
                loading:false
            })
        })
    }

    render() {
        const {
            tasks, 
            selectedTasks, 
            openToggleModal,
            openToggleConfirm,
            editTask,
            loading,
            deleteLoader
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
                        showDeleteLoader={deleteLoader === task._id}
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
                {
                    loading && <Spinner />
                }

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
