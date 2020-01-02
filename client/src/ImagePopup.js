import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

class ImagePopup extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    render() {
        const {value} = this.props;
        return (
            <Carousel autoplay>   
            <div><img
              src={value.imageSrc}
              alt="info"
            ></img></div>
            <div><img
              src={value.imageSrc}
              alt="info"
            ></img></div>   
              </Carousel>
        )
    }
}
export default ImagePopup;