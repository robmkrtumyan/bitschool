import React, { Component } from 'react'

class Home extends Component {
    render() {
        const { userData } = this.props
        return (
            <div>
                {userData.map((userInfo) => {
                    return(
                        <div>
                            Name: {userInfo.name} | Lastname: {userInfo.lastName}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Home
