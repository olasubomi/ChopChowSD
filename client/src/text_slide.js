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
    this.handleSelect = this.handleSelect.bind(this);
    this.updateInstructionsDisplayBaseIndex = this.updateInstructionsDisplayBaseIndex.bind(
      this
    );
  }

  handleSelect(selectedIndex) {
    this.setState({ index: selectedIndex + 1 });
  }

  updateInstructionsDisplayBaseIndex(event) {
    console.log(event.target.innerText);
    var button = event.target.innerText;
    // var regExp = "/^w+[ ]/d  $/";
    // var slide_index = button.match(regExp);
    //console.log(slide_index);
    var last_chars = button.slice(6, 7);

    var slide_num = Number(last_chars);

    this.setState({ base_index: slide_num * 3 });
    //var base_index = slide_num*3;
    //console.log("Updating base index on click to: " +this.state.base_index);
  }

  render() {
    const { mealPrep1, value } = this.props;
    console.log({ mealPrep1 }, "pppppppppp");
    var popUpSlides = [];
    var carouselSlides = [];
    var i;
    const instructionsLength = value.instructions.length;

    for (i = 0; i < instructionsLength / 3; i++) {
      popUpSlides.push(
        <button key={i} onClick={this.updateInstructionsDisplayBaseIndex}>
          Slide {i}{" "}
        </button>
      );
    }

    console.log("instructions length: " + instructionsLength);
    for (i = 0; i <= instructionsLength / 2; i++) {
      console.log("i is :" + i);
      if (mealPrep1[((i * 2) + 1)] !== undefined) {
        console.log("Comes in here with 3 instructions for slide #: " + i);
        carouselSlides.push(
          <Carousel.Item>
            <img
              className="img-responsive imageHeighgt"
              src="https://www.beautycolorcode.com/f6f0f0-2880x1800.png"
              alt="First slide"
            />
            <Carousel.Caption>
              <div id="mealPrepChunk">
                {/* manually add intstruction numbering for display as list */}
                {(i * 2) + 1}. {mealPrep1[(i * 2) + 0]}
                {(i * 2) + 2}. {mealPrep1[(i * 2) + 1]}
                {/* {(i * 3) + 3}. {mealPrep1[(i * 3) + 2]} */}
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        )
      }
      else {
        if (mealPrep1[(i * 2)] !== undefined) {
          console.log("Comes in here with 2 instructions for slide #: " + i);

          carouselSlides.push(
            <Carousel.Item>
              <img
                className="img-responsive imageHeighgt"
                src="https://www.beautycolorcode.com/f6f0f0-2880x1800.png"
                alt="First slide"
              />
              <Carousel.Caption>
                <div id="mealPrepChunk">
                  {(i * 2) + 0}. {mealPrep1[(i * 2) + 0]}
                  {/* {(i * 3) + 1}. {mealPrep1[(i * 3) + 1]} */}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          )
        }
        // else if (mealPrep1[(i * 3) ] != undefined) {
        //   console.log("Comes in here with 1 instructions for slide #: "+ i);

        //   carouselSlides.push(
        //     <Carousel.Item>
        //       <img
        //         className="img-responsive imageHeighgt"
        //         src="https://www.beautycolorcode.com/f6f0f0-2880x1800.png"
        //         alt="First slide"
        //       />
        //       <Carousel.Caption>
        //         <div id="mealPrepChunk">

        //           {(i * 3) + 0}. {mealPrep1[(i * 3) + 0]}

        //         </div>
        //       </Carousel.Caption>
        //     </Carousel.Item>
        //   )
        // }
      }
    }

    return (

      <div>
        <b>Instructions</b>< br></br>
        <Carousel onSelect={this.handleSelect}>
          {carouselSlides}
        </Carousel>
      </div>


    );
  }
}
export default TextSlider;