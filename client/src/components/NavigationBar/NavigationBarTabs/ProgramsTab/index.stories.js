import React from "react";
import { storiesOf } from "@storybook/react";
import ProgramsTab from "./index";

storiesOf("ProgramsTab", module)
    .add("Story", () => {
        return (
            <ProgramsTab/>
        );
    });
