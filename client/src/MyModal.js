import React, { Component } from "react";
import Modal from "react-modal";
import HeartCheckbox from 'react-heart-checkbox';

import "./App.css";

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
		console.log(mealPrep,'mealp********')
    const instructionsLength = value.instructions.length;
    var i;
    var popUpSlides = [];
    for (i = 0; i < instructionsLength / 3; i++) {
      popUpSlides.push(
        <button key={i} onClick={this.updateInstructionsDisplayBaseIndex}>
          Slide {i}{" "}
        </button>
      );
    }

    return (
      <>
        <div>
          <button key={value.id} onClick={this.openModal}>
            View Steps
          </button>
        </div>
        <Modal
          className="modal-edit"
          key={value.id}
          id={value.id}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        >
          <div className="container">
            <div className="row">
              <div className=" col-md-6 padding-col">
                <img
                  src={value.imageSrc}
                  alt="info"
                  style={{ width: "100%", height: "50%" }}
                ></img>
								<br /><br />
                <h3> {value.label}</h3>
                <div>
                  {value.readTime} | {value.cookTime}     
										{/* <HeartCheckbox checked={checked} onClick={this.onClick} /> */}
                </div>
								<div><button style={{'margin-left': "50%", backgroundColor: 'grey'}}>Compare items</button></div>
              </div>
              <div className=" col-md-6" style={{  "background-color": "lightgrey" , padding:'25px'}}>
							<button className="close-button" onClick={this.closeModal}>
           				 X
          			</button>
                <div className="row">
                  Meal Quantity &nbsp; &nbsp;
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
                  &nbsp;&nbsp;
                  <button style={{ height: "30px", backgroundColor: "green" }}>
                    Add to cart
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
                  {mealPrep}
                </div>
                {popUpSlides}
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}
export default MyModal;
