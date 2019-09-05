import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import allForms from "./forms";
import FormBuilder from "../../components/FormBuilder";

function switchFormInputsValidated (dashboard, inputValidation) {
    switch (dashboard.form.state) {
        case "add-new-admin-form":
            return inputValidation.addNewAdminForm.state.validated.value;
        case "add-new-program-category-form":
            return inputValidation.addNewProgramCategoryForm.state.validated.value;
        case "add-new-program-subcategory-form":
            return inputValidation.addNewProgramSubcategoryForm.state.validated.value;
        case "add-new-program-form":
            return inputValidation.addNewProgramForm.state.validated.value;
        default: return false;
    }
}

function switchForm (dashboard, inputValidation, setLoadingAndSwitchHideForm, getDataOn) {
    switch (dashboard.form.state) {
        case "add-new-admin-form":
            return allForms.addNewAdminForm(dashboard, inputValidation, setLoadingAndSwitchHideForm);
        case "add-new-program-category-form":
            return allForms.addNewProgramCategoryForm(dashboard, inputValidation, setLoadingAndSwitchHideForm);
        case "add-new-program-subcategory-form":
            return allForms.addNewProgramSubcategoryForm(dashboard, inputValidation, setLoadingAndSwitchHideForm, getDataOn);
        case "add-new-program-form":
            return allForms.addNewProgramForm(dashboard, inputValidation, setLoadingAndSwitchHideForm, getDataOn);
        default: return null;
    }
}

export default function AddForm (props) {
    let setLoadingAndSwitchHideForm = props.setLoadingAndSwitchHideForm;
    let inputValidation = props.inputValidation;
    let dashboard = props.dashboard;
    let getDataOn = props.getDataOn;
    let displayForm = switchForm(dashboard, inputValidation, setLoadingAndSwitchHideForm, getDataOn);
    return (
        <div id="add-form" className="hide-form">
            <button id="close-add-form" onClick={() => {
                return props.setLoadingAndSwitchHideForm(dashboard, null);
            }}> x </button>
            {displayForm === null ?
                <span id="hide-form"/> :
                <FormBuilder form={displayForm} isValidated={switchFormInputsValidated(dashboard, inputValidation)}/>}
        </div>
    );
}

AddForm.propTypes = {
    setLoadingAndSwitchHideForm: PropTypes.func,
    inputValidation: PropTypes.object,
    dashboard: PropTypes.object,
    getDataOn: PropTypes.object
};
