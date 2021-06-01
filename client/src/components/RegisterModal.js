import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import $ from 'jquery';

function RegisterModal(props) {

    const setCurrentUser = props.setCurrentUser;
    const [error, setError] = useState("");
    const history = useHistory();
    const register = (event) => {
        event.preventDefault();
        setError("");
        const form = event.target.elements;
        const newUser = {
            "username": form.username.value,
            "password": form.password.value,
            "fullname": form.fullname.value,
        }

        if (form.password.value !== form.confirm.value) {
            setError("Passwords do not match");
        } else {
            $.post("/node_register", newUser).done(function (data) {
                console.log(data);
                if (data.message === "success") {
                    setCurrentUser(data.user);
                    $('.modal-backdrop').hide();
                    history.push("/")
                } else {
                    setError(data.data.message);
                }
            });
        }
    }

    return(
        <div className="modal fade" id="registerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header text-center">
                    <h5 className="modal-title">Register</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form onSubmit={register} method="POST">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="username" id="email" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullname">Full name</label>
                        <input type="text" className="form-control" name="fullname" id="fullname" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" id="password"
                                required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" className="form-control" name="confirm" id="confirm"
                                required/>
                    </div>
                    <div style={{color: "red"}}><p>{error}</p></div>
                    <button type="submit" className="btn btn-dark mt-3">Register</button>
                </form>
            </div>
            </div>
        </div>
    </div>
    );
}

export default RegisterModal;