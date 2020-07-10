import React, { Component } from "react";

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product_fetched : false,
    };
  }

  render() {
   
    return (
      <div>
        <div id="title">
          <b>Home</b>
        </div>
        {/* <div className="container"> */}
          {/* <div className="row"> */}
            <div>Home Page Image</div>
            <br></br>
            {/* </div> */}
            {/* <div className="row"> */}
                <button>RECIPES</button>
                
                <button>PRODUCTS</button>

            {/* </div> */}


        {/* </div> */}
      </div>
    )
  };

}

export default HomePage;