// Importing API utils
// import API from "../../../../utils/api";

export default function manageProgramCategoriesTable (getDataOn, dashboard, currentUser) {
    return {
        tableId: "program-categories-manager",
        data: getDataOn.allProgramCategories(),
        condition: () => {
            return { true: false, condition: null };
        },
        thCols: [{
            key: "program-category-name-display-col-head",
            id: "program-category-name-display-col-head",
            className: "program-category-manager-head-col",
            contents: "Category Name"
        },
        {
            key: "program-category-season-display-col-head",
            id: "program-category-season-display-col-head",
            className: "program-category-manager-head-col",
            contents: "Category Season"
        },
        {
            key: "program-category-description-display-col-head",
            id: "program-category-description-display-col-head",
            className: "program-category-manager-head-col",
            contents: "Category Description"
        },
        {
            key: "program-category-options-display-col-head",
            id: "program-category-options-display-col-head",
            className: "program-category-manager-head-col",
            contents: "Category Options"
        }],
        tdCols: (category) => {
            return [{
                key: category.categoryDisplayedText + "-program-category-name-display-span",
                className: "program-category-name-display-col program-category-manager-data-col",
                contents: category.categoryName,
                onClick: null
            },
            {
                key: category.categoryDisplayedText + "-program-category-season-display-span",
                className: "program-category-season-display-col program-category-manager-data-col",
                contents: category.categorySeason,
                onClick: null
            },
            {
                key: category.categoryDisplayedText + "-program-category-description-display-span",
                className: "program-category-description-display-col program-category-manager-data-col",
                contents: category.categoryDescription,
                onClick: null
            },
            {
                key: category.categoryDisplayedText + "-view-program-category-subcategories-span",
                className: "view-program-category-subcategories-col program-category-manager-data-col",
                contents: "",
                onClick: (category) => {
                    console.log("clicked view subcategories");
                    console.log(category);
                }
            },
            {
                key: category.categoryDisplayedText + "-delete-program-category-span",
                className: "delete-program-category-col program-category-manager-data-col",
                contents: "",
                onClick: () => {
                    // dashboard.loading.dispatch(true);
                    // API.deleteCategory(category._id).then((data) => {
                    //     console.log(data);
                    //     dashboard.loading.dispatch(false);
                    // });
                    console.log("clicked delete category");
                    console.log(category);
                    return;
                }
            }];
        }
    };
}
