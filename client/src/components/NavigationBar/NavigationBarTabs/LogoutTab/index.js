import React from "react";
import "./style.css";
import API from "../../../../utils/api";

export default function LogOutTab () {
    return (
        <span id="logout-tab" className="NavigationBarOption col-sm-12 offset-md-9 col-md-2" onClick={() => {
            return API.logOut().then(() => {
                return window.location.replace(window.location.origin + "/admin");
            });
        }}>
            <h4 className="NavigationBarOptionText"> Log out </h4>
        </span>
    );
}
