import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2
    
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  },
};

class WithScrollbar extends React.Component {
  constructor(props){
    super(props)
    this.state = { additionalTransfrom: 0 };

  }

  
  render() {
   
    return (
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        autoPlay={this.props.deviceType !== "mobile" ? true : false}
        transitionDuration={1000}
        containerClass="carousel-container" 
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div className="image-container increase-size">
          
          <img
            draggable={false}
            style={{ width: "100%", cursor: "pointer" }}
            src="/images/products/sugar.jpeg"
          />
          <div className="image-container-text">
            <p style={{'text-align':'center'}}>sugar</p>
          </div>
        </div>
        <div className="increase-size">
          
          <img
            draggable={false}
            style={{ width: "100%", cursor: "pointer" }}
            src="/images/products/onion.jpg"
          />
          <div className="image-container-text">
            <p style={{'text-align':'center'}}>onion</p>
          </div>
        </div>

        <div className="image-container increase-size">
          
          <img
            draggable={false}
            style={{ width: "100%", cursor: "pointer" }}
            src="/images/products/tomato.jpg"
          />
          <div className="image-container-text">
            <p style={{'text-align':'center'}}>tomato</p>
          </div>
        </div>

        <div className="image-container increase-size">
          
          <img
            draggable={false}
            style={{ width: "100%", cursor: "pointer" }}
            src="/images/products/water.jpeg"
          />
          <div className="image-container-text">
            <p style={{'text-align':'center'}}>water</p>
          </div>
        </div>

        <div className="image-container increase-size">
          
          <img
            draggable={false}
            style={{ width: "100%", cursor: "pointer" }}
            src="/images/products/vegetable_oil.jpg"
          />
          <div className="image-container-text">
            <p style={{'text-align':'center'}}>vegetable oil</p>
          </div>
        </div>
        
      </Carousel>
    );
  }
}

export default WithScrollbar;
