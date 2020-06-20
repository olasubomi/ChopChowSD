import React, { Component } from "react";
// import MyModal from "./mealsPage/Mymodal";
// import WithScrollbar from "./mealsPage/product_slider/WithScrollbar";

class ViewSuggestedMeals extends Component {

    // Mongo
    products = [];
    entries;

  constructor(props) {
    super(props);
    this.state = {
      meals_fetched : false,
      suggestMealPopOver: false,
      mealsListed: false,
      mealSelected: false,
      IngredientsListed: false,
      recipes: this.meals, //[this.Garri, this.Jollof_Rice],
      valueAllDataLists: [],
      showIngredients: {
        hidden: true
      },
      showProducts: {
        hidden: true
      },
      //open: false,
      topNav_className: "w3-bar w3-dark-grey w3-green topnav"
    };
  }

  componentDidMount() {
    console.log("Comes in meal pages component did mount");
    // var url = "https://chopchowdev.herokuapp.com/api/get-suggested-meals";
    var url = "http://localhost:5000/api/get-suggested-meals"

    fetch(url)
      .then(res => res.text())
      .then(body => {
        // console.log("should print body");
        // console.log(body);
        var productsList = JSON.parse(body);
        // console.log(productsList);
        if(productsList && productsList.data.length !== 0){
          console.log("shows products does return");
          console.log(productsList.data.length);
          for (var i = 0; i < productsList.data.length; i++) {
            this.products.push(productsList.data[i]);
          }
          console.log(this.products);
          // this.entries = Object.entries(this.products);
          // console.log(entries);
          this.setState({meals_fetched:true});
        }
        else{
          console.log("shows products do not return");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  meal_popups = [];

  showIngredient(index) {
    console.log("updating popup boolean");
    this.meal_popups[index] = !this.meal_popups[index];
  }


  render() {
    const items = [];
    console.log("Hello RENDER");
    for (const [index, value] of this.products.entries()) {
      console.log("COMES IN RENDER");
      //console.log();
      // var base_index = 0;
      console.log(value);
      // const mealPrep = value.instructions.map(step => (
      //   <text key={value.label + " - " + step}> {step} <br></br></text>
      // ));
      // console.log(mealPrep);

      // const instructionsLength = value.instructions.length;
      //console.log(instructionsLength);

      // var mealIngredient = value.ingredients ;
      // const ingredientsList = value.ingredients.map(step => (
      //   <li key={step}> {step} </li>
      // ));
      this.meal_popups.push(false);
      // console.log(this.meal_popups);
      // console.log(index);
      items.push(
        <div key={value.label + value.id} className="col-sm-12 col-md-4 col-lg-3 mealContainer">
          <div>
            <div style={containerStyle}>
              <img
                src={value.imageSrc}
                className="images"
                style={{ width: "200px", height: "180px" }}
                alt={value.id}
                onClick={() => {
                  this.meal_popups[index] = !this.meal_popups[index];
                  console.log(this.meal_popups);
                  var x = document.getElementById(value.id);
                  var y = document.getElementById(value.id + "products");
                  if (this.meal_popups[index]) {
                    x.style.display = "block";
                    y.style.display = "block";
                  } else {
                    x.style.display = "none";
                    y.style.display = "none";
                  }
                }}
              ></img>
              {/* <img src={value.imageSrc} className="images" style={{width:"100%"}} alt={value.id} onClick={this.showIngredient(index)}></img> */}
              <div>
                {" "}
                {/* <b> */}
                {" "}
                <span style={{ color: "orange" }} >{value.label}</span> <br></br>
                {/* </b> */}
                {" "}

                {" "}
                <span style={{ color: "grey" }}>View Details | {value.cookTime}</span>
                <span
                  style={{ color: "black" }}
                  onClick={() => {
                    this.meal_popups[index] = !this.meal_popups[index];
                    console.log(this.meal_popups);
                    var x = document.getElementById(value.id);
                    var y = document.getElementById(value.id + "products");
                    if (this.meal_popups[index]) {
                      x.style.display = "block";
                      y.style.display = "block";
                    } else {
                      x.style.display = "none";
                      y.style.display = "none";
                    }
                  }}
                >
                </span>
                <div id={value.id} style={{ display: "none" }}>
                  {value.intro}
                  {/* <MyModal
                    value={value}
                    mealPrep={mealPrep}
                    ingredientsList={value.ingredients}
                  /> */}

                </div>
                <br></br>
                <br></br>
                <br></br>
              </div>
              <div id={value.id + "products"} style={{ display: "none" }}>
                {/* Meal Ingredients */}
                <br></br>
                {value.products}
                {/* <WithScrollbar
                  products={value} */}
                {/* // ingredients={[ */}
                {/* //   { name: "sugar", image: "/images/products/sugar.jpeg" },
                //   { name: "onion", image: "/images/products/onion.jpg" },
                //   { name: "tomato", image: "/images/products/tomato.jpg" },
                //   { name: "water", image: "/images/products/water.jpeg" },
                //   { */}
                {/* //     name: "vegetable oil",
                //     image: "/images/products/vegetable_oil.jpg"
                //   }
                // ]}
                // /> */}
                {/* // <br /> */}
              </div>
            </div>

          </div>
        </div>
      );
    }
    return (
      <div>
        <div id="title">
          <b>Suggested Meals</b>
        </div>
        <div className="container">
          {/* <div className="row"> */}
            {items}
            {/* </div> */}

        </div>
      </div>
    )
  };
}

export default ViewSuggestedMeals;

const containerStyle = {
  //font: "50px",
  display: "inline-block",
  width: "100%",
  height: "100%"
};

