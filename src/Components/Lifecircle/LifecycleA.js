import React, { Component } from 'react'

class LifecycleA extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: "Rob"
        }
        console.log("LifecycleA child Constructor")
    }
    
    componentDidMount(){
        console.log("LifecycleA child componentDidMount")
    }

    render() {
        console.log("LifecycleA child render")
        return (
            <div>
                <div>Lifecycle Child</div>
            </div>
        )
    }
}

export default LifecycleA
