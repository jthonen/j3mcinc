// Importing API utils
import API from "../../../../utils/api";

const addNewProgramSubcategoryFormTags = {
    id: "add-new-program-subcategory-form",
    className: "program-add-form"
};

const addNewProgramSubcategoryFormHeader = {
    id: "add-new-program-subcategory-header-text",
    text: "Add a program subcategory"
};

const addNewProgramSubcategoryFormComponents = (inputValidation, getDataOn) => {
    return [{ key: "categories-list-row",
        label: { text: "Category" },
        input: {
            type: "datalist",
            id: "categories-list",
            value: inputValidation.addNewProgramSubcategoryForm.state.selectedCategory.value,
            placeholder: "Select a category",
            options: getDataOn.allProgramCategories().map((category) => {
                return category.categoryDisplayedTitle;
            }),
            dimensions: null,
            onChange: (e) => {
                return inputValidation.addNewProgramSubcategoryForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewProgramSubcategoryForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }, { key: "category-name-row",
        label: { text: "Subcategory Name" },
        input: {
            type: "text",
            id: "subcategory-name",
            value: inputValidation.addNewProgramSubcategoryForm.state.subcategoryName.value,
            placeholder: "For example: Adult Clinics",
            options: null,
            dimensions: null,
            onChange: (e) => {
                return inputValidation.addNewProgramSubcategoryForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewProgramSubcategoryForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }, { key: "category-description-row",
        label: { text: "Subcategory Description" },
        input: {
            type: "textarea",
            id: "subcategory-description",
            value: inputValidation.addNewProgramSubcategoryForm.state.subcategoryDescription.value,
            placeholder: "Enter a description for this subcategory",
            options: null,
            dimensions: { rows: 10, cols: 50 },
            onChange: (e) => {
                return inputValidation.addNewProgramSubcategoryForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            },
            onKeyPress: (e) => {
                return inputValidation.addNewProgramSubcategoryForm.dispatch({
                    type: e.target.id, update: e.target.value
                });
            }
        }
    }];
};

const addNewProgramSubcategoryFormSubmit = (dashboard, inputValidation, setLoadingAndSwitchHideForm) => {
    return {
        text: "Submit Subcategory",
        lockedText: "Fill in all fields",
        handleClick: () => {
            API.addNewProgramSubcategory({
                parentCategory: inputValidation.addNewProgramSubcategoryForm.state.selectedCategory.value,
                subcategoryName: inputValidation.addNewProgramSubcategoryForm.state.subcategoryName.value,
                subcategoryDescription: inputValidation.addNewProgramSubcategoryForm.state.subcategoryDescription.value,
                subcategoryDisplayedTitle: inputValidation.addNewProgramSubcategoryForm.state.subcategoryName.value +
                " - " + inputValidation.addNewProgramSubcategoryForm.state.selectedCategory.value
            }).then((data) => {
                console.log(data);
            });
            inputValidation.addNewProgramSubcategoryForm.dispatch({ type: "reset" });
            return setTimeout(() => {
                setLoadingAndSwitchHideForm(dashboard, null);
                return;
            }, 1000);
        }
    };
};

export default (dashboard, inputValidation, setLoadingAndSwitchHideForm, getDataOn) => {
    return {
        form: addNewProgramSubcategoryFormTags,
        header: addNewProgramSubcategoryFormHeader,
        components: addNewProgramSubcategoryFormComponents(inputValidation, getDataOn),
        submit: addNewProgramSubcategoryFormSubmit(dashboard, inputValidation, setLoadingAndSwitchHideForm)
    };
};
