import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
 
export default class WithScrollbar extends Component {

    render() {
        return (
            <Carousel showThumbs={false} infiniteLoop={true} centerMode={true} centerSlidePercentage={100 / 2}>
              {this.props.products.map(ingredient => (
                <div key={ingredient}>
                    <p className="">{ingredient.ingredient}</p>
                    <img src={"/images/products/"+ingredient.image} alt={ingredient.ingredient} />

                </div>
              ))}
               
            </Carousel>
        );
    }
}
