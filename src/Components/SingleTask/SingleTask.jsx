import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import './SingleTask.css'
import TaskModal from '../ToDoList/TaskModal/TaskModal'
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {setSingleTaskThunk, deleteTaskThunk, editTaskHandlerThunk, toggleSingleTaskEdit} from '../Redux/action'

const SingleTask = (props) => {
    const {singleTask, editTask, loading} = props
    const {history, setSingleTaskThunk, deleteTaskThunk, editTaskHandlerThunk, toggleSingleTaskEdit} = props
    const {id} = props.match.params
    useEffect(() => {
        setSingleTaskThunk(id, history)
    }, [id, history, setSingleTaskThunk])
        
    if(!singleTask || loading) return <Spinner />
    return (
        <div className="singleTask_wrapper_content">
            <div>
                <div className="singleTask_wrapper rounded-circle">
                    <h3>
                        Title: {singleTask.title}
                    </h3>
                    <h3>
                        Description: {singleTask.description}
                    </h3>
                    <div className="d-flex justify-content-center mt-4">
                        <Button
                            variant="danger" 
                            className="icon-button"
                            onClick={() => deleteTaskThunk(singleTask._id, history)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <Button 
                            variant="warning" 
                            className="icon-button ml-2 mb-2"
                            onClick={toggleSingleTaskEdit}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    </div>
                    <div className="back_btn">
                        <Link to="/">Back Home</Link>
                    </div>
                </div>       
            </div>

            {
                editTask && <TaskModal
                    onHide={toggleSingleTaskEdit}
                    onSubmit={(editTask) => editTaskHandlerThunk(editTask, "singleTask")}
                    editTask={singleTask}
                />
            }

            {
                loading && <Spinner />
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const {singleTask, editTask} = state.singleTaskState
    return {
        singleTask,
        editTask,
        loading: state.globalState.loading
    }
}

const mapDispatchToProps = {
    setSingleTaskThunk,
    deleteTaskThunk,
    editTaskHandlerThunk,
    toggleSingleTaskEdit
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);