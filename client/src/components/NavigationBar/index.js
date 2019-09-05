import React from "react";
import "./style.css";

import HomeTab from "./NavigationBarTabs/HomeTab";
import ProgramsTab from "./NavigationBarTabs/ProgramsTab";
import ReservationsTab from "./NavigationBarTabs/ReservationsTab";
import EventsTab from "./NavigationBarTabs/EventsTab";
import AboutTab from "./NavigationBarTabs/AboutTab";
import LoginTab from "./NavigationBarTabs/LoginTab";
import LogOutTab from "./NavigationBarTabs/LogoutTab";

// NavigationBar component contains NavBar tabs --> each tab contains varying content
export default function NavigationBar () {
    switch (window.location.pathname.toLowerCase()) {
        case "/admin":
            return (
                <div id="NavigationBar" className="row wimbledon-purple-theme">
                    <HomeTab />
                </div>
            );
        case "/admin/dashboard":
            return (
                <div id="NavigationBar" className="row wimbledon-purple-theme">
                    <HomeTab />
                    <LogOutTab/>
                </div>
            );
        default:
            return (
                <div id="NavigationBar" className="row">
                    <HomeTab />
                    <ProgramsTab />
                    <ReservationsTab />
                    <EventsTab />
                    <AboutTab />
                    <LoginTab />
                </div>
            );
    }
}
