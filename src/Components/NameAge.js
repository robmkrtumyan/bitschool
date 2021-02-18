import React, { Component } from 'react'

class NameAge extends Component {  
    constructor(props) {
        super(props)
    
        this.state = {
            name: 'Rob',
            age: 19
        }
        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler() {
        this.setState({
            name: 'Adrianna',
            age: 18
        })
    }
    
    render() {
        return (
            <div>
                <div>
                    Name: {this.state.name} <br />
                    Age: {this.state.age} <br />
                    <button onClick={this.changeHandler}>Change Details</button>
                </div>
            </div>
        )
    }
}

export default NameAge
