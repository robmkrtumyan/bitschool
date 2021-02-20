import React from 'react'
import './Task.css'

function Task(props) {
    const {task} = props
    return (
        <div className="box task-box">
            <h3>{task}</h3>
        </div>
    )
}

export default Task
