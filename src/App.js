import React, {Component} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";
import LoginLayout from "layouts/Login.jsx";

export default class App extends Component {

  render(){
  return (
  <BrowserRouter>
    <Switch>
      <Route path="/login" render={props => <LoginLayout  {...props}/>} />
      <Route path="/admin" render={props => <AdminLayout  {...props}/>} />
    </Switch>
  </BrowserRouter>
  )
};
}