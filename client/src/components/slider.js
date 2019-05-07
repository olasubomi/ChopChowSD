import React, { Component } from 'react';
import Slide from './slide'
import './slider.css'
export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
        width: 300,
        height: 800,
        images: ['nature-1.jpg', 'nature-2.jpg', 'nature-3.jpg', 'nature-4.jpg', 'nature-5.jpg', 'nature-6.jpg']
      }
  }
render() {
    renderNavigation=()=>{
        return (
          <div className="slider-arrows">
            <a className="arrow left">
              <img src={require('./img/arrow-left.png')} />
            </a>
            <a className="arrow right">
              <img src={require('./img/arrow-right.png')} />
            </a>
            
            {/* <img
                src="/images/products/sugar.jpeg"
                alt="Pic unavailable"
                style={{width:"200px", height:"200px"}}
            />
            
            
            <img
                src="/images/products/thyme.jpg"
                alt="Pic unavailable"
                style={{width:"200px", height:"200px"}}
            />
            
            
            <img
                src="/images/products/tomato.jpg"
                alt="Pic unavailable"
                style={{width:"200px", height:"200px"}}
            />
            
            
            <img
                src="/images/products/water.jpeg"
                alt="Pic unavailable"
                style={{width:"200px", height:"200px"}}
            />
            
            
            <img
                src="/images/products/yeast.jpg"
                alt="Pic unavailable"
                style={{width:"200px", height:"200px"}}
            /> */}
    
        </div>
        )
      }

      renderSlides=()=> {
        const images = this.state.images;
        return (
          <div className="slider-items">
            {
              images.map((image, index) => {
                return (
                  <Slide image={image} width={this.state.width} height={this.state.height} key={index} />
                )
              })
            }
          </div>
        )
      }


    return (
        <div className="slider">
                    {this.renderNavigation()}
                    {this.renderSlides()}
        </div>
    )
  }
}