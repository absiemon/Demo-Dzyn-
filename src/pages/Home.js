import React, { useState, useEffect } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import User from '../components/User'

function Home(props) {

    let navigate = useNavigate();
    const handleLogout = ()=>{

        localStorage.removeItem('token');
        navigate('/login')

    }

    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <h3><Link className="navbar-brand" to="/">Demo</Link></h3>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        </ul>

                        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>

            <User/>
        </>
    )
}

export default Home
