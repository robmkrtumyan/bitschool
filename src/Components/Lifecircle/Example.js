import React, { Component } from 'react'
import LifecycleA from './LifecycleA'

class Example extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            items: []
        }
    }
    
    componentDidMount(){
        fetch('
        
        
        
        
        
        
        
        
        
        
        
        
        ')
        .then(res => res.json())
        .then(json => {
            this.setState({
                items: json
            })
        })
    }

    render() {
        const {items} = this.state
        return (
            <div>
                <div>Lifecycle Example</div>
                <div>
                    <ul>
                        {items.map((item)=>{
                            return(
                                <li key={item.id}>
                                    Name: {item.name}, username: {item.username}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Example
