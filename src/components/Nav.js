import React from 'react';
import Logo from './images/logo.png';


function Nav() {
    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">
            <img src={Logo} alt="Logo" height="48" width="140"
                 className="d-inline-block align-text-top" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Recipes</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">About Us</a>
            </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Courses</a>
                </li>
            </ul>
        </div>
            <div className="d-flex">
                <button className="btn btn-outline-secondary" id="login-button">Log in</button>
                <button className="btn btn-primary" id="register-button">Sign up</button>
            </div>
        </div>
    </nav>);
}

export default Nav;