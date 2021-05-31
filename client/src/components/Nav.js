import React from 'react';
import Logo from './images/logo.png';

let isLoggedIn = false;

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src={Logo} alt="Logo" height="48" width="140"
                         className="d-inline-block align-text-top"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/recipes">Recipes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/search">Articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>

                    </ul>
                </div>
                <div className="d-flex">
                    {!isLoggedIn ?
                        <div>
                            <button className="btn btn-outline-secondary" id="login-button">Log in</button>
                            <button className="btn btn-primary" id="register-button">Sign up</button>
                        </div>
                        : <button className="btn btn-link" id="logout-button">Logout</button>}
                </div>
                <div className="nav-item">
                    <i className="fas fa-search" style={{height: ""}}></i>
                </div>
            </div>
        </nav>);
}

export default Nav;