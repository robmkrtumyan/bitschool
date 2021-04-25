import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import types from '../Redux/actionTypes'
import uuid from 'react-uuid'
import Task from './Task/Task'
import './ToDoList.css'
import Confirm from './DeleteConfirm/Confirm'
import TaskModal from './TaskModal/TaskModal'
import Spinner from '../Spinner/Spinner'
import {connect} from 'react-redux'
import {
    setTasksThunk, 
    addTaskThunk, 
    deleteTaskThunk, 
    deleteCheckedHandlerTasksThunk, 
    editTaskHandlerThunk,
    toggleStatusThunk
} from '../Redux/action'

const ToDoList = (props) => {    
    const { setTasks } = props
    useEffect(() => {
        setTasks()
    }, [setTasks])

    const { 
        tasks, 
        loading, 
        deleteLoader, 
        openToggleModal, 
        openToggleConfirm, 
        toggleOpenModal, 
        deleteOneTask,
        addTask,
        toggleOpenConfirm, 
        deleteCheckedTasks,
        selectedTasks, 
        toggleSelectedTasks, 
        oneSelectedTask, 
        toggleCheckTasks, 
        editTask, 
        editTaskHandler, 
        setEditTasks,
        errorMessage
        // toggleStatus
    } = props

    const showTasks = tasks.map( task => {
        return( 
            <Col key={uuid()} md={3} lg={4}>
                <Task 
                    task={task} 
                    deleteTask={deleteOneTask}
                    checkedToggleHandler={toggleSelectedTasks}
                    selectedTaskCheck={selectedTasks.has(task._id)}
                    selectedTask={selectedTasks.has(task._id)}
                    setEditTask={setEditTasks}
                    showDeleteLoader={deleteLoader === task._id}
                    toggleStatus={props.toggleStatus}
                />
            </Col>
        )
    })

    return (
        <>
            <Container>
                <div className="todo-wrapper">
                    <Row>
                        <h2 className="error_message">
                            { errorMessage }
                        </h2>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button
                                onClick={toggleOpenModal}
                            >
                                Add New Task
                            </Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-around mt-4">
                        {showTasks.length ? showTasks: loading ? "" : <p>Not found any Tasks</p>}
                    </Row>
                    <Row  className="justify-content-center mt-3">
                        <Button 
                            variant="danger"
                            onClick={toggleOpenConfirm}
                            disabled={!!!selectedTasks.size}
                        >
                            Delete All Checked Tasks
                        </Button>

                        <Button 
                            variant="primary"
                            className="ml-5"
                            onClick={toggleCheckTasks}
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
                onHide={toggleOpenModal}
                onSubmit={addTask}
            /> }

            { editTask && <TaskModal
                onHide={setEditTasks}
                editTask={editTask}
                onSubmit={editTaskHandler}
            /> }

            { openToggleConfirm && <Confirm
                taskCountOrTitle={oneSelectedTask ? oneSelectedTask.title : selectedTasks.size}
                deleteConfirm={() => deleteCheckedTasks(selectedTasks)}
                onHide={toggleOpenConfirm}
            />}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        tasks: state.todoState.tasks,
        loading: state.globalState.loading,
        deleteLoader: state.todoState.deleteLoader,
        openToggleModal: state.todoState.openToggleModal,
        openToggleConfirm: state.todoState.openToggleConfirm,
        selectedTasks: state.todoState.selectedTasks,
        oneSelectedTask: state.todoState.oneSelectedTask,
        editTask: state.todoState.editTask,
        errorMessage: state.globalState.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTasks: () => {
            dispatch(setTasksThunk)
        },

        deleteOneTask: (_id) => {
            dispatch(deleteTaskThunk(_id))
        },

        turnOnOffLoading: (isLoading) => {
            dispatch({ type: types.TURN_ON_OFF_LOADING, isLoading})
        },

        deleteTaskLoaderSpinner: (_id) => {
            dispatch({ type: types.DELETE_LOADER_SPINNER, _id})
        },

        toggleOpenModal: () => {
            dispatch({type: types.TOGGLE_OPEN_TASK_MODAL })
        },

        addTask: (data) => {
            dispatch((dispatch) => addTaskThunk(dispatch, data))
        },

        toggleOpenConfirm: () => {
            dispatch({ type: types.OPEN_TOGGLE_CONFIRM })
        },

        toggleSelectedTasks: (_id) => {
            dispatch({type: types.TOGGLE_SELECTED_TASKS, _id})
        },
        
        deleteCheckedTasks: (selectedTasks) => {
            dispatch((dispatch) => deleteCheckedHandlerTasksThunk(dispatch, selectedTasks))
        },

        toggleCheckTasks: () => {
            dispatch({ type: types.CHECK_ALL })
        },

        setEditTasks: (editableTask) => dispatch({ type: types.SET_EDIT_TASK, editableTask }),
        
        editTaskHandler: (editTask) => {
            dispatch(editTaskHandlerThunk(editTask))
        },

        toggleStatus: (task) => dispatch(toggleStatusThunk(task))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);