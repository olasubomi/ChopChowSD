import React from "react";
import "./style.css";
import { Form, Button, Container, Modal, Row, Col, Card } from "react-bootstrap";

import { Link } from "react-router-dom";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      messageErr: false,
      messageSuccess: false,
    };
  }

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  handleLoginClick = () => {
    var email = this.state.email;
    var password = this.state.password;

    // const { email, password } = this.state;
    if (email && password) {
      // var url = `https://chopchowdev.herokuapp.com/api/login`;
      var url = `./api/login`;
      // var url = `http://localhost:5000/api/login`

      fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => {
          if (response.status === 400 || response.status === 404) {
            this.setState({
              messageErr: "Bad Request. Please check email or password.",
            });
          } else if (response.status === 401) {
            this.setState({ messageErr: "Sorry, you are not authorized" });
          } else if (response.status >= 500) {
            this.setState({ messageErr: "Sorry , Internal Server ERROR" });
          } else {
            console.log("Reponse status is:");
            console.log(response.status);

            this.setState({ messageErr: "" });

            this.setState({ isAuthenticated: true });
            this.setState({ messageSuccess: "Logged in Sucessfully! " });
            return response.json();
          }
        })
        .then((body) => {
          // .then(firstBody=>{return firstBody.json()})

          console.log(body);
          console.log(body.message);
          console.log(body.token);
          console.log(body.customerID);
          let customerID = body.customerID;
          window.localStorage.setItem("userToken", body.token);
          // console.log("converted body is :")
          // var jsonBody = body.json();
          // console.log(jsonBody)

          console.log("before prop func call");
          this.props.updateLogInStatus(customerID);
          console.log("after prop func call");
          // return to page that called log in popup.
          return (window.location.href = "/grocery");
          // window.location.reload(false);
        })
        .catch(() => {
          this.setState(
            {
              messageAlert: "Internal Server Error while logging in",
              showAlert: true,
              variant: "danger",
            },
            () =>
              setTimeout(() => {
                this.setState({ messageAlert: "", showAlert: false });
              }, 8000)
          );
        });
    } else {
      this.setState({ messageErr: "Please enter all fields" });
      console.log("Please enter all fields");
    }
  };

  render() {
    const { email, password, messageErr, messageSuccess } = this.state;
    return (      
      <Container>
            <Modal 
            show={true}
            onHide={this.handleClose}
            className="text-center custom-card1"
            backdrop="static"
            size="lg"
            >
            <Modal.Header closeButton>
              <Modal.Title className="text-center" >Log In to View your Grocery List</Modal.Title>
            </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={5}>
                    <Button className="fb-btn mb-3 px-3 py-2">Login In with Facebook</Button>
                    <Button className="google-btn px-3 py-2">Login In with Google</Button>
                  </Col>
                  <Col md={1} className="or">
                    or
                  </Col>
                  <Col md={6} className="d-block right-panel">
                    <Form>
                      <Form.Control 
                        type="text" 
                        name="email"
                        value={email}
                        placeholder="Your Email or Username" 
                        onChange={this.handleChange}
                        className="login__form__input1"
                        autoComplete="username"
                      />
                      <Form.Control 
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Your password"
                        onChange={this.handleChange}
                        className="login__form__input"
                        autoComplete="current-password"
                        />
                      {/* <Form.Group controlId="formBasicEmail">                        
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">                        
                      </Form.Group> */}
                      <Form.Label className="lbl_text text-left" column md={12}><a className="forget" href="/forgotpass">Forget Password?</a></Form.Label>

                      <Button 
                        variant="primary"
                        className="mb-1 float-left login-button"
                        onClick={this.handleLoginClick}
                      >Login</Button>

                      <Form.Label className="lbl_text mt-4 text-right pb-0" column md={12}>Dont's have an account? <a className="signup" href="/signup">Sign Up</a></Form.Label>
                      <Form.Label className="lbl_text text-right pt-0" column md={12}>or <a className="continue" href="/v2">continue as guest</a></Form.Label>

                    </Form>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>        
      </Container>
    );
  }
}
