import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
 
export default class WithScrollbar extends Component {

   constructor(props) {
     super(props)
  }
    render() {
        return (
            <Carousel showThumbs={false} infiniteLoop={true} centerMode={true} centerSlidePercentage={100 / 2}>
              {this.props.ingredients.map(ingredient => (
                <div>
                    <p className="">{ingredient.name}</p>
                    <img src={ingredient.image} />
                </div>
              ))}
               
            </Carousel>
        );
    }
}
