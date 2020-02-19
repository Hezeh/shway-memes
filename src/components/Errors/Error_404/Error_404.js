import React from 'react';
import './Error_404.css'
import { Link } from 'react-router-dom'

const Error_404 = () => {
    return (
        <div className="heading">
            <h1>Page Not Found</h1>
            <Link to="/">
              <h6>Go to Home</h6>
            </Link>
        </div>
    )
}

export default Error_404;