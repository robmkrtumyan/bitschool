import React, { Component } from 'react'

class ToDo extends Component {
    state = {
        tasks: ["Task 1", "Task 2", "Task 3"],
        inputValue: ""
    }

    changeHandler = (event) => {
        const {value} = event.target
        this.setState({
            inputValue: value
        })
    }

    addHandler = () => {
        const tasks = [...this.state.tasks]
        tasks.push(this.state.inputValue)
        this.setState({
            tasks,
            inputValue: ""
        })
    }
    render() {
        const tasksJSX = this.state.tasks.map(function(item, index){
            return <p key={index}>{item}</p>
        })
        return (
            <div>
                <h1>ToDo Component</h1>
                <div>
                    <input type="text" placeholder="Add Tasks" onChange={this.changeHandler} value={this.state.inputValue } />
                    <button onClick={this.addHandler}>Add</button>
                </div>
                <div className='tasks-wrapper'>
                    {tasksJSX}
                </div>
            </div>
        )
    }
}

export default ToDo
