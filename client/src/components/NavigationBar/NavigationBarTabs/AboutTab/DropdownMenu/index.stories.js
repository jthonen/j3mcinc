import React from "react";
import { storiesOf } from "@storybook/react";
import AboutDropdownMenu from "./index";

storiesOf("AboutDropdownMenu", module)
    .add("Story", () => {
        return (
            <AboutDropdownMenu/>
        );
    });
