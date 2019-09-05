// Importing API utils
import API from "../../../../utils/api";

const addNewAdminFormTags = {
    id: "add-new-admin-form",
    className: "program-add-form"
};

const addNewAdminFormHeader = {
    id: "add-new-admin-form-header-text",
    text: "Add a new admin"
};
const addNewAdminFormComponents = (inputValidation) => {
    return [{
        key: "add-first-name-row",
        label: { text: "First Name" },
        input: {
            type: "text",
            id: "add-first-name",
            value: inputValidation.addNewAdminForm.state.firstName.value,
            placeholder: "Enter admin's first name (required)",
            options: null,
            dimensions: null,
            onChange: (e) => {
                return inputValidation.addNewAdminForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewAdminForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }, {
        key: "add-last-name-row",
        label: { text: "Last Name" },
        input: {
            type: "text",
            id: "add-last-name",
            value: inputValidation.addNewAdminForm.state.lastName.value,
            placeholder: "Enter admin's last name (required)",
            options: null,
            dimensions: null,
            onChange: (e) => {
                return inputValidation.addNewAdminForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewAdminForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }, {
        key: "add-email-row",
        label: { text: "Email" },
        input: {
            type: "text",
            id: "add-email",
            value: inputValidation.addNewAdminForm.state.userName.value,
            placeholder: "Enter admin's email address (required)",
            options: null,
            dimensions: null,
            onChange: (e) => {
                return inputValidation.addNewAdminForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewAdminForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }, {
        key: "add-password-row",
        label: { text: "Password" },
        input: {
            type: "password",
            id: "add-password",
            value: inputValidation.addNewAdminForm.state.password.value,
            placeholder: "Enter admin's password (required)",
            options: null,
            dimensions: null,
            onChange: (e) => {
                return inputValidation.addNewAdminForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewAdminForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }, {
        key: "confirm-password-row",
        label: { text: "Confirm Password" },
        input: {
            type: "password",
            id: "confirm-password",
            value: inputValidation.addNewAdminForm.state.confirm.value,
            placeholder: "Confirm admin's password (required)",
            options: null,
            dimensions: null,
            onChange: (e) => {
                return inputValidation.addNewAdminForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewAdminForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }];
};

const addNewAdminFormSubmit = (dashboard, inputValidation, setLoadingAndSwitchHideForm) => {
    return {
        text: "Submit new admin",
        lockedText: "Fill in all fields",
        handleClick: () => {
            API.addNewAdmin({
                firstName: inputValidation.addNewAdminForm.state.firstName.value,
                lastName: inputValidation.addNewAdminForm.state.lastName.value,
                username: inputValidation.addNewAdminForm.state.userName.value,
                pw: inputValidation.addNewAdminForm.state.password.value
            });
            inputValidation.addNewAdminForm.dispatch({ type: "reset" });
            return setTimeout(() => {
                setLoadingAndSwitchHideForm(dashboard, null);
                return;
            }, 1000);
        }
    };
};

export default (dashboard, inputValidation, setLoadingAndSwitchHideForm) => {
    return {
        form: addNewAdminFormTags,
        header: addNewAdminFormHeader,
        components: addNewAdminFormComponents(inputValidation),
        submit: addNewAdminFormSubmit(dashboard, inputValidation, setLoadingAndSwitchHideForm)
    };
};
