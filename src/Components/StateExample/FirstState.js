import React, { Component } from 'react'

export class FirstState extends Component {
    state = {
        name: "Rob",
        surname: "Mkrtumyan"
    }
    render() {    
        const changeState = () =>{
            this.setState({
                name: "Narek",
                surname: "Petrosyan"
            })
        }
        return (
            <div>
                {
                    Name: {this}
                }
            </div>
        )
    }
}

export default FirstState
