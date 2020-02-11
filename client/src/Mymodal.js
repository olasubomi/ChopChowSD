import React, { Component } from "react";
// import Modal from "react-modal";
// import HeartCheckbox from 'react-heart-checkbox';
// import Slider from "react-animated-slider";
// import "react-animated-slider/build/horizontal.css";
// import { Carousel } from 'react-responsive-carousel';
// import ImagePopup from "./ImagePopup";
import {Button, Modal} from 'react-bootstrap';
// import {Button} from 'react-bootstrap/Button';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import "./App.css";
const content = [1, 2];
class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      increment: 0,
      checked: false
    };
    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateInstructionsDisplayBaseIndex = this.updateInstructionsDisplayBaseIndex.bind(
      this
    );
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

  updateInstructionsDisplayBaseIndex(event) {
    console.log(event.target.innerText);
    var button = event.target.innerText;
    var regExp = "/^w+[ ]/d  $/";
    var slide_index = button.match(regExp);
    var last_chars = button.slice(6, 7);

    var slide_num = Number(last_chars);
    this.setState({ base_index: slide_num * 3 });
  }

  render() {
    const { checked } = this.state;
    const { value, mealPrep, ingredientsList } = this.props;
    var i;
    var newarray = [];
    for (i = 1; i < mealPrep.length; i = i + 3) {
      if (mealPrep[i] === undefined) {
        newarray.push([mealPrep[i - 1], "", ""]);
      }
      if (mealPrep[i + 1] === undefined) {
        newarray.push([mealPrep[i - 1], mealPrep[i], ""]);
      } else {
        newarray.push([mealPrep[i - 1], mealPrep[i], mealPrep[i + 1]]);
      }
    }
    const mealPrep1 = newarray.map(step => <ol key={step}> {step} </ol>);

    
    return (
      <>
        <div>
          <button key={value.id} onClick={this.openModal}>
            View Steps
          </button>
        </div>
        <Modal show={this.state.modalIsOpen}
          // onAfterOpen={this.afterOpenModal}
          onHide={this.closeModal}>
        <Modal.Header closeButton>
          {/* <Modal.Title></Modal.Title> */}
        </Modal.Header>
        <Modal.Body> <div className="row">
              <div className=" col-md-6">
                <Carousel showThumbs={false} infiniteLoop={true}>
                  {content.map(index => (
                    <img key={index} src={value.imageSrc} />
                  ))}
                </Carousel>
                <br />
                <div className="col-md-12">
                  <h3> {value.label}</h3>
                  <div>
                    {value.readTime} | {value.cookTime}
                    {/* <HeartCheckbox checked={checked} onClick={this.onClick} /> */}
                  </div>
                  <div>
                    <button
                      style={{ "margin-left": "50%", backgroundColor: "grey" }}
                    >
                      Compare items
                    </button>
                  </div>
                </div>
              </div>
              <div className=" col-md-6">
                <div className="row">
                  Meal Quantity
                  &nbsp;
                  <div className="def-number-input number-input">
                    <button onClick={this.decrease} className="minus"></button>
                        <input
                        className="quantity"
                        name="quantity"
                        value={this.state.increment}
                        onChange={() => console.log("change")}
                        type="number"
                        />
                    <button onClick={this.increase} className="plus"></button>
                  </div>
                  <button style={{ backgroundColor: "green" }}>
                    Add to Cart
                  </button>
                </div>
                <div>
                  <b>Ingredients</b>
                </div>
                <div>
                  <ol>{ingredientsList}</ol>
                </div>
                <hr></hr>
                <div id="mealPrepChunk">
                  {/* <Slider>{mealPrep1}</Slider> */}
                </div>
              </div>
            </div></Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary">
            Close
          </Button>
          <Button variant="secondary">
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
      </>
    );
  }
}
export default MyModal;
