import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import $ from 'jquery';

function LoginModal(props) {

    const setCurrentUser = props.setCurrentUser;
    const [error, setError] = useState("");
    const history = useHistory();
    const login = (event) => {
        event.preventDefault();        
        setError("")
        const form = event.target.elements;
        const currUser = {
            "username": form.username.value,
            "password": form.password.value,
        }
        $.post('/node_login', currUser).done((data) => {
            if (data.message === "success") {
                $.get('node_get_current_user').done((data) => {
                    if (data.message === "success") {
                        setCurrentUser(data.data);
                        $('.modal-backdrop').hide();
                        history.push("/");
                    }
                });
            } else {
                console.log(data.data);
                setError(data.data.message);
            }
        });
        console.log("consider yourself... logged in. YEAAAAAAAHHH!");
    };

    return(
        <div className="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header text-center">
                    <h5 className="modal-title" id="exampleModalLabel">Log in</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form onSubmit={login} method="POST">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="username" id="email" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" id="password"
                                required/>
                    </div>
                    <div style={{color: "red"}}><p>{error}</p></div>
                    <button type="submit" className="btn btn-dark mt-3">Login</button>
                </form>
            </div>
            </div>
        </div>
    </div>
    );
}

export default LoginModal;