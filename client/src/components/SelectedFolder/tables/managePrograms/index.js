// Importing API utils
// import API from "../../../../utils/api";

export default function manageProgramCategoriesTable (getDataOn, dashboard, currentUser) {
    return {
        tableId: "programs-manager",
        data: getDataOn.allPrograms(),
        condition: () => {
            return { true: false, condition: null };
        },
        thCols: [{
            key: "program-name-display-col-head",
            id: "program-name-display-col-head",
            className: "program-manager-head-col",
            contents: "Program Name"
        },
        {
            key: "program-parent-subcategory-display-col-head",
            id: "program-parent-subcategory-display-col-head",
            className: "program-manager-head-col",
            contents: "Parent Subcategory"
        },
        {
            key: "program-enrollees-display-col-head",
            id: "program-enrollees-display-col-head",
            className: "program-manager-head-col",
            contents: "Program Enrollees"
        },
        {
            key: "program-difficulty-display-col-head",
            id: "program-difficulty-display-col-head",
            className: "program-manager-head-col",
            contents: "Difficulty Rating"
        },
        {
            key: "program-description-display-col-head",
            id: "program-description-display-col-head",
            className: "program-manager-head-col",
            contents: "Program Description"
        },
        {
            key: "program-options-display-col-head",
            id: "program-options-display-col-head",
            className: "program-manager-head-col",
            contents: "Program Options"
        }],
        tdCols: (program) => {
            return [{
                key: program.programDisplayedTitle + "-program-name-display-span",
                className: "program-name-display-col program-manager-data-col",
                contents: program.programName,
                onClick: null
            },
            {
                key: program.programDisplayedTitle + "-program-season-display-span",
                className: "program-parent-subcategory-display-col program-manager-data-col",
                contents: program.parentSubcategory,
                onClick: null
            },
            {
                key: program.programDisplayedTitle + "-program-enrollees-display-span",
                className: "program-enrollees-display-col program-manager-data-col",
                contents: program.programEnrollees,
                onClick: null
            },
            {
                key: program.programDisplayedTitle + "-program-difficulty-display-span",
                className: "program-difficulty-display-col program-manager-data-col",
                contents: program.programDifficulty,
                onClick: null
            },
            {
                key: program.programDisplayedTitle + "-program-description-display-span",
                className: "program-description-display-col program-manager-data-col",
                contents: program.programDescription,
                onClick: null
            },
            {
                key: program.programDisplayedTitle + "-delete-program-span",
                className: "delete-program-col program-manager-data-col",
                contents: "",
                onClick: () => {
                    // dashboard.loading.dispatch(true);
                    // API.deleteprogram(program._id).then((data) => {
                    //     console.log(data);
                    //     dashboard.loading.dispatch(false);
                    // });
                    console.log("clicked delete program");
                    console.log(program);
                    return;
                }
            }];
        }
    };
}
