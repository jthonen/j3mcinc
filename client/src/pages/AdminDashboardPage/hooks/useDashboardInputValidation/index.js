/* eslint-disable max-len */
import { useEffect, useReducer } from "react";

function watchInputValues (fieldValues, asyncWhitelistedFormInputValues) {
    // Here we are mapping over an object containing form input values state and the state of their validation
    Object.keys(fieldValues.state).map((key, index) => {
        // dispatchFieldValueUpdate is a function which takes in a condition as a parameter.
        // The condition is a check to determine whether the value of that input in state is a valid input value
        // if the condition is met, the input is marked as validated in state
        // if the condition is not met, the input is marked as invalidated in state
        function dispatchFieldValueUpdate (condition) {
            return (condition) ?
                fieldValues.dispatch({ type: key, update: true }) :
                fieldValues.dispatch({ type: key, update: false });
        }
        // useKey or fiedValues.state[key] is the value attributed to a key in the fieldValues.state object
        let useKey = fieldValues.state[key];
        // whiteList or useKey.validateAgainst is a 'whitelisted' value with which we will be checking the validity of our form inputs values against
        let whiteList = useKey.validateAgainst;
        // Since different inputs have different kinds of whitelisted values, such as:
        // --- Arrays -- eg: seasons
        // --- Regular Expressions -- eg: passwords, emails, names & paragraphs
        // --- the values of other inputs: -- eg: password confirmation
        // --- a value retrieved asynchronously: -- eg: program categories & program subcategories
        // We are using a switch to switch the keyType of the whitelisted value so we can perform
        // an appropriate test to determine the validity of an input value against a whitelisted value
        switch (useKey.keyType) {
            case "Number": return dispatchFieldValueUpdate(Number.isInteger(parseInt(useKey.value, 10)));
            case "Array":
                // in the case of an array keyType, we are checking to see if the form's input value is included in the whiteListed array
                return dispatchFieldValueUpdate(whiteList.includes(useKey.value));
            case "RegExp":
                // in the case of a Regular Expression, we are checking to see if the form's input value passes a RegExp test
                return dispatchFieldValueUpdate(whiteList.test(useKey.value));
            case "InputValue":
                // In the case of an input value, we are running a function which returns the input element we are checking against
                whiteList = whiteList();
                // If the input element we are checking against is not yet mounted on the dom, it will return null or undefined
                // If it is mounted on the dom, it will not return null or undefined, so we can check its value
                if (whiteList !== null || undefined) {
                    // We are checking to see if the input element we are checking against has:
                    // --- a value which is not blank
                    // --- a value that IS equal to the value of the useKey input value
                    return dispatchFieldValueUpdate(((whiteList.value !== "") && (whiteList.value === useKey.value)));
                }
            case "AsyncValue":
                if (whiteList !== null || undefined) {
                    // If the whiteList value is not null or undefined:
                    // we are setting the value of whiteList equal to the value returned by the useKey whitelist function which
                    // returns the async value corresponding to that form input
                    // The value corresponding to that particular form input is explicitly stated in
                    // the switchAsyncWhitelistedFormInputValues function
                    whiteList = whiteList(asyncWhitelistedFormInputValues);
                    return dispatchFieldValueUpdate(whiteList.includes(useKey.value));
                } else return;
            case null:
                return;
            default: throw new Error("Invalid keyType");
        }
    });
}

function verifyAllInputsValidated (fieldValues) {
    // Here we are creating an array of keys from an object containing the state of the form's input value validation
    let indexesOnInputsToBeValidated = Object.keys(fieldValues.state.validated.validateAgainst);
    // Here we are creating an array which will eventually contain a list of booleans.
    // These booleans will each be a value corresponding to the state of a form input values validation
    const indexedFieldValidationStatus = [];
    // for loop through the length of the indexes on inputs to be validated
    for (let i = 0; i < indexesOnInputsToBeValidated.length; i++) {
        if (indexedFieldValidationStatus.length < indexesOnInputsToBeValidated) {
            indexedFieldValidationStatus.push(fieldValues.state.validated.validateAgainst[indexesOnInputsToBeValidated[i]]);
            // if the length of the indexed Field Validation Status array is less than the length of indexes on inputs to be validated array,
            //push an indexed Field Validation Status value into the array
        } else {
            // if the length of the indexed Field Validation Status array is not less than the length of indexes on inputs to be validated
            // i.e. the two arrays are the same lengths
            // set each item in the indexedFieldValidationStatus array value equal to its corresponding value in the fieldValues.state.validated.validateAgainst object
            indexedFieldValidationStatus[i] = fieldValues.state.validated.validateAgainst[indexesOnInputsToBeValidated[i]];
        }
    }
    // If any of the values in the indexedFieldValidationStatus are false, set the value of the form's input validation to false
    // else set the value to true because all inputs are validated.
    return indexedFieldValidationStatus.includes(false) ?
        fieldValues.dispatch({ type: "validated", update: false }) :
        fieldValues.dispatch({ type: "validated", update: true });
}

function switchFormSubmitEnabling (fieldValues, formID) {
    let form = document.getElementById(formID);
    if (form !== null) {
        const enableSubmit = (enabling) => {
            form.onsubmit = () => {
                return enabling;
            };
        };
        return fieldValues.state.validated.value ? enableSubmit(true) : enableSubmit(false);
    }
}

function useWatchForm (fieldValues, formID, asyncWhitelistedFormInputValues) {
    useEffect(() => {
        watchInputValues(fieldValues, asyncWhitelistedFormInputValues);
        verifyAllInputsValidated(fieldValues);
        switchFormSubmitEnabling(fieldValues, formID);
    });
}

const whiteListedInputValues = {
    emailRegEx: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    passwordRegEx: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
    nameRegEx: new RegExp(/^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/),
    paragraphRegEx: new RegExp(/^[a-zA-Z0-9?$@#()'!,+\-=_:.&€£*%\s]+$/),
    seasons: ["Winter", "Spring", "Summer", "Fall"],
    enrolleeGenderOptions: ["Male", "Female", "All Genders"]
};

function switchAsyncWhitelistedFormInputValues (asyncValue, asyncWhitelistedFormInputValues) {
    switch (asyncValue) {
        case "allProgramCategories":
            return asyncWhitelistedFormInputValues.allProgramCategories.map((category) => {
                return category.categoryDisplayedTitle;
            });
        case "allProgramSubcategories":
            return asyncWhitelistedFormInputValues.allProgramSubcategories.map((subcategory) => {
                return subcategory.subcategoryDisplayedTitle;
            });
    }
}

const initialAddNewAdminFormState = {
    firstName: { value: '', keyType: "RegExp", validateAgainst: whiteListedInputValues.nameRegEx },
    lastName: { value: '', keyType: "RegExp", validateAgainst: whiteListedInputValues.nameRegEx },
    userName: { value: '', keyType: "RegExp", validateAgainst: whiteListedInputValues.emailRegEx },
    password: { value: '', keyType: "RegExp", validateAgainst: whiteListedInputValues.passwordRegEx },
    confirm: { value: '', keyType: "InputValue", validateAgainst: () => {
        return document.getElementById("add-password");
    } },
    validated: { value: false, keyType: null, validateAgainst: { firstName: false, lastName: false, userName: false, password: false, confirm: false } }
};

const initialAddNewProgramCategoryFormState = {
    categoryName: { value: '', keyType: "RegExp", validateAgainst: whiteListedInputValues.nameRegEx },
    categorySeason: { value: '', keyType: "Array", validateAgainst: whiteListedInputValues.seasons },
    categoryDescription: { value: '', keyType: "RegExp", validateAgainst: whiteListedInputValues.paragraphRegEx },
    validated: { value: false, keyType: null, validateAgainst: { categoryName: false, categorySeason: false, categoryDescription: false } }
};

const initialAddNewProgramSubcategoryFormState = {
    selectedCategory: { value: '', keyType: "AsyncValue", validateAgainst: (asyncWhitelistedFormInputValues) => {
        return switchAsyncWhitelistedFormInputValues("allProgramCategories", asyncWhitelistedFormInputValues);
    } },
    subcategoryName: { value: '', keyType: "RegExp", validateAgainst: whiteListedInputValues.nameRegEx },
    subcategoryDescription: { value: '', keyType: "RegExp", validateAgainst: whiteListedInputValues.paragraphRegEx },
    validated: { value: false, keyType: null, validateAgainst: { selectedCategory: false, subcategoryName: false, subcategoryDescription: false } }
};

const initialAddNewProgramFormState = {
    selectedSubcategory: { value: '', keyType: "AsyncValue", validateAgainst: (asyncWhitelistedFormInputValues) => {
        return switchAsyncWhitelistedFormInputValues("allProgramSubcategories", asyncWhitelistedFormInputValues);
    } },
    programName: { value: '', keyType: "RegExp", validateAgainst: whiteListedInputValues.paragraphRegEx },
    programEnrollees: { value: 'All Genders', keyType: "Array", validateAgainst: whiteListedInputValues.enrolleeGenderOptions },
    programDifficulty: { value: '1', keyType: "Number", validateAgainst: null },
    programDescription: { value: '', keyType: "RegExp", validateAgainst: whiteListedInputValues.paragraphRegEx },
    validated: { value: false, keyType: null, validateAgainst:
        { selectedSubcategory: false, programName: false, programEnrollees: false, programDifficulty: false, programDescription: false }
    }
};

const addNewAdminFormReducer = (state, action) => {
    switch (action.type) {
        case "add-first-name": return { ...state, firstName: { ...state.firstName, value: action.update } };
        case "firstName": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, firstName: action.update } } };
        case "add-last-name": return { ...state, lastName: { ...state.lastName, value: action.update } };
        case "lastName": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, lastName: action.update } } };
        case "add-email": return { ...state, userName: { ...state.userName, value: action.update } };
        case "userName": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, userName: action.update } } };
        case "add-password": return { ...state, password: { ...state.password, value: action.update } };
        case "password": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, password: action.update } } };
        case "confirm-password": return { ...state, confirm: { ...state.confirm, value: action.update } };
        case "confirm": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, confirm: action.update } } };
        case "validated": return { ...state, validated: { ...state.validated, value: action.update } };
        case "reset": return initialAddNewAdminFormState;
        default: throw new Error('Unexpected action');
    }
};

const addNewProgramCategoryFormReducer = (state, action) => {
    switch (action.type) {
        case "category-name": return { ...state, categoryName: { ...state.categoryName, value: action.update } };
        case "categoryName": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, categoryName: action.update } } };
        case "category-season": return { ...state, categorySeason: { ...state.categorySeason, value: action.update } };
        case "categorySeason": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, categorySeason: action.update } } };
        case "category-description": return { ...state, categoryDescription: { ...state.categoryDescription, value: action.update } };
        case "categoryDescription": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, categoryDescription: action.update } } };
        case "validated": return { ...state, validated: { ...state.validated, value: action.update } };
        case "reset": return initialAddNewProgramCategoryFormState;
        default: throw new Error('Unexpected action');
    }
};

const addNewProgramSubcategoryFormReducer = (state, action) => {
    switch (action.type) {
        case "categories-list": return { ...state, selectedCategory: { ...state.selectedCategory, value: action.update } };
        case "selectedCategory": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, selectedCategory: action.update } } };
        case "subcategory-name": return { ...state, subcategoryName: { ...state.subcategoryName, value: action.update } };
        case "subcategoryName": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, subcategoryName: action.update } } };
        case "subcategory-description": return { ...state, subcategoryDescription: { ...state.subcategoryDescription, value: action.update } };
        case "subcategoryDescription": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, subcategoryDescription: action.update } } };
        case "validated": return { ...state, validated: { ...state.validated, value: action.update } };
        case "reset": return initialAddNewProgramSubcategoryFormState;
    }
};

const addNewProgramFormReducer = (state, action) => {
    switch (action.type) {
        case "subcategories-list": return { ...state, selectedSubcategory: { ...state.selectedSubcategory, value: action.update } };
        case "selectedSubcategory": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, selectedSubcategory: action.update } } };
        case "program-name": return { ...state, programName: { ...state.programName, value: action.update } };
        case "programName": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, programName: action.update } } };
        case "program-enrollees-gender-all": return { ...state, programEnrollees: { ...state.programEnrollees, value: action.update } };
        case "program-enrollees-gender-male": return { ...state, programEnrollees: { ...state.programEnrollees, value: action.update } };
        case "program-enrollees-gender-female": return { ...state, programEnrollees: { ...state.programEnrollees, value: action.update } };
        case "programEnrollees": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, programEnrollees: action.update } } };
        case "program-difficulty-1": return { ...state, programDifficulty: { ...state.programDifficulty, value: action.update } };
        case "program-difficulty-2": return { ...state, programDifficulty: { ...state.programDifficulty, value: action.update } };
        case "program-difficulty-3": return { ...state, programDifficulty: { ...state.programDifficulty, value: action.update } };
        case "program-difficulty-4": return { ...state, programDifficulty: { ...state.programDifficulty, value: action.update } };
        case "program-difficulty-5": return { ...state, programDifficulty: { ...state.programDifficulty, value: action.update } };
        case "programDifficulty": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, programDifficulty: action.update } } };
        case "program-description": return { ...state, programDescription: { ...state.programDescription, value: action.update } };
        case "programDescription": return { ...state, validated: { ...state.validated, validateAgainst: { ...state.validated.validateAgainst, programDescription: action.update } } };
        case "validated": return { ...state, validated: { ...state.validated, value: action.update } };
        case "reset": return initialAddNewProgramFormState;
    }
};

function useAddNewAdminInputValues () {
    const [inputtedValues, setInputtedValues] = useReducer(addNewAdminFormReducer, initialAddNewAdminFormState);
    const fieldValues = { state: inputtedValues, dispatch: setInputtedValues };
    useWatchForm(fieldValues, "add-new-admin-form");
    return fieldValues;
}

function useAddNewProgramCategoryInputValues () {
    const [inputtedValues, setInputtedValues] = useReducer(addNewProgramCategoryFormReducer, initialAddNewProgramCategoryFormState);
    const fieldValues = { state: inputtedValues, dispatch: setInputtedValues };
    useWatchForm(fieldValues, "add-new-program-category-form");
    return fieldValues;
}

function useAddNewProgramSubcategoryInputValues (asyncWhitelistedFormInputValues) {
    const [inputtedValues, setInputtedValues] = useReducer(addNewProgramSubcategoryFormReducer, initialAddNewProgramSubcategoryFormState);
    const fieldValues = { state: inputtedValues, dispatch: setInputtedValues };
    useWatchForm(fieldValues, "add-new-program-subcategory-form", asyncWhitelistedFormInputValues);
    return fieldValues;
}

function useAddNewProgramInputValues (asyncWhitelistedFormInputValues) {
    const [inputtedValues, setInputtedValues] = useReducer(addNewProgramFormReducer, initialAddNewProgramFormState);
    const fieldValues = { state: inputtedValues, dispatch: setInputtedValues };
    useWatchForm(fieldValues, "add-new-program-form", asyncWhitelistedFormInputValues);
    return fieldValues;
}

export default function useDashboardInputValidation (asyncWhitelistedFormInputValues) {
    return {
        addNewAdminForm: useAddNewAdminInputValues(),
        addNewProgramCategoryForm: useAddNewProgramCategoryInputValues(),
        addNewProgramSubcategoryForm: useAddNewProgramSubcategoryInputValues(asyncWhitelistedFormInputValues),
        addNewProgramForm: useAddNewProgramInputValues(asyncWhitelistedFormInputValues)
    };
}
