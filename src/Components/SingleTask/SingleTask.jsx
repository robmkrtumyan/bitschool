import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import './SingleTask.css'
import TaskModal from '../ToDoList/TaskModal/TaskModal'
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router-dom'


const API_HOST = "http://localhost:3001"

class SingleTask extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            singleTask: null,
            editTask: false,
            loading: false
        }
    }

    deleteSingleTask = () => {
        this.setState({
            loading: true
        })

        const {_id} = this.state.singleTask
        fetch(`${API_HOST}/task/${_id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if(data.error)
                throw data.error
            this.props.history.push("/")
        })
        .catch(error => {
            this.setState({
                loading: false
            })
            console.log("Error", error)
        })      
    }
    
    editSingleTask = (editTask) => {
        this.setState({
            loading: true
        })
        fetch(`${API_HOST}/task/${editTask._id}`, {
            method: "PUT",
            body: JSON.stringify(editTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) throw data.error

            this.setState({
                singleTask: data
            })
        })
        .catch(error => {
            console.log("Error", error)
        })
        .finally(() => {
            this.setState({
                loading:false
            })
        })
    }

    toggleEditTask = () => {
        this.setState({
            editTask: !this.state.editTask
        })
    }

    componentDidMount(){
        const {id} = this.props.match.params
        fetch(`${API_HOST}/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data.error)
                throw data.error
            this.setState({
                singleTask: data
            })
        })
        .catch(error => {
            console.log("Error", error)
        })
    }

    render() {
        const {singleTask, editTask, loading} = this.state
        if(!singleTask || loading) return <Spinner />
        return (
            <div>
                <div>
                    <h2 className="d-flex justify-content-center mt-5">Single Task</h2>
                    <div className="singleTask_wrapper rounded-circle">
                        <h3>Title: {singleTask.title}</h3>
                        <h3>Description: {singleTask.description}</h3>
                        <div className="d-flex justify-content-center mt-4">
                            <Button
                                variant="danger" 
                                className="icon-button"
                                onClick={this.deleteSingleTask}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                            <Button 
                                variant="warning" 
                                className="icon-button ml-2 mb-2"
                                onClick={this.toggleEditTask}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                        </div>
                        <div>
                            <Link to="/">Back Home</Link>
                        </div>
                    </div>       
                </div>

                {
                    editTask && <TaskModal
                        onHide={this.toggleEditTask}
                        onSubmit={this.editSingleTask}
                        editTask={singleTask}
                    />
                }

                {
                    loading && <Spinner />
                }
            </div>
        )
    }
}

export default SingleTask
