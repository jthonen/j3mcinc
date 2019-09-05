import React from "react";
import EventsDropdownMenu from "./DropdownMenu";

export default function EventsTab () {
    return (
        <span id="Events" className="NavigationBarOption col-sm-12 col-md-2 Dropdown">
            <h4 className="NavigationBarOptionText DropTab"> Events </h4>
            <span className="pointer" />
            <EventsDropdownMenu />
        </span>
    );
}
