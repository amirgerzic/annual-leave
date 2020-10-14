import React, { Component } from "react";
import Footer from "components/Footer/Footer";
import image from "assets/img/sidebar-4.jpg";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "black",
      hasImage: true,
    };
  }


  render() {
    return (
      <div className="wrapper">
        <div id="main-panel">
          <h1>Page not found</h1>
          <h3>Please go back to previous page</h3>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Admin;
