import React from "react";
import "./style.css";
// Importing custom React hooks
import hooks from "./hooks";
// Importing components utilized in AdminDashboardPage
import FilingCabinet from "../../components/FilingCabinet";
import LoadingBars from "../../components/LoadingBars";
import AddForm from "../../components/AddForm";

function switchHideForm (dashboard, newForm) {
    const convertHTMLCollectionToArray = (HTMLCollection) => {
        let array = [];
        for (let i = 0; i < HTMLCollection.length; i++) {
            array.push(HTMLCollection[i]);
        }
        return array;
    };
    const addForm = document.getElementById("add-form");
    if (convertHTMLCollectionToArray(addForm.classList).includes("hide-form")) {
        addForm.classList.remove("hide-form");
        dashboard.form.dispatch(newForm);
        return;
    } else {
        return addForm.classList.add("hide-form");
    }
}

function setLoadingAndSwitchHideForm (dashboard, newForm) {
    dashboard.loading.dispatch(!(dashboard.loading.state));
    switchHideForm(dashboard, newForm);
    return;
}

export default function AdminDashboardPage () {
    const getDataOn = hooks.useGetDataOn;
    const asyncWhitelistedFormInputValues = {
        allProgramCategories: getDataOn.allProgramCategories(),
        allProgramSubcategories: getDataOn.allProgramSubcategories(),
        allPrograms: getDataOn.allPrograms()
    };
    const currentUser = hooks.useAuthenticateAdmin().state;
    const dashboard = hooks.useDashboard();
    const inputValidation = hooks.useDashboardInputValidation(asyncWhitelistedFormInputValues);
    return (
        <div id="admin-dashboard-page">
            {/* If currentUser.authenticated is true display FilingCabinet, else display LoadingBars */}
            {currentUser.authenticated ?
                <FilingCabinet setLoadingAndSwitchHideForm={setLoadingAndSwitchHideForm}
                    currentUser={currentUser}
                    dashboard={dashboard}
                    getDataOn={getDataOn}/> :
                <LoadingBars />}
            {/* The following div#add-form contains an exit button and whichever
                form is currently being used by the user */}
            {/* setLoadingAndSwitchHideForm props is a function returning
                setLoadingAndSwitchHideForm because there's no need to pass
                loading props into AddForm in addition to these other props */}
            <AddForm setLoadingAndSwitchHideForm={setLoadingAndSwitchHideForm}
                inputValidation={inputValidation}
                dashboard={dashboard}
                getDataOn={getDataOn}/>
        </div>
    );
}
