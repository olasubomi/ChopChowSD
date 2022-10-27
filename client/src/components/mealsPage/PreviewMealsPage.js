import React, { Component } from "react";
import MealsPageModal from "./MealsPageModal";
import WithScrollbar from "./product_slider/WithScrollbar";
// import "./MealsPage.scoped.scss";
import { Row } from 'react-bootstrap'
import axios from '../../util/Api';

class PreviewMealsPage extends Component {
  // Mongo
  entries;

  constructor(props) {
    super(props);

    window.addEventListener("resize", this.update);
    this.state = {
      products: [],
      width: 0,
      firstPart_ind: 12,
      slider_flag: false,
      meal_data: null,
      selected_index: 0,
      selectedCardID: "",

      mealSlider_Flag: false,
      currentMealCount: 12,

      mealList:null,
      col_count:1
    };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
  // store props values into state, along with display and close functionality
  // add productList props into products state

  this.update();

  console.log("Comes in meal pages component did mount");

  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  onClickMealCard = ( i, col_count )=>{
    if(i === this.state.selected_index) this.setState({slider_flag: !this.state.slider_flag})
    else this.setState({slider_flag: true})

    this.setState({ selected_index: i});
    this.setState({ meal_data: this.state.products[i]});
    this.setState({ modalIsOpen: true });  
    this.setState({ firstPart_ind: (parseInt((i )/ col_count)+1)*col_count});   
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  setMealSliderModal=()=>{
    this.setState({mealSlider_Flag: true});
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  removeMealSliderModal=()=>{
    this.setState({mealSlider_Flag: false});
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  update = () => {
    let col_count = 1;
    if (window.innerWidth > 1200) col_count = 4;
    else if(window.innerWidth > 900 && window.innerWidth < 1200) col_count = 3;
    else if(window.innerWidth > 500 && window.innerWidth < 900) col_count = 2;

    if(this.state.products === null && window.innerWidth > 500 && window.innerHeight > 500) col_count = 4;
    // if(this.state.products.length < 4 && window.innerWidth > 500 && window.innerHeight > 500) col_count = 4; //Math.min(count, this.props.products.length);

    this.setState({col_count: col_count});
  };


  //////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const {meal_data} = this.state;
    const {meal_name, mealPrep} = this.props;
    const meal_preview = [];
    let count = Math.min(this.state.products.length, this.state.currentMealCount);
     
      // Meal Cards displayed after selected card
      for (let i = Math.min(count, this.state.firstPart_ind); i< count; i+=this.state.col_count) {
        const tmp_item = []
        for(let j = 0; j<this.state.col_count; j++)
        {
          if(i+j>= count) break;
            const value = this.state.products[i+j];   
            tmp_item.push(
              <div key={i+j} className={`col-sm-${12/ this.state.col_count} mealContainer`} style={{ justifyContent:"center"}}>
                <div className="meal-card" onClick={()=>this.onClickMealCard(i+j, this.state.col_count)}>
                  <div style={containerStyle}>
                    <div style={{ textAlign:"center" }}>
                      <img
                        src={value.mealImage}
                        className="images"
                        style={{ width: "200px", height: "200px" }}
                        alt="/"
                      ></img>
                    </div>
                    <div>
                      <span style={{ color: "orange" }} >{value.label}</span> <br></br>
                      <span style={{ color: "grey" }}>View Details | {value.cookTime}  mins to prepare</span>
                      <span style={{ color: "black" }}></span>
                    </div>              
                  </div>

                </div>
              </div>
            )
        }
        meal_preview.push(
          <Row key={i+1}>{tmp_item}</Row>
        );
      }
    // }
    
    return (
      <div className="meals-Page">
        <div id="title" className="meal-title"> <b>Preview</b> </div>
        <div className="mealPage-container">
            {/* {meal_preview}     */}
            <MealsPageModal 
                    value={meal_name}
                    mealPrep={mealPrep}
                    // mealPrep={meal_data.instructions}
                    // ingredientsList={meal_data.newer_ingredient_format }
                    func_setMealFlag = {this.setMealSliderModal}
                    func_removeMealFlag = {this.removeMealSliderModal}
            />    
        </div>
      </div>
    )
  };
}

export default PreviewMealsPage;

const containerStyle = {
  display: "inline-block",
  width: "100%",
  height: "100%"
};
