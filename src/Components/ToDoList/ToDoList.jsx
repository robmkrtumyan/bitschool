import React, { Component } from 'react'
import AddTask from './AddTask/AddTask'
import Task from './Task/Task'
import './ToDoList.css'

class ToDoList extends Component {
    state = {
        tasks: ["Task 1", "Task 2", "Task 3"],
    }

    addTaskHandler = (value) => {
        const tasks = [...this.state.tasks]
        tasks.push(value)
        this.setState({
            tasks,
        })

    }

    render() {
        const {tasks} = this.state
        const showTasks = tasks.map( (task, index) => {
            return <Task task={task} key={index} />
        })
        return (
            <div className="todo-wrapper">
                <AddTask 
                    addTaskHandler={this.addTaskHandler}
                />
                <div className="showTaskBoxes">
                    {showTasks}
                </div>
            </div>
        )
    }
}

export default ToDoList
