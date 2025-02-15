import React, { memo } from 'react'
import { Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCheck, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import './Task.css'
import { Link } from 'react-router-dom'
import DeleteSpinner from '../../DeleteSpinner/DeleteSpinner'

const Task = (props) => {
    const {
        task, 
        deleteTask, 
        checkedToggleHandler, 
        selectedTask,
        setEditTask,
        showDeleteLoader,
        toggleStatus
    } = props

    const selTask = ['cardTask']
    if(selectedTask)
        selTask.push('checkedTask')


    if(showDeleteLoader) {
        return <DeleteSpinner />
    }
    
    return (
            <Card className={selTask.join(' ')}>
                <input 
                    type="checkbox"
                    className="checkbox-btn"
                    onChange={() => checkedToggleHandler(task._id)}
                    checked={selectedTask}
                />
                <Card.Body>
                    <Card.Title className="text-center">
                        <Link to={`/task/${task._id}`} className="task-link">Title: {task.title}</Link>
                    </Card.Title>
                    <Card.Text className="text-center task-text">Desc.: {task.description}</Card.Text>
                    <Card.Text className="text-center task-text">Date: {task.date.slice(0, 10)}</Card.Text>
                        <div className="d-flex justify-content-center mt-3">
                            <Button
                                variant="danger" 
                                className="icon-button"
                                onClick={() => deleteTask(task._id)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                            <Button 
                                variant="dark" 
                                className="icon-button ml-2 mb-2"
                                onClick={() => setEditTask(task)}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button
                                variant={task.status === "done" ? "success" : "warning"}
                                className="icon-button ml-2 mb-2"
                                onClick={() => toggleStatus(task)}
                            >
                                {/* {task.status === "done" && <FontAwesomeIcon icon={faCheck} />}
                                {task.status === "active" && <FontAwesomeIcon icon={faHourglassHalf} />} */}
                                <FontAwesomeIcon icon={task.status === "active" ? faHourglassHalf : faCheck} />
                            </Button>
                        </div>
                </Card.Body>
            </Card>
    )
}

Task.propTypes = {
    tasks: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    deleteTask: PropTypes.func.isRequired,
    checkedToggleHandler: PropTypes.func.isRequired,
    selectedTaskCheck: PropTypes.bool.isRequired,
    selectedTask: PropTypes.bool.isRequired,
    toggleStatus: PropTypes.func.isRequired
}

export default memo(Task);
