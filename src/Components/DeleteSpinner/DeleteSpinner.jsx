import React from 'react'
import './DeleteSpinner.css'
function DeleteSpinner() {
    return (
        <div className="loader_wrapper">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default DeleteSpinner
