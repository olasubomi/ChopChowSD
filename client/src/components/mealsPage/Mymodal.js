import React, { Component } from "react";
// import Modal from "react-modal";
// import HeartCheckbox from 'react-heart-checkbox';
// import Slider from "react-animated-slider";
// import "react-animated-slider/build/horizontal.css";
// import { Carousel } from 'react-responsive-carousel';
// import ImagePopup from "./ImagePopup";
import { Modal } from "react-bootstrap";
// import {Button} from 'react-bootstrap/Button';
import TextSlider from "../../text_slide";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import "../../App.css";
const content = [1, 2];
class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      increment: 0,
      checked: false,
      index: 0
    };
    this.openModal = this.openModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  decrease = () => {
    if (this.state.increment > 0) {
      this.setState(prevState => ({ increment: prevState.increment - 1 }));
    }
  };

  onClick = (evnet, props) => {
    this.setState({ checked: !this.state.checked });
  };

  increase = () => {
    this.setState({ increment: this.state.increment + 1 });
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = "#f00";
  // }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleSelect(selectedIndex, e) {
    this.setState({ index: selectedIndex });
  }
  render() {
    // const { checked } = this.state;
    const { value, mealPrep, ingredientsList } = this.props;
    return (
      <>
        <div id ={value.name}>
          <button
          style={{
            backgroundColor: "orange",
            color: "white"
          }}
          key={value.id+value.label} onClick={this.openModal}>
            View Steps
          </button>
        </div>
        <Modal
          show={this.state.modalIsOpen}
          // onAfterOpen={this.afterOpenModal}
          onHide={this.closeModal}
          // style={{'backgroundColor': '#bfbfbf'}}
        >
          {/* <Modal.Header closeButton/> */}
          {/* setting position to fixed solves the browser sizing issue on modal body, but then backkkground breaks on modal */}
          <Modal.Body style={{ padding: "0px" }}> 
            <div className="container">
              <div className="row">
                <div
                  className="col-md-5 col-xs-12"
                  style={{
                    background: "white",
                    paddingLeft: "0px",
                    paddingRight: "0px"
                  }}
                >
                  <Carousel showThumbs={false} infiniteLoop={true}>
                    {content.map(index => (
                      <img
                        style={{ height: "300px" }}
                        alt="pp"
                        key={index}
                        src={value.imageSrc}
                      />
                    ))}
                  </Carousel>
                  <br />
                  <div className="col-md-12 col-xs-12">
                    <h3> {value.label}</h3>
                    <div>
                      {value.readTime} | {value.cookTime}
                      {/* <HeartCheckbox checked={checked} onClick={this.onClick} /> */}
                    </div>
                    <div>
                      <button
                        style={{
                          "margin-left": "50%",
                          backgroundColor: "grey",
                          color: "white"
                        }}
                      >
                        Compare items
                      </button>
                    </div>
                    <br />
                  </div>
                </div>
                <div
                  className=" col-md-7 col-xs-12"
                  style={{ paddingLeft: "25px" }}
                >
                  <Modal.Header closeButton style={{'borderBottom': '20px', 'padding': '0px'}}/> 
                  <div className="row">
                    Meal Quantity &nbsp;
                    <div
                      className="def-number-input number-input"
                      style={{ backgroundColor: "lightgrey" }}
                    >
                      <button
                        onClick={this.decrease}
                        className="minus"
                      ></button>
                      <input
                        className="quantity"
                        name="quantity"
                        value={this.state.increment}
                        onChange={() => console.log("change")}
                        type="number"
                      />
                      <button onClick={this.increase} className="plus"></button>
                    </div>
                    &emsp;
                    <button
                      style={{ backgroundColor: "green", color: "white" }}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <br />
                  <div className="row">
                    <b>Ingredients</b>
                  </div>
                  <div className="row">
                    {ingredientsList.map(ingredient => (
                      <div className="col-md-6" key={value.label + ingredient}>
                        <input type="checkbox" value="" />
                        {ingredient}
                        <br />
                      </div>
                    ))}
                  </div>
                  <hr></hr>
                    <TextSlider mealPrep1={mealPrep} value={value} />
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default MyModal;
