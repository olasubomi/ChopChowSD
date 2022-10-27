import React, { Component } from "react";
import Banner from "./Banners/banner"
import Banner2 from "./Banners/banner2"
import HomePageButtons from "./HomePage/HomePageButtons"

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product_fetched: false,
    };
  }

  render() {

    return (
      <div>
        <Banner/>
        <br></br>
        <HomePageButtons/>
        <br></br>
        <Banner2/>
      </div>
    )
  };

}

export default HomePage;