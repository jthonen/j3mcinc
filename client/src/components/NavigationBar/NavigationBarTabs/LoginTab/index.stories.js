import React from "react";
import { storiesOf } from "@storybook/react";
import LoginTab from "./index";

storiesOf("LoginTab", module)
    .add("Story", () => {
        return (
            <LoginTab/>
        );
    });
