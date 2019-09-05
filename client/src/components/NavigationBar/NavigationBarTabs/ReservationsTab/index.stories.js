import React from "react";
import { storiesOf } from "@storybook/react";
import ReservationsTab from "./index";

storiesOf("ReservationsTab", module)
    .add("Story", () => {
        return (
            <ReservationsTab/>
        );
    });
