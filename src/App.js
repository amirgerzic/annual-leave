import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";
import UserLayout from "layouts/User.jsx";
import HrLayout from "layouts/HR.jsx";
import LoginLayout from "layouts/Login.jsx";
import Layout404 from "layouts/FileNotFound.jsx"

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" render={props => <LoginLayout  {...props} />} />
          <Route path="/admin" render={props => <AdminLayout  {...props} />} />
          <Route path="/user" render={props => <UserLayout  {...props} />} />
          <Route path="/hr" render={props => <HrLayout  {...props} />} />
          <Route path="/404" render={props => <Layout404  {...props} />} />
        </Switch>
      </BrowserRouter>
    )
  };
}