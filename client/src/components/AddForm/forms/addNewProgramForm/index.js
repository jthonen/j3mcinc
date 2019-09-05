import API from "../../../../utils/api";

const addNewProgramFormTags = {
    id: "add-new-program-form",
    className: "program-add-form"
};

const addNewProgramFormHeader = {
    id: "add-new-program-header-text",
    text: "Add a program"
};

const addNewProgramFormComponents = (inputValidation, getDataOn) => {
    return [{ key: "subcategories-list-row",
        label: { text: "Subcategory" },
        input: {
            type: "datalist",
            id: "subcategories-list",
            value: inputValidation.addNewProgramForm.state.selectedSubcategory.value,
            placeholder: "Select a subcategory",
            options: getDataOn.allProgramSubcategories().map((subcategory) => {
                return subcategory.subcategoryDisplayedTitle;
            }),
            dimensions: null,
            onChange: (e) => {
                return inputValidation.addNewProgramForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewProgramForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }, { key: "program-name-row",
        label: { text: "Program Name" },
        input: {
            type: "text",
            id: "program-name",
            value: inputValidation.addNewProgramForm.state.programName.value,
            placeholder: "For example: Men's Spring Clinics",
            options: null,
            dimensions: null,
            onChange: (e) => {
                return inputValidation.addNewProgramForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewProgramForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }, { key: "program-enrollees-gender-row",
        label: { text: "Program Enrollees" },
        input: {
            type: "radio",
            id: "program-enrollees-gender",
            value: inputValidation.addNewProgramForm.state.programEnrollees.value,
            placeholder: null,
            options: [
                { value: "All Genders", key: "all" },
                { value: "Male", key: "male" },
                { value: "Female", key: "female" }
            ],
            dimensions: null,
            onChange: (e) => {
                return inputValidation.addNewProgramForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewProgramForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }, { key: "program-difficulty-row",
        label: { text: "Program Difficulty Rating" },
        input: {
            type: "radio",
            id: "program-difficulty",
            value: inputValidation.addNewProgramForm.state.programDifficulty.value,
            placeholder: null,
            options: [
                { value: "1", key: "1" },
                { value: "2", key: "2" },
                { value: "3", key: "3" },
                { value: "4", key: "4" },
                { value: "5", key: "5" }
            ],
            dimensions: null,
            onChange: (e) => {
                return inputValidation.addNewProgramForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewProgramForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }, { key: "program-description-row",
        label: { text: "Program Description" },
        input: {
            type: "textarea",
            id: "program-description",
            value: inputValidation.addNewProgramForm.state.programDescription.value,
            placeholder: "Enter a description for this program",
            options: null,
            dimensions: { rows: 10, cols: 50 },
            onChange: (e) => {
                return inputValidation.addNewProgramForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewProgramForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }];
};

const addNewProgramFormSubmit = (dashboard, inputValidation, setLoadingAndSwitchHideForm) => {
    return {
        text: "Submit Subcategory",
        lockedText: "Fill in all fields",
        handleClick: () => {
            API.addNewProgram({
                parentSubcategory: inputValidation.addNewProgramForm.state.selectedSubcategory.value,
                programName: inputValidation.addNewProgramForm.state.programName.value,
                programEnrollees: inputValidation.addNewProgramForm.state.programEnrollees.value,
                programDifficulty: inputValidation.addNewProgramForm.state.programDifficulty.value,
                programDescription: inputValidation.addNewProgramForm.state.programDescription.value,
                programDisplayedTitle: inputValidation.addNewProgramForm.state.programName.value +
                " - " + inputValidation.addNewProgramForm.state.selectedSubcategory.value
            }).then((data) => {
                console.log(data);
            });
            inputValidation.addNewProgramForm.dispatch({ type: "reset" });
            return setTimeout(() => {
                setLoadingAndSwitchHideForm(dashboard, null);
                return;
            }, 1000);
        }
    };
};

export default (dashboard, inputValidation, setLoadingAndSwitchHideForm, getDataOn) => {
    return {
        form: addNewProgramFormTags,
        header: addNewProgramFormHeader,
        components: addNewProgramFormComponents(inputValidation, getDataOn),
        submit: addNewProgramFormSubmit(dashboard, inputValidation, setLoadingAndSwitchHideForm)
    };
};
