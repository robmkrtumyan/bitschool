import React, { Component } from 'react'

class Users extends Component {
    
    render() {
        console.log(this.props)
        const {users} = this.props
        const userList = users.map((user) => (
            <div>
                Name: {user.name}, Age: {user.age}
            </div>
        ))
        return (
            <div>
                {userList}
            </div>
        )
    }
}

export default Users
