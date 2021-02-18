import React, { Component } from 'react'

class RegisterForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: [
                {name: "", 
                surname: "",
                age: ""}
            ]
        }
    }
    clickHandler = (event) => {
        this.setState({
            name: event.target.value,
            surname: event.target.value,
            age: event.target.value 
        })
    }
    render() {
        
        return (
            <div>
                <form>
                    <label>Name</label>
                    <input type="text" placeholder="Enter your name" value={this.state.user.name} />
                    <label>Surname</label>
                    <input type="text" placeholder="Enter your surname" value={this.state.user.surname} />
                    <label>Age</label>
                    <input type="text" placeholder="Enter your age" value={this.state.user.age} />
                    <p>
                        <button onClick={this.clickHandler}>Show Form</button>
                    </p>
                </form>
                <div>
                    {this.state.user.map((us)=>{
                        return(
                            <div>
                                Name: {us.name}, surname: {us.surname}, Age: {us.age}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default RegisterForm
