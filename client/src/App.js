import React, { Component } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";

import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage";
import MealsPage from "./components/mealsPage/MealsPage";
import ProductsSection from "./components/productsPage/ProductsPage";
import Login from "./components/Login";
import GroceryPage from "./components/GroceryPage";
import ProductFullDetail from "./components/ProductFullDetail/ProductFullDetail";
import SignUp from "./components/signup";
import ForgotPassword from "./components/forgotpassword";
import ResetPassword from "./components/resetpassword";
import SuggestMeal from "./components/SuggestMeal";
import ViewSuggestedMeals from "./components/ViewSuggestedMeals";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import { setInitUrl, getUser } from "./actions";
import { connect } from 'react-redux';
import axios from './util/Api';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      suggestMealPopOver: false,
      isAuthenticated: false,
      customerId: null,
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + nextProps.token;
    }

    if (nextProps.token && !nextProps.authUser) {
      this.props.getUser();
    }
    
  }

  //////////////////////////////////////////////////////////////////////
  componentDidMount() {
    console.log("Comes in app.js's component did mount");
    var userToken = window.localStorage.getItem("userToken");

    if (userToken === "null" || userToken==="") return;

    if (userToken) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + userToken;
      this.props.getUser();
    }
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
    const { customer_id } = this.props;
    const items = [];
    var userRole = window.localStorage.getItem("userRole");
    // var userToken = window.localStorage.getItem("userToken");

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/login"
            render={() => (<Login openFlag={true} />)}
          />
          <Route exact path="/admin" render={(props) => {
            return ((customer_id !== undefined) && userRole==='admin' ? <AdminPanel {...props} /> : <Redirect to={{ pathname: "#" }} />)
          }} />
          <Route exact path="/signup" render={(props) => <SignUp {...props} />} />
          <Route exact path="/resetpass" render={(props) => <ResetPassword {...props} />} />
          <Route exact path="/forgotpass" render={(props) => <ForgotPassword {...props} />} />
          <Route exact path="/" render={(props) => (
            <div>
              <div id="title"><b>Meals</b></div>
              <div className="container">
                <div className="row">{items}</div>
              </div>
            </div>
          )}
          />

          <Route path="/home" render={() => (customer_id !== undefined) ? <HomePage /> : (<Redirect to={{ pathname: "#" }} />)} />
          <Route path="/v2" render={() => <MealsPage />} />

          <Route exact path="/grocery" render={() => {           
            return ((customer_id !== undefined || customer_id !== 'null' ) ? <GroceryPage /> : <Redirect to={{ pathname: "#" }} />)
          }}/>

          <Route path="/products" render={(props) => {
            return <ProductsSection />
          }} />
          <Route exact path="/SuggestMeal" render={(props) => 
            {
              console.log("oooooooooooo:", customer_id)
              return(
              (customer_id !== undefined) ? <SuggestMeal /> : <Redirect to={{ pathname: "#" }} /> )
            }}/>
          <Route exact path="/ViewSuggestedMeals" render={(props) => ((customer_id !== undefined) && (userRole === "admin")) ? <ViewSuggestedMeals /> : (<Redirect to={{ pathname: "#" }} />)} />
          <Route path="/product-detail/:customerId/:productId" render={(props) => (customer_id !== undefined) ? <ProductFullDetail /> : (<Redirect to={{ pathname: "#" }} />)} />
          {/* <Route path="/product-detail/:customerId/:productId" component={ProductFullDetail} /> */}
        </Switch>
        <Footer />
      </div>
    );
  }
}
// export default App;

const mapStateToProps = ({ auth }) => {
  // const { authUser, token, initURL } = auth;
  const { authUser, token, role, customer_id } = auth;
  return { authUser, role, token, customer_id }
};
const mapDispatchToProps = { setInitUrl, getUser };
export default connect(mapStateToProps, mapDispatchToProps)(App);