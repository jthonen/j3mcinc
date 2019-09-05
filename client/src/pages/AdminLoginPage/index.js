import React from "react";
import "./style.css";
import useLoginCredentials from "./hooks/useLoginCredentials";
import useRedirectIfAuthenticated from "./hooks/useRedirectIfAuthenticated";
import AdminLoginForm from "../../components/AdminLoginForm";

export default function AdminLoginPage () {
    useRedirectIfAuthenticated();
    // Login Form Validation
    const loginCredentials = useLoginCredentials();
    return (
        <div id="admin-login-page" className="row">
            <AdminLoginForm loginCredentials={loginCredentials}/>
        </div>
    );
}
