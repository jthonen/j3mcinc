// Importing API utils
import API from "../../../../utils/api";

const addNewProgramCategoryFormTags = {
    id: "add-new-program-category-form",
    className: "program-add-form"
};

const addNewProgramCategoryFormHeader = {
    id: "add-new-program-category-header-text",
    text: "Add a program category"
};

const addNewProgramCategoryFormComponents = (inputValidation) => {
    return [{ key: "category-name-row",
        label: { text: "Category Name" },
        input: {
            type: "text",
            id: "category-name",
            value: inputValidation.addNewProgramCategoryForm.state.categoryName.value,
            placeholder: "For example: Adult Tennis",
            options: null,
            dimensions: null,
            onChange: (e) => {
                return inputValidation.addNewProgramCategoryForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewProgramCategoryForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }, { key: "category-season-row",
        label: { text: "Category Season" },
        input: {
            type: "datalist",
            id: "category-season",
            value: inputValidation.addNewProgramCategoryForm.state.categorySeason.value,
            placeholder: "Select a season",
            options: ["Winter", "Spring", "Summer", "Fall"],
            dimensions: null,
            onChange: (e) => {
                return inputValidation.addNewProgramCategoryForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewProgramCategoryForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }, { key: "category-description-row",
        label: { text: "Category Description" },
        input: {
            type: "textarea",
            id: "category-description",
            value: inputValidation.addNewProgramCategoryForm.state.categoryDescription.value,
            placeholder: "Enter a description for this category",
            options: null,
            dimensions: { rows: 10, cols: 50 },
            onChange: (e) => {
                return inputValidation.addNewProgramCategoryForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewProgramCategoryForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }];
};

const addNewProgramCategoryFormSubmit = (dashboard, inputValidation, setLoadingAndSwitchHideForm) => {
    return {
        text: "Submit Category",
        lockedText: "Fill in all fields",
        handleClick: () => {
            API.addNewProgramCategory({
                categoryName: inputValidation.addNewProgramCategoryForm.state.categoryName.value,
                categorySeason: inputValidation.addNewProgramCategoryForm.state.categorySeason.value,
                categoryDescription: inputValidation.addNewProgramCategoryForm.state.categoryDescription.value,
                categoryDisplayedTitle: inputValidation.addNewProgramCategoryForm.state.categoryName.value +
                " (" + inputValidation.addNewProgramCategoryForm.state.categorySeason.value + ")"
            }).then((data) => {
                console.log(data);
            });
            inputValidation.addNewProgramCategoryForm.dispatch({ type: "reset" });
            return setTimeout(() => {
                setLoadingAndSwitchHideForm(dashboard, null);
                return;
            }, 1000);
        }
    };
};

export default (dashboard, inputValidation, setLoadingAndSwitchHideForm) => {
    return {
        form: addNewProgramCategoryFormTags,
        header: addNewProgramCategoryFormHeader,
        components: addNewProgramCategoryFormComponents(inputValidation),
        submit: addNewProgramCategoryFormSubmit(dashboard, inputValidation, setLoadingAndSwitchHideForm)
    };
};
