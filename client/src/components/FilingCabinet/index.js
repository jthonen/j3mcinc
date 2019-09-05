import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import FilingCabinetFolderTabs from "../../components/FolderTabs";
import SelectedFilingCabinetFolder from "../../components/SelectedFolder";

export default function FilingCabinet (props) {
    return (
        <div id="filing-cabinet">
            <FilingCabinetFolderTabs dashboard={props.dashboard} currentUser={props.currentUser}/>
            {/*Depending on which tab has been selected, the 'folder' contents of that tab will
            appear in the selected-filing-cabinet-folder div*/}
            <SelectedFilingCabinetFolder setLoadingAndSwitchHideForm={props.setLoadingAndSwitchHideForm}
                currentUser={props.currentUser} dashboard={props.dashboard} getDataOn={props.getDataOn}/>
        </div>
    );
}

FilingCabinet.propTypes = {
    setLoadingAndSwitchHideForm: PropTypes.func,
    currentUser: PropTypes.object,
    dashboard: PropTypes.object,
    getDataOn: PropTypes.object
};
