import React from 'react'
import './NotFound.css'

function NotFound() {
    return (
        <div id="not-found">
            <div id="title">Simple Pure CSS3 &bull; 404 Error Page</div>
            <div className="circles">
                <p>404</p>
                <div>PAGE NOT FOUND</div>
                <span className="circle big"></span>
                <span className="circle med"></span>
                <span className="circle small"></span>
            </div>
        </div>
    )
}

export default NotFound
