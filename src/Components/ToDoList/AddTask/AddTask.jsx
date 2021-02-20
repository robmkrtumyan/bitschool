import React, { Component } from 'react'
import './AddTask.css'

class AddTask extends Component {
    state = {
        inputValue: ""
    }

    changeInputHandler = (event) => {
        const {value} = event.target
        this.setState({
            inputValue: value,
        })
    }

    addHandler = () => {
        this.props.addTaskHandler(this.state.inputValue)
        this.setState({
            inputValue: ""
        })
    }

    render() {
        return (
            <div>
                <div>
                    <label htmlFor="new-task">Add Task</label>
                    <input 
                        className="new-task"
                        type="text"
                        placeholder="Add Task"
                        onChange={this.changeInputHandler}
                        value={this.state.inputValue}
                    />
                    <button className="todo-button" onClick={this.addHandler}>Add</button>
                </div>
            </div>
        )
    }
}

export default AddTask
