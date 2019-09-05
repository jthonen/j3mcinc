import React from "react";
import AboutDropdownMenu from "./DropdownMenu";

export default function AboutTab () {
    return (
        <span id="About" className="NavigationBarOption col-sm-12 col-md-2 Dropdown">
            <h4 className="NavigationBarOptionText DropTab"> About </h4>
            <span className="pointer" />
            <AboutDropdownMenu />
        </span>
    );
}
