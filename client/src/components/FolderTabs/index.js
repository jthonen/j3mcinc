import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { setTimeout } from "timers";

function buildCurrentUserDashboardOptionsList (currentUser) {
    // Basic Admin Options include the following:
    // --- manage programs
    // --- manage events
    // --- manage pros
    const basicOptions = [{
        key: "manage-programs-tab", text: "Manage Programs"
    }, {
        key: "manage-events-tab", text: "Manage Events"
    }, {
        key: "manage-pros-tab", text: "Manage Pros"
    }];
    // NCRC website owner has the option to manage other admins
    const ownerOptions = [{
        key: "manage-admins-tab", text: "Manage Admins"
    }];
    // All admins have the option to view activity logs.
    // This option should appear at the end of the list since it is unlikely it will be used regularly,
    // likely to be used for investigative purposes
    const activityLogOption = [{
        key: "view-activity-logs", text: "Activity Logs"
    }];
    // build and return the list of options available to the current user depending on the current user's authorization level
    return (currentUser.admin.authorization === "Admin") ?
        basicOptions.concat(activityLogOption) :
        basicOptions.concat(ownerOptions, activityLogOption);
}

function buildFilingCabinetFolderTabsData (currentUser) {
    // Prototype Filing Cabinet Folder Tab Data object.
    // Using a prototype to take advantage of 'this' property.
    // More specifically, using it to compare tabSelected against this.key.
    // If the tabSelected matches this.key it will return true, else it will return false
    // the selected property of each FilingCabinetFolderTabData will be used to
    // determine which tab should be displayed as the currently selected tab
    function FilingCabinetFolderTabData (key, text) {
        this.key = key;
        this.text = text;
        this.selected = (tabSelected) => {
            return (tabSelected === this.key);
        };
    }
    // build the current users' dashboard options list and assign it to the variable currentUserOptions
    const currentUserOptions = buildCurrentUserDashboardOptionsList(currentUser);
    // create a list of FilingCabinetFolderTabData objects using the prototype for each option available to the current user
    return currentUserOptions.map((option) => {
        return new FilingCabinetFolderTabData(option.key, option.text);
    });
}

const handleFilingCabinetFolderTabsClick = (tab, dashboard) => {
    let updatedView = () => {
        switch (tab.text) {
            case ("Manage Programs"):
                return dashboard.filingCabinet.content.programs;
            case ("Manage Events"):
                return dashboard.filingCabinet.content.events;
            case ("Manage Pros"):
                return dashboard.filingCabinet.content.pros;
            case ("Manage Admins"):
                return dashboard.filingCabinet.content.admins;
            case ("Activity Logs"):
                return dashboard.filingCabinet.content.logs;
            default: return null;
        }
    };
    dashboard.options.dispatch({ type: "menu_tab", update: tab.key });
    dashboard.filingCabinet.dispatch(updatedView());
    dashboard.loading.dispatch(true);
    setTimeout(() => {
        return dashboard.loading.dispatch(false);
    }, 75);
    return;
};

export default function FilingCabinetFolderTabs (props) {
    let dashboard = props.dashboard;
    return (
        <div id="filing-cabinet-folder-tabs-row">
            {/* Map through the array of filinCabinetFolderTabsData to produce
                a clickable tab for each currentUserOption */}
            {buildFilingCabinetFolderTabsData(props.currentUser).map((tab) => {
                return (
                    // if the value tag iteration's key is equal to the value of the selectedTab state use 'filing-cabinet-folder-tab tab selected'
                    // else use 'filing-cabinet-folder-tab'
                    // the 'tab-selected' value is used to style the selected tab so that it appears at the
                    // forefront of the tabs and looks as though it is selected
                    <span className={tab.selected(dashboard.options.state.menu_tab) ?
                        "filing-cabinet-folder-tab tab-selected" : "filing-cabinet-folder-tab"}
                    onClick={() => {
                        return handleFilingCabinetFolderTabsClick(tab, dashboard);
                    }}
                    key={tab.key}
                    id={tab.key}>

                        {/* if the value tag iteration's key is equal to the value of the selectedTab state use 'filing-cabinet-folder-tab tab selected'
                            else use 'filing-cabinet-folder-tab'
                            the 'tab-selected' value is used to style the selected tab so that it appears at the
                            forefront of the tabs and looks as though it is selected */}
                        <span className={tab.selected(dashboard.options.state.menu_tab) ?
                            "transparent-tab-layer tab-selected" : "transparent-tab-layer"}>
                            {tab.text}
                        </span>
                    </span>
                );
            })}
        </div>
    );
}

FilingCabinetFolderTabs.propTypes = {
    dashboard: PropTypes.object,
    currentUser: PropTypes.object
};
