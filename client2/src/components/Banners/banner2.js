import React, { Component } from "react";
import background from "../../assets/images/homepage/grocery_bag.jpg";
import './banner2.css';
import { Link  } from "react-router-dom";

class Banner2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_fetched: false,
        };
    }

    render() {

        return (
            <div>
                <div style={{
                    height: "510px",
                    verticalAlign: "top",
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: "no-repeat",
                    // backgroundSize: "100%",
                    backgroundColor: "transparent",
                    backgroundSize: "cover"
                }}

                >
                    {/* <!-- <h1>Book a Consultation</h1> --> */}
                    <div className="banner2_spacing"></div>
                    <div className="banner2container">
                        <p className="banner2_text">
                            <b>
                                HOME COOK<br></br>
                                INTERNATIONAL FOODS<br></br>
                                <button className="banner2_button">
                                     <Link to="/products" className="nav-link px-2">SEE RECIPES</Link>
                                </button>
                            </b>
                        </p>
                    </div>

                </div>
            </div>
        )
    };

}

export default Banner2;