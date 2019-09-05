/* eslint-disable max-len */
import { useEffect, useReducer } from "react";

export function validateCredentials (loginCredentials) {
    const emailRegEx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const passwordRegEx = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
    // if loginCredentials do not pass RegEx tests for email or password, set state of loginCredentials validation to false.
    // else if loginCredentials pass RegEx tests for both email and password, set state of loginCredentials validation to true.
    if ((emailRegEx.test(loginCredentials.state.username) === false) || (passwordRegEx.test(loginCredentials.state.password) === false)) {
        return loginCredentials.dispatch({ type: "validated", update: false });
    } else if ((emailRegEx.test(loginCredentials.state.username) === true) && (passwordRegEx.test(loginCredentials.state.password) === true)) {
        return loginCredentials.dispatch({ type: "validated", update: true });
    }
}

export function switchFormSubmitEnabling (loginCredentials) {
    const SubmitLoginForm = document.getElementById("admin-login-form");
    // if SubmitLoginForm is mounted on DOM (not null), switch form submit enabling depending on validation of loginCredentials
    if (SubmitLoginForm !== null) {
        const enableSubmit = (enabling) => {
            SubmitLoginForm.onsubmit = () => {
                return enabling;
            };
        };
        return loginCredentials.state.validated ? enableSubmit(true) : enableSubmit(false);
    }
}

export function useWatchLoginForm (loginCredentials) {
    return useEffect(() => {
        // watchLoginFormInputs intended use is to actively check AdminLogin form inputs are valid and, on validity, enable form submission.
        validateCredentials(loginCredentials);
        switchFormSubmitEnabling(loginCredentials);
    });
}

export default function useLoginCredentials () {
    // initializing inputtedCredentials and setInputtedCredentials useReducer hook
    const [inputtedCredentials, setInputtedCredentials] = useReducer((state, action) => {
        switch (action.type) {
            case "username": return { ...state, username: action.update };
            case "password": return { ...state, password: action.update };
            case "validated": return { ...state, validated: action.update };
            default: throw new Error('Unexpected action');
        }
    }, { username: '', password: '', validated: false });
    // loginCredentials packages initialized inputtedCredentials and setInputtedCredentials to be passed into DashboardLogin form component and custom useWatchLoginForm hook
    const loginCredentials = { state: inputtedCredentials, dispatch: setInputtedCredentials };
    // useWatchLoginForm to watch for changes in values inputted into login form.
    // useWatchLoginForm uses authenticated parameter to check if user has been authenticated before deciding if inputted login credentials should be watched
    useWatchLoginForm(loginCredentials);
    return loginCredentials;
}
