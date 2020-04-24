import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./text_slider.css";

class TextSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      increment: 0,
      checked: false,
      base_index: 0,
      index: 0
    };
    this.decrease = this.decrease.bind(this);
    this.increase = this.increase.bind(this);
  }

  decrease = () => {
    if (this.state.increment > 0) {
      this.setState(prevState => ({ increment: prevState.increment - 1 }));
    }
  };

  increase = () => {
    const {increment} = this.state

    const { mealPrep1, value } = this.props;
    const instructionsLength = value.instructions.length;
    if((instructionsLength-2)/2 <= this.state.increment){
      return null
    }
    else {
      this.setState({ increment: this.state.increment + 1 });
    }
  };

 

  render() {
    const { increment} = this.state

    const { mealPrep1 } = this.props;

    return (
      <div>
        <b>Instructions</b>< br></br>
        <div className="row">
          <div className="col-md-2 col-xs-2">
          <span aria-hidden="true" class="carousel-control-prev-icon" onClick={this.decrease}></span>
          </div>
         <div className="col-md-8 col-xs-8"> 
         <div id="mealPrepChunk">
                 <li>{mealPrep1[(increment * 2) + 0]}</li>
                 {mealPrep1[(increment * 2) + 1] ? <li>{mealPrep1[(increment * 2) + 1]} </li> : ' ' }
              </div>  
            </div>
          <div className="col-md-2 col-xs-2">
          <span aria-hidden="true" class="carousel-control-next-icon" onClick={this.increase}></span>
          </div>
        </div>
      </div>


    );
  }
}
export default TextSlider;
