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
        <Carousel className="poojak">
          {mealPrep1.map(index => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-lfg6b47lAgSJe3XaqlzxphwOxXl6TlnTfHT21ArsO9G3BpBO"
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
