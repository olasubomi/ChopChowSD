import React, { Component } from "react";
import { Button, Modal, Carousel } from "react-bootstrap";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./text_slider.css";

class TextSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      increment: 0,
      checked: false,
      index: 0
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedIndex) {
    this.setState({ index: selectedIndex });
  }

  render() {
    const { mealPrep1 } = this.props;
    console.log({ mealPrep1 }, "pppppppppp");
    return (
      <>
        <Carousel  activeIndex={this.state.index} onSelect={this.handleSelect}>
          {mealPrep1.map(index => (
            <Carousel.Item>
              <img
                className="img-responsive imageHeighgt"
                src="https://www.beautycolorcode.com/f6f0f0-2880x1800.png"
                alt="First slide"
              />
              <Carousel.Caption>
                {index}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </>
    );
  }
}
export default TextSlider;