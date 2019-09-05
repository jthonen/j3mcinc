import React from "react";
import { storiesOf } from "@storybook/react";
import ProgramsDropdownMenu from "./index";

storiesOf("ProgramsDropdownMenu", module)
    .add("Story", () => {
        return (
            <ProgramsDropdownMenu/>
        );
    });
