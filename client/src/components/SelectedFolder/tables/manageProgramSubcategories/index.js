// Importing API utils
// import API from "../../../../utils/api";

export default function manageProgramCategoriesTable (getDataOn, dashboard, currentUser) {
    return {
        tableId: "program-subcategories-manager",
        data: getDataOn.allProgramSubcategories(),
        condition: () => {
            return { true: false, condition: null };
        },
        thCols: [{
            key: "program-subcategory-name-display-col-head",
            id: "program-subcategory-name-display-col-head",
            className: "program-subcategory-manager-head-col",
            contents: "Subcategory Name"
        },
        {
            key: "program-subcategory-parent-display-col-head",
            id: "program-subcategory-parent-display-col-head",
            className: "program-subcategory-manager-head-col",
            contents: "Parent Category"
        },
        {
            key: "program-subcategory-description-display-col-head",
            id: "program-subcategory-description-display-col-head",
            className: "program-subcategory-manager-head-col",
            contents: "Subcategory Description"
        },
        {
            key: "program-subcategory-options-display-col-head",
            id: "program-subcategory-options-display-col-head",
            className: "program-subcategory-manager-head-col",
            contents: "Subcategory Options"
        }],
        tdCols: (subcategory) => {
            return [{
                key: subcategory.subcategoryDisplayedText + "-program-subcategory-name-display-span",
                className: "program-subcategory-name-display-col program-subcategory-manager-data-col",
                contents: subcategory.subcategoryName,
                onClick: null
            },
            {
                key: subcategory.subcategoryDisplayedText + "-program-subcategory-season-display-span",
                className: "program-subcategory-parent-display-col program-subcategory-manager-data-col",
                contents: subcategory.parentCategory,
                onClick: null
            },
            {
                key: subcategory.subcategoryDisplayedText + "-program-subcategory-description-display-span",
                className: "program-subcategory-description-display-col program-subcategory-manager-data-col",
                contents: subcategory.subcategoryDescription,
                onClick: null
            },
            {
                key: subcategory.subcategoryDisplayedText + "-view-program-subcategory-subcategories-span",
                className: "view-program-subcategory-subcategories-col program-subcategory-manager-data-col",
                contents: "",
                onClick: (subcategory) => {
                    console.log("clicked view subcategories");
                    console.log(subcategory);
                }
            },
            {
                key: subcategory.subcategoryDisplayedText + "-delete-program-subcategory-span",
                className: "delete-program-subcategory-col program-subcategory-manager-data-col",
                contents: "",
                onClick: () => {
                    // dashboard.loading.dispatch(true);
                    // API.deletesubcategory(subcategory._id).then((data) => {
                    //     console.log(data);
                    //     dashboard.loading.dispatch(false);
                    // });
                    console.log("clicked delete subcategory");
                    console.log(subcategory);
                    return;
                }
            }];
        }
    };
}
