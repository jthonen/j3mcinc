import React from 'react';
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App () {
    return (
        <div id="App" className="container-fluid">
            <NavigationBar/>
            <Router>
                <Switch>
                    <Route exact path="/admin" component={AdminLoginPage}/>
                    <Route exact path="/admin/dashboard" component={AdminDashboardPage}/>
                </Switch>
            </Router>
        </div>
    );
}
