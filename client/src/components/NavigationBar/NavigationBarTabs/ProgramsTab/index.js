import React from "react";
import ProgramsDropdownMenu from "./DropdownMenu";

export default function ProgramsTab () {
    return (
        <span id="Programs" className="NavigationBarOption col-sm-12 col-md-2 offset-md-1 Dropdown">
            <h4 className="NavigationBarOptionText DropTab"> Programs </h4>
            <span className="pointer" />
            <ProgramsDropdownMenu />
        </span>
    );
}
