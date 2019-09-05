import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function LoginFormUsernameInput (props) {
    return (
        <input
            id="admin-username"
            className="admin-login-form-input"
            name="username"
            type="text"
            placeholder="Email"
            value={props.loginCredentials.state.username}
            onKeyPress={(e) => {
                return props.loginCredentials.dispatch({ type: e.target.name, update: e.target.value });
            }}
            onChange={(e) => {
                return props.loginCredentials.dispatch({ type: e.target.name, update: e.target.value });
            }}/>
    );
}

LoginFormUsernameInput.propTypes = {
    loginCredentials: PropTypes.object
};

function LoginFormPasswordInput (props) {
    return (
        <input
            id="admin-password"
            className="admin-login-form-input"
            name="password"
            type="password"
            placeholder="Password" value={props.loginCredentials.state.password}
            onKeyPress={(e) => {
                return props.loginCredentials.dispatch({ type: e.target.name, update: e.target.value });
            }}
            onChange={(e) => {
                return props.loginCredentials.dispatch({ type: e.target.name, update: e.target.value });
            }}/>
    );
}

LoginFormPasswordInput.propTypes = {
    loginCredentials: PropTypes.object
};


export default function AdminLogInForm (props) {
    return (
        <form id="admin-login-form" action="/api/admin/authenticate" name="login" method="post">
            <section id="admin-login-form-section-top" className="admin-login-form-section">
                <h1 id="admin-login-form-header"> Admin Login </h1>
            </section>
            <section id="admin-login-form-section-bottom" className="admin-login-form-section">
                <LoginFormUsernameInput loginCredentials={props.loginCredentials}/>
                <LoginFormPasswordInput loginCredentials={props.loginCredentials}/>
                {
                    props.loginCredentials.state.validated ?
                        <button id="login-button" type="submit">Login</button> :
                        <button id="login-button" className="locked">Enter Email & Password</button>
                }
            </section>
        </form>
    );
}

AdminLogInForm.propTypes = {
    loginCredentials: PropTypes.object
};
