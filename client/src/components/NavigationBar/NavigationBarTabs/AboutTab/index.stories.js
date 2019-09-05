import React from "react";
import { storiesOf } from "@storybook/react";
import AboutTab from "./index";

storiesOf("AboutTab", module)
    .add("Story", () => {
        return (
            <AboutTab/>
        );
    });
