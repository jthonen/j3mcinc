import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import "./tables/manageAdmins/style.css";
import "./tables/manageProgramCategories/style.css";
import "./tables/manageProgramSubcategories/style.css";
import "./tables/managePrograms/style.css";
import tables from "./tables";
import LoadingBars from "../LoadingBars";
import DataTable from "../DataTable";

const switchDashboardOptionClassName = (option, dashboard) => {
    switch (dashboard.filingCabinet.state.headerText) {
        case "Manage Programs":
            return option.selected(dashboard.options.state.program_option) ?
                "manage-view-head-button add" : "manage-view-head-button";
        case "Manage Events":
            return "manage-view-head-button add";
        case "Manage Pros":
            return "manage-view-head-button add";
        case "Manage Admins":
            return "manage-view-head-button add";
        case "Activity Logs":
            return "manage-view-head-button";
        default: return null;
    }
};

const switchDisplayedDashboardOptionText = (option, dashboard) => {
    switch (dashboard.filingCabinet.state.headerText) {
        case "Manage Programs":
            return option.selected(dashboard.options.state.program_option) ? option.addText : option.text;
        case "Manage Events":
            return option.addText;
        case "Manage Pros":
            return option.addText;
        case "Manage Admins":
            return option.addText;
        case "Activity Logs":
            return option.addText;
        default: return null;
    }
};

function loadProgramsHeaderButtonOptionContent (dashboard, option) {
    dashboard.options.dispatch({
        type: "program_option", update: option.key
    });
    dashboard.loading.dispatch(true);
    setTimeout(() => {
        return dashboard.loading.dispatch(false);
    }, 75);
}

function handleHeaderButtonClicks (option, dashboard, setLoadingAndSwitchHideForm) {
    switch (dashboard.filingCabinet.state.headerText) {
        case "Manage Programs":
            // if the option clicked is already the selected option --> pull the corresponding add form into view
            // else, On click dispatch the updated selected option to useDashboard.options state
            // useDashboard.options.state.program_option is used to determine the currently selected program option
            return option.selected(dashboard.options.state.program_option) ?
                setLoadingAndSwitchHideForm(dashboard, option.addForm) :
                // dashboardOptions.dispatch is used to update the currently selected option
                loadProgramsHeaderButtonOptionContent(dashboard, option);

        case "Manage Admins":
            // ---- The "Add a new admin" button is located in the "AdminManager" component.
            // ---- On clicking the "Add a new admin" button, the "AddForm" component is placed within the screen view.
            setLoadingAndSwitchHideForm(dashboard, option.addForm);
            return;
        default: return null;
    }
}

function switchDisplayedTable (getDataOn, dashboard, currentUser) {
    let table;
    switch (dashboard.filingCabinet.state.headerText) {
        case "Manage Programs":
            switch (dashboard.options.state.program_option) {
                case "manage-program-categories":
                    table = tables.manageProgramCategories(getDataOn, dashboard, currentUser);
                    break;
                case "manage-program-subcategories":
                    table = tables.manageProgramSubcategories(getDataOn, dashboard, currentUser);
                    break;
                case "manage-programs":
                    table = tables.managePrograms(getDataOn, dashboard, currentUser);
                    break;
            }
            break;
        case "Manage Admins":
            // The "manageAdminsTableData" function is not called inside the "AdminDashboardPage" component, it is called inside the "DashboardManager" component.
            // The reason "manageAdminsTableData" function is called inside the "DashboardManager" component and not the "AdminDashboardPage" component is because:
            // ---- On clicking the various "DataTable" row columns using the click handlers described above (in props 1: "handleClick"), the content may need to be re-rendered.
            // ---- ---- For example: clicking a "DataTable" row column using the "deleteAdmin" click handler should remove that selected admin's row from the "DataTable" component.
            // ---- If you were to call the "manageAdminsTableData" function at the "AdminDashboardPage" component level (and not the "DashboardManager" component level), you would find that
            // ---- the "DataTable" component would not update instantaneously, as you might expect it to.
            // ---- The list of "allAdmins" (described above in props 3: "allAdmins"), is set via an asynchronous API request which is only called when the DashboardManager component is rendered/mounted.
            // ---- If the request to generate the list of "allAdmins" is not made, the list of "allAdmins" will not update instantaneously as expected.
            // ---- In other words, if the AdminManager component is not re-rendered/mounted, then the asynchronous call will not be made and the list of "allAdmins" will not update automatically.
            table = tables.manageAdmins(getDataOn, dashboard, currentUser);
            break;
        default: return null;
    }
    return (
        <DataTable table={table}/>
    );
}

export default function SelectedFilingCabinetFolder (props) {
    let dashboard = props.dashboard;
    let currentUser = props.currentUser;
    let setLoadingAndSwitchHideForm = props.setLoadingAndSwitchHideForm;
    let getDataOn = props.getDataOn;
    // let displayTable = switchDisplayedTable(getDataOn, dashboard, currentUser);
    // If useDashboard.loading state is true render LoadingBars
    // Else render the dashboard-manage-view div
    return (
        <div id="selected-filing-cabinet-folder">
            {dashboard.loading.state ? (
                <LoadingBars/>
            ) : (
                <div id="dashboard-manage-view">
                    <span id="dashboard-manage-view-head">
                        <h2 id="dashboard-manage-view-head-text">
                            {dashboard.filingCabinet.state.headerText}
                        </h2>
                        {dashboard.filingCabinet.state.headerButtons.map((option) => {
                            return (
                                // the value of className is assigned the value returned from switchDashboardOptionClassName
                                // this value is determined depending on the headerText, option and dashboardOptions arguments switchDashboardOptionClassName is given
                                <button key={option.key}
                                    className={switchDashboardOptionClassName(option, dashboard)}
                                    onClick={() => {
                                        return handleHeaderButtonClicks(option, dashboard, setLoadingAndSwitchHideForm);
                                    }}> {/* Switch the displayed dashboard option button's inner text content*/
                                        switchDisplayedDashboardOptionText(option, dashboard)}
                                </button>
                            );
                        })}
                    </span>
                    {/* the switchDisplayedTable function called below plays a crucial function in
                        ensuring the data provided in the rendered DataTable component is current */}
                    {switchDisplayedTable(getDataOn, dashboard, currentUser)}
                </div>
            )}
        </div>
    );
}

SelectedFilingCabinetFolder.propTypes = {
    setLoadingAndSwitchHideForm: PropTypes.func,
    currentUser: PropTypes.object,
    dashboard: PropTypes.object,
    getDataOn: PropTypes.object
};
