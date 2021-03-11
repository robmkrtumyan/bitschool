import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import './Task.css'

function Task(props) {
    const {
        task, 
        deleteTask, 
        checkedToggleHandler, 
        selectedTaskCheck,
        selectedTask
    } = props

    const selTask = ['cardTask']
    if(selectedTask)
        selTask.push('checkedTask')

    return (
            <Card className={selTask.join(' ')}>
                <input 
                    type="checkbox"
                    onClick={() => checkedToggleHandler(task._id)}
                />
                <Card.Body>
                    <Card.Title className="text-center">{task.title}</Card.Title>
                        <div className="d-flex justify-content-center mt-3">
                            <Button
                                variant="danger" 
                                className="icon-button"
                                onClick={() => deleteTask(task._id)}
                                disabled={selectedTaskCheck}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                            <Button 
                                variant="warning" 
                                className="icon-button ml-2 mb-2"
                                disabled={selectedTaskCheck}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                        </div>
                </Card.Body>
            </Card>
    )
}

export default Task
