import React from "react";
import { storiesOf } from "@storybook/react";
import HomeTab from "./index";

storiesOf("HomeTab", module)
    .add("Story", () => {
        return (
            <HomeTab/>
        );
    });
