import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "components/Navbars/Navbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import routes from "routes.js";
import image from "assets/img/sidebar-4.jpg";

const jwtDecode = require('jwt-decode');
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "black",
      hasImage: true,
    };
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        const token = localStorage.getItem('usertoken')
      var decoded = jwtDecode(token)
      if(prop.layout !== "/"+decoded.typeOfUser){
        this.props.history.push('/404')
      }
        return (
          <Route
          path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return null;
  };

  render() {
    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={routes} image={this.state.image}
        color={this.state.color}
        hasImage={this.state.hasImage}/>
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Navbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Admin;
