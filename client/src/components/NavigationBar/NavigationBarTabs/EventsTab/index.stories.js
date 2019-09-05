import React from "react";
import { storiesOf } from "@storybook/react";
import EventsTab from "./index";

storiesOf("EventsTab", module)
    .add("Story", () => {
        return (
            <EventsTab/>
        );
    });
