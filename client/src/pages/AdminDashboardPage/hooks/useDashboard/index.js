import { useReducer, useState } from "react";

function useLoading () {
    const [loading, setLoading] = useState(false);
    return { state: loading, dispatch: setLoading };
}

function useDashboardOptions () {
    const [selectedDashboardOptions, setSelectedDashboardOptions] = useReducer((state, action) => {
        switch (action.type) {
            case "menu_tab": return { ...state, menu_tab: action.update };
            case "program_option": return { ...state, program_option: action.update };
        }
    }, {
        menu_tab: "manage-programs-tab",
        program_option: "manage-program-categories"
    });
    return { state: selectedDashboardOptions, dispatch: setSelectedDashboardOptions };
}

function useFilingCabinet () {
    const programOptions = [{ key: "manage-program-categories",
        text: "Categories",
        addText: "Add a category",
        addForm: "add-new-program-category-form" },
    { key: "manage-program-subcategories",
        text: "Subcategories",
        addText: "Add a subcategory",
        addForm: "add-new-program-subcategory-form" },
    { key: "manage-programs",
        text: "Programs",
        addText: "Add a program",
        addForm: "add-new-program-form" }];

    const eventOptions = [{ key: "add-new-event",
        text: "Create event",
        addText: "Create event",
        addForm: "add-new-event-form" }];

    const prosOptions = [{ key: "add-new-pro",
        text: "Add a new pro",
        addText: "Add a new pro",
        addForm: "add-new-pro-form" }];

    const adminOptions = [{ key: "add-new-admin",
        text: "Add a new admin",
        addText: "Add a new admin",
        addForm: "add-new-admin-form" }];

    const logOptions = [{ key: "view-developer-logs",
        text: "Developer Logs",
        addText: "Developer Logs",
        addForm: "view-developer-logs" }];

    function OptionButtonData (option) {
        this.key = option.key;
        this.text = option.text;
        this.addText = option.addText;
        this.addForm = option.addForm;
        this.selected = (buttonSelected) => {
            return (buttonSelected === this.key);
        };
    }

    const dashboardMetaData = {
        programs: {
            headerText: "Manage Programs",
            headerButtons: programOptions.map((option) => {
                return new OptionButtonData(option);
            })
        },
        events: {
            headerText: "Manage Events",
            headerButtons: eventOptions.map((option) => {
                return new OptionButtonData(option);
            })
        },
        pros: {
            headerText: "Manage Pros",
            headerButtons: prosOptions.map((option) => {
                return new OptionButtonData(option);
            })
        },
        admins: {
            headerText: "Manage Admins",
            headerButtons: adminOptions.map((option) => {
                return new OptionButtonData(option);
            })
        },
        logs: {
            headerText: "Activity Logs",
            headerButtons: logOptions.map((option) => {
                return new OptionButtonData(option);
            })
        }
    };

    const [dashboardContent, setDashboardContent] = useState(dashboardMetaData.programs);
    return { state: dashboardContent, dispatch: setDashboardContent, content: dashboardMetaData };
}

function useAdminDashboardForm () {
    const [currentForm, setCurrentForm] = useState(null);
    return { state: currentForm, dispatch: setCurrentForm };
}


export default function useDashboard () {
    return {
        loading: useLoading(),
        filingCabinet: useFilingCabinet(),
        form: useAdminDashboardForm(),
        options: useDashboardOptions()
    };
}
