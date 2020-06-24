import React, { Component } from "react";

import LoginNavbar from "components/Navbars/LoginNavbar";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import image from "assets/img/sidebar-3.jpg";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open"
    };
  }

  render() {
    return (
      <div className="wrapper">
        <LoginNavbar></LoginNavbar>
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={4} className="justify-content-md-center">
                <Card
                  title="Login"
                  content={
                    <form >
                      <FormInputs
                        ncols={["col-md-12"]}
                        properties={[
                          {
                            label: "Username",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Username"
                          }
                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-12"]}
                        properties={[
                          {
                            label: "Password",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Password",
                          }
                        ]}
                      />
                      <Button bsStyle="info" pullCenter fill type="submit">
                        Login
                    </Button>
                      <div className="clearfix" />
                    </form>
                  }
                /></Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Login;
