import React from "react";
import { storiesOf } from "@storybook/react";
import EventsDropdownMenu from "./index";

storiesOf("EventsDropdownMenu", module)
    .add("Story", () => {
        return (
            <EventsDropdownMenu/>
        );
    });
