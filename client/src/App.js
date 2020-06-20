import React, { Component } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
class App extends Component {
  constructor(props) {
    super(props);
    this.updateLogInStatus = this.updateLogInStatus.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      suggestMealPopOver: false,
      isAuthenticated: false,
      customerId: null,
    };
  }

  updateLogInStatus(customerId) {
    console.log("updates log in status before");
    this.setState({ isAuthenticated: true });
    this.setState({ customerId: customerId });

    console.log("updates log in status after");
    console.log("customerID is:" + customerId);
  }

  componentDidMount() {
    console.log("Comes in app.js's component did mount");
    this.authenticateUser();
    console.log("customerID is:" + this.state.customerId);
  }

  authenticateUser() {
    var localToken = window.localStorage.getItem("userToken");
    // api authenticate user calls authenticationVerify,isAuthenticated

    // var url = `https://chopchowdev.herokuapp.com/api/authenticate-grocery-page`;
    var url = `./api/authenticate-app-page`;
    // var url = `http://localhost:5000/api/authenticate-grocery-page`
    fetch(url, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localToken,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log("api/ authenticate (app page) response:");
        console.log(response);

        if (response.success && response.data) {
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ isAuthenticated: false });
        }

        this.setState({ customerId: response.data });
        const { customerId } = this.state;
        console.log("customer id iis: " + customerId);
      })
      .catch((err) => {
        console.log("fails to authenticate app page");
        console.log(err);
      });
  }

  handleLogout() {
    //clear cookie cache
    window.localStorage.setItem("userToken", null);

    var url = "/api/logout";

    fetch(url, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((res) => {
          console.log("logout response is:");
          console.log(res);
          console.log("should print body");
          // var bodyResponse = JSON.parse(res.body);
          console.log(res.data);
          if (res.data === "success") {
            console.log("comes to turn off authentication state");
            this.setState({ isAuthenticated: false });
          }
        });
      })
      .catch((err) => {
        console.log("fails to authenticate app page");
        console.log(err);
      });

    this.setState({ isAuthenticated: false });
    window.location.reload(false);
  }

  render() {
    // Render your page inside
    // the layout provider
    return (
      <div>
        <Header />
        <Footer />
      </div>
    );
  }
}
export default App;
