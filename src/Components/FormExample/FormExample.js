import React, { Component } from 'react'
import './FormExample.css'

class FormExample extends Component {
    state = {
        firstName: "",
        surName: ""
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <form className="form-style">
                    <h1>Register</h1>
                    <input type="text" name="firstName" placeholder="Your Name" onChange={e => this.changeHandler(e)} />
                    <input type="email" name="surName" placeholder="Email Address" onChange={e => this.changeHandler(e)} />
                    <input type="submit" value="Send" onClick={(e) => this.onSubmit(e)} />
                </form>
            </div>
        )
    }
}

export default FormExample
