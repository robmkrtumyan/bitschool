import React, { Component } from 'react'
import './Spinner.css'

class Spinner extends Component {
    render() {
        return (
            <div className="spinner_wrapper">
                <div className="loader"></div>
            </div>
        )
    }
}

export default Spinner
