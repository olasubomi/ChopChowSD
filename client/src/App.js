import React, { Component } from 'react'; 
import {Typeahead} from 'react-bootstrap-typeahead';
// import ListedMealsSection from './components/mealMenu/ListedMealsSection';
// import RecipeContentSection from './components/mealMenu/RecipeContentSection';
// import IngredientSection from './components/mealMenu/IngredientSection';
import {Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
import { Popover, PopoverBody } from 'reactstrap';
import Popup from "reactjs-popup";
import { Link, Route, Switch, withRouter } from "react-router-dom";
// import InfiniteCarousel from 'react-leaf-carousel';
// import CarouselSlider from './components/product_slider/carousel_slider';
// import WithScrollbar from './components/product_slider/WithScrollbar';


// import RecipeContentSection from './components/mealMenu/RecipeContentSection';
// import ListedMealsSection from './components/mealMenu/ListedMealsSection';
// import IngredientSection from './components/mealMenu/IngredientSection';
// import ProductsSection from './components/productSection/ProductsPage';
//import Collapse from 'react-bootstrap/Collapse';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {

    // Mongo 
    products = [];

    constructor(props){
        super(props);
        this.suggestMealToggle = this.suggestMealToggle.bind(this);
        this.updateInstructionsDisplayBaseIndex = this.updateInstructionsDisplayBaseIndex.bind(this);
        // this.myFunction = this.myFunction.bind(this);

        this.state={
            suggestMealPopOver: false,
            mealsListed : false,
            mealSelected : false,
            IngredientsListed : false,
            recipes: this.meals, //[this.Garri, this.Jollof_Rice],
            selectedMealIngredients: this.meals[0].new_ingredients,
            selectedMeal: this.meals[0],
            showIngredients:{
                hidden: true
            },
            showProducts:{
                hidden: true
            },
            //open: false,

            mealsLength : this.meals.length,
            base_index : 0,
            topNav_className: "w3-bar w3-dark-grey w3-green topnav"
        }
    }

    meal_popups  = [];

    componentDidMount(){
        console.log("Comes in apps component did mount")
        var url = "http://localhost:5000/get_products"
         fetch(url)
            .then(res => res.text())
            .then(body => {
                var productsList = JSON.parse(body);

                 for(var i = 0 ; i < productsList.length; i++){
                    this.products.push(productsList[i].product_name);
                    // console.log(productsList[i].product_name)
                }
            })
            .catch(err =>{
                console.log(err);
            });
    }

    showIngredients=(event)=>{
        let mealString = event.target.innerText;
        console.log(mealString);

        var meal;
        for (meal in this.meals){
            //console.log(this.meals[meal].label);
            if (this.meals[meal].label === mealString){
            //change selected ingredients
                this.setState({selectedMealIngredients: this.meals[meal].ingredients});
                this.setState({selectedMeal: this.meals[meal]});
                break;
            }
        }
        //get list of ingredients
    }

    suggestMealToggle() {
        this.setState({
            suggestMealPopOver: !this.state.suggestMealPopOver
        });
    }

    meal_popups  = [];
    
    componentDidMount(){
        console.log("Comes in component did mount")
        var url = "http://localhost:5000/get_products"
        // var url = "https://chopchowsd.herokuapp.com/get_products" // call in production

        fetch(url)
            .then(res => res.text())
            .then(body => {
                console.log()
                var productsList = JSON.parse(body)
                for(var i = 0 ; i < productsList.length; i++){
                    this.products.push(productsList[i].product_name);
                    console.log(productsList[i].product_name)
                }
            })
            .catch(error =>{
                console.log(error);
            });
    }
      
    showIngredient(index){
        console.log("updating popup boolean");
        this.meal_popups[index] = !this.meal_popups[index]
    }

    updateInstructionsDisplayBaseIndex(event){
        console.log(event.target.innerText);
        var button = event.target.innerText;
        var regExp = '/^w+[ ]/d  $/';
        var slide_index = button.match(regExp);
        //console.log(slide_index);
        var last_chars = button.slice(6,7);

        var slide_num = Number(last_chars);

        this.setState({base_index: slide_num*3})
        //var base_index = slide_num*3;
        //console.log("Updating base index on click to: " +this.state.base_index);
    }
  


    render() {
        // Render your page inside
        // the layout provider
        //const elements = ['one', 'two', 'three'];
        //const popOverInfo = []
        const items = []



        for (const [index, value] of this.meals.entries()) {
            //console.log();
            var base_index = 0;
            const mealPrep = value.instructions.map((step)=> <li key={step} > {step} </li>);
            var popUpSlides = [];

             const instructionsLength = value.instructions.length;
             //console.log(instructionsLength);

            // var mealIngredient = value.ingredients ;
            const ingredientsList = value.ingredients.map((step)=> <li key={step} > {step} </li>);
            var i;
            for (i = 0; i < instructionsLength/3; i++) { 
                popUpSlides.push(<button key={i} onClick={this.updateInstructionsDisplayBaseIndex}>Slide {i}  </button>)
              }
            this.meal_popups.push(false);
            // console.log(this.meal_popups);
            // console.log(index);
            items.push(
                <div className="col-sm-12 col-md-6 col-lg-4 mealContainer"  key = {value.id} >
                    <div>
                        <div style={containerStyle} onClick={()=>{
                                this.meal_popups[index] = !this.meal_popups[index];
                                // console.log(this.meal_popups);
                                var x = document.getElementById(value.id);
                                var y = document.getElementById(value.id+"products")

                                if(this.meal_popups[index]){
                                    x.style.display = "block";
                                    y.style.display = "block";

                                }
                                else{
                                    x.style.display = "none";
                                    y.style.display = "none";
                                }
                                }}>
                            <img src={value.imageSrc} className="images" style={{width:"100%"}} alt={value.id}></img>
                            {/* <img src={value.imageSrc} className="images" style={{width:"100%"}} alt={value.id} onClick={this.showIngredient(index)}></img> */}
                            <div style={{color: "black"}}> <b> {value.label} | {value.cookTime}  </b>| <span style={{color:"grey"}}> View Details</span></div>
                        </div>
                    </div>
                <Popup
                    trigger={
                        <div id = {value.id} style={{ display:"none"}}>
                        {value.intro}
                        <br></br>
                        <br></br>
                        <button style={{backgroundColor: "orange" }}>View Steps</button>  
                        <br></br>                           
                        
           </div> 
                    } modal closeOnDocumentClick contentStyle={contentStyle}> 

                    {/* Inside Pop - up */}
                    
                    <div className="container ">
                        <div className="row">
                            <div className="col-sm-6">
                                <div><b>Ingredients</b></div>
                                <div className="col align-items-center"><ol>{ingredientsList}</ol></div>
                            </div>
                            <div className="col-sm-6"><b>
                                <div className="col">{value.readTime}<br></br>{value.cookTime}</div>
                                {/* <div className="col"></div> */}
                                </b>
                            </div> 
                            <div id= "mealPrepChunk">
                            {mealPrep[this.state.base_index+0]}
                            {mealPrep[this.state.base_index+1]}
                            {mealPrep[this.state.base_index+2]}
                            </div>
                        </div>
                        <br></br>
                        {/* <div className="row">
                            <div className="col-sm-12">
                                <img src={value.imageSrc} alt='info' style={{ width:"100%", height:"100%", align:"center"}}></img>
                            </div>
                        </div> */}
                    </div>
                    <hr></hr>

                    <span>Overview</span>&nbsp;|&nbsp;<span>Kitchen accessories for this meal</span>&nbsp;|&nbsp;<span>Add To Cart..</span>
                    <br></br>
                    {popUpSlides}
                    <img src={value.imageSrc} alt='info' style={{ width:"100%", height:"100%", align:"center"}}></img>
                    <hr></hr>
                    {/* <div className="col">
                        <div className="col align-items-center"><ol>{mealPrep}</ol></div>
                    </div> */}
                            
                    {/* </div> */}
                        
                    {/* </div> */}
                    {/* <div>
                    <div className="col align-items-left">
                        <img src={value.imageSrc} alt='info'  style={{width:'35%', height:'35%', align:"center"}}></img>
                    </div>
                    <div>                            
                        <div className="col align-items-center"><ol>{mealPrep}</ol></div>
                    </div>
                    </div>
                    */}
                 </Popup>
                 <div id = {value.id+"products"} style={{ display:"none"}}> 
                 <b>Ingredients 1</b>
                        <br></br>
                        {value.products}
                        {/* <WithScrollbar products={value.product_slider} ingredients={[{"name": "sugar","image": "/images/products/sugar.jpeg"}, {"name": "onion","image": "/images/products/onion.jpg"}, {"name": "tomato","image": "/images/products/tomato.jpg"}, {"name": "water","image": "/images/products/water.jpeg"}, {"name": "vegetable oil","image": "/images/products/vegetable_oil.jpg"}]}/> */}
                        scrollbar
                        <br/>
                        
                </div>
</div>
            )
        }
    
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
    function myFunction() {
        var x = document.getElementById("mobileNavbar");
        console.log(x);
        // console.log({this.state.topNav_className});
        if (x.className === "mobileNavbar" ){
          x.className += " visible";
        }
        else {
          x.className = "mobileNavbar";
        }

        // var y = document.getElementById("myTopnav2");
        // if (y.className === "topnav"){
        //     y.className += " responsive";
        //   }
        //   else{
        //       //sync test nav bar as well
        //       y.className = "topnav";
        //   }
    }


        return (
            <div>
                {/* <div> */}
               
{/* <div className={this.state.topNav_className} id="myTopnav"> */}


<nav class="navbar navbar-expand-md fixed-top-sm justify-content-start flex-nowrap  navbar-light " style={{backgroundColor:"#FFFFFF",borderBottom:"1px solid #fd7e14"}}>
    
    <Link to="/" className="navbar-brand">CHOP CHOW</Link>
    <ul class="navbar-nav flex-row navbar-first" >
        <li class="nav-item">
            <form className="form-inline" style={{padding:"14px 16px"}}>
                <div className="input-group">
                    <input className="form-control" placeholder="Search meal or category"/>
                    <span className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" style={{backgroundColor:"#fd7e14",borderColor:"#fd7e14"}}>
                            <i className="fa fa-search" style={{color:"#FFFFFF"}}></i>
                        </button>
                    </span>
                </div>
               
            </form>
        </li>
        <li class="nav-item" >
            
            <Link to="/grocery" className="nav-link px-2">Login / Register</Link>
        </li>
        <li class="nav-item"  >
            <Link to="/list" className="nav-link px-2">Grocery List</Link>
        </li>
        <li class="nav-item"  >
            <Link to="/products" className="nav-link px-2">Shopping Cart</Link>
            
        </li>
    </ul>
    <Link to="#" className="icon navbar-toggle" onClick={()=>{console.log("Comes thru here"); myFunction()}} >
        <i className="fa fa-bars" style={{color:"#AAAAAA",right:"1%"}}></i>
    </Link>
</nav>
<div className="mobileNavbar" id="mobileNavbar" style={{display:"none"}}>
    <div className="mobileNavbar-menu">
        <ul className="navbar-nav">
            <li style={{padding:"14px 16px",borderBottom:"1px solid #FFFFFF"}}>
                <form className="form-inline" style={{padding:"14px 16px"}}>
                    <div className="input-group">
                        <input className="form-control" placeholder="Search meal or category" style={{backgroundColor:"#fd7e14",border:"1px solid #FFFFFF",width:"80%"}}/>
                        <span className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" style={{backgroundColor:"#FFFFFF",borderColor:"#fd7e14"}}>
                                <i className="fa fa-search" style={{color:"#fd7e14"}}></i>
                            </button>
                        </span>
                    </div>
                </form>
            </li>
            <li class="nav-item" style={{padding:"14px 16px"}} >
                <Link to="/grocery" className="nav-link px-2" style={{color:"#FFFFFF"}}>Login / Register</Link>
            </li>
            <li class="nav-item" style={{padding:"14px 16px"}}>
                <a class="nav-link px-2" href="#" style={{color:"#FFFFFF"}}>Wishlist</a>
            </li>
            <li class="nav-item" style={{padding:"14px 16px",borderBottom:"1px solid #FFFFFF"}}>
                
                <Link to="/products" className="nav-link px-2" style={{color:"#FFFFFF"}}>Shopping Cart</Link>
            </li>
            <li class="nav-item" style={{padding:"14px 16px"}}>
                <Link to="/v2" className="nav-link px-2" style={{color:"#FFFFFF"}}> Receipes</Link>
            </li>
            <li class="nav-item" style={{padding:"14px 16px"}}>
                <Link to="/grocery" className="nav-link px-2" style={{color:"#FFFFFF"}}>Grocery List</Link>
            </li>
            <li class="nav-item" style={{padding:"14px 16px"}}>
                <Link to="/products" className="nav-link px-2" style={{color:"#FFFFFF"}}>Products</Link>
            </li>
            <li class="nav-item" style={{padding:"14px 16px",borderBottom:"1px solid #FFFFFF"}}>
                <a class="nav-link px-2" href="#" style={{color:"#FFFFFF"}}>Stats</a>
            </li>
        </ul>
    </div>
</div>
<nav class="navbar navbar-expand-md  navbar-light navbar-second"  style={{backgroundColor:"#EEEEEE"}}>
    <div class="navbar-collapse collapse pt-2 pt-md-0" id="navbar2">
        <ul class="navbar-nav">
            <li class="nav-item active" style={{marginRight:"50%"}}>
                <Link to="/v2" className="nav-link px-2">Home</Link>
            </li>
            <li class="nav-item"  style={{marginRight:"50%"}}>
                <Link to="/products" className="nav-link px-2">Products</Link>
            </li>
            <li class="nav-item"  style={{marginRight:"50%"}}> 
                <Link to="/v2" className="nav-link px-2">Receipes</Link>
            </li>
        </ul>
    </div>
</nav>

{/* <div className="topnav" id="myTopnav2">
    <Link to="/">CC</Link>
    <Link to="/">Recipes</Link>

    <div className="dropdown">
        <button className="dropbtn"> 
            Shop <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
            <Link to="/products">Food Products</Link>
            <Link to="/products">Kitchen Products</Link>
            <Link to="/products">Other Household Items</Link>
        </div>
    </div>

    <Link to="/v1">Stats</Link>
    <Link to="javascript:void(0);" className="icon" onClick={()=>{console.log("Comes thru here"); myFunction()}} >
    <i className="fa fa-bars" ></i>
    </Link>
</div> */}

<Typeahead options={this.products}
placeholder="Find Meals (and Ingredients) here.."
id="typeahead"
// onChange={(selected) => {
//     // Handle selections...
//   }}
filterBy={['product_name']}
/>


    
<Switch>
    <Route exact path="/" render={(props)=>(
        <div>
        <div id="title">
            <b>Meals</b>
            </div>

        <div className="container">
            <div className="row">
                {items} 
            </div>
        </div>
    </div>
    )}/>

    <Route path="/v1" render={(props)=>(
        <div className="container">
        <br></br>
        <div className="row">
            {/* <div className="col-sm">
                <b>Meals</b>
                <ListedMealsSection 
                recipes={this.state.recipes} showIngredients={this.showIngredients}
                selectedMeal={this.state.selectedMeal}/>
                <span>&#43;</span><input placeholder="Suggest Meal"></input> 
                
                &nbsp;<button>Submit <span id="Popover1" onMouseOver={this.suggestMealToggle} onMouseOut={this.suggestMealToggle} >
                <img src="/images/info_icon.png" alt="info" style={{width:'13px', height:'13px'}}/> </span></button>
                </div>                     
            <div className="col-sm">
                <b>Recipe Contents</b>
                <RecipeContentSection selectedMeal= {this.state.selectedMeal}/>
                
            </div> */}

             {/* <div className="col-sm">
                <b>Ingredients</b>
                <IngredientSection selectedMealIngredients= {this.state.selectedMealIngredients}
                selectedMeal= {this.state.selectedMeal}/>
            </div>  */}
            
            <Popover placement="auto" isOpen={this.state.suggestMealPopOver} target="Popover1" toggle={this.suggestMealToggle}>
                <PopoverBody><div className="payback-disclaimer">
                Suggestions by Guest Users are recorded, but do not change the publicly displayed Meals.
                </div></PopoverBody>
            </Popover>
        </div>
    </div>
    )}/>

    <Route path="/v2" render={(props)=>(
    <div>
        <div id="title">
            <b>Meals</b>
            </div>

        <div className="container">
            <div className="row">
                {items} 
            </div>
        </div>
    </div>
    )}/>

    <Route path="/grocery" render={(props)=>(
        // <RecipeContentSection selectedMeal= {this.state.selectedMeal}/>
        <div>
            <div><b>Your Grocery List</b></div>
            <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="false"></div>
        </div>
        
    )}/>

    <Route path="/products" render={(props)=>(
            // <ProductsSection /> 
           <div>ProductsSection</div> 
    )}/>
    </Switch>


{/* <div className="row">
    <div className="col-sm">
        <b>Meals</b>
        <ListedMealsSection 
        recipes={this.state.recipes} showIngredients={this.showIngredients}
        selectedMeal={this.state.selectedMeal}/>
        
        

        </div>                     
    <div className="col-sm">
        <b>Recipe Contents</b>
        <RecipeContentSection selectedMeal= {this.state.selectedMeal}/>
        
    </div>

    <div className="col-sm">
        <b>Ingredients</b>
        <IngredientSection selectedMealIngredients= {this.state.selectedMealIngredients}
        selectedMeal= {this.state.selectedMeal}/>
    </div>
    
    
</div> */}
</div>
        );
    }


    meals = [
      {
          id: 1,
          label: "Garri",
          imageSrc: '/images/meal_pics/Garri.jpg',
          readTime: "2 mins read",
          cookTime: "2 mins to prepare",
          intro: "Garri (African cereal) is a populous snack-meal in Western African region. "+
          "It is made from cassava and can be drink by soaking in cold water or eaten as meal by soaking in hot water till its solid.",
          ingredients: ["Garri", "Water", "Sugar"],
          new_ingredient:{
              "Garri":{
              servings:{
                  quantitiy: 1,
                  measurements: "Cup(s)"
              }},
              "Water":{
              servings:{
                  quantitiy: 1,
                  measurements: "Cup(s)"
              }},
              "Sugar":{
                  servings:{
                      quantitiy: 1,
                      measurements: "Spoon(s)"
                  }}
            
          },
          products: ["Garri ", "Sugar ", "Water " ],
          product_slider: [{ingredient: "Garri", image: "garri.jpg"}, {ingredient: "Sugar", image: "sugar.jpeg"}, {ingredient: "Water", image: "water.jpeg"}],
          quantity:[1,2,1],
          measurements:["Cup(s)","Cup(s)","Spoon(s)"],
          instructions: ["Mix Garri and Sugar in a bowl", "Add ice, water and groundnuts as preffered", "Enjoy!"],
          servings: 1,
          display: false
      },
      {
          id: 2,
          label: "Puff Puff",
          imageSrc: '/images/meal_pics/puff_puff1.jpg',
          readTime: "4 mins read",
          cookTime: "80  mins to prepare",
          intro: " Puff Puff -- A very popular West African street food that's quick and easy to make with different variations."+
          " Dangerously delicious and addicting!",
          ingredients: ["Water- 2 Cups", "Yeast - 2 and 1/4 teaspoons(1 packet)", "Flour- 3 and 1/2 Cups", "Sugar- 3/4 Cup"],
          new_ingredient:{
              "Garri":{
              servings:{
                  quantitiy: 1,
                  measurements: "Cup(s)"
              }},
              "Water":{
              servings:{
                  quantitiy: 1,
                  measurements: "Cup(s)"
              }},
              "Sugar":{
                  servings:{
                      quantitiy: 1,
                      measurements: "Spoon(s)"
                  }}
            
          },
          products: ["Flour ", "Sugar ", "Yeast ", "Water "],
          product_slider: [{ingredient: "Flour", image: "flour.jpg"}, {ingredient: "Sugar", image: "sugar.jpeg"}, {ingredient: "Yeast", image: "yeast.jpg"}, {ingredient: "Water", image: "water.jpeg"}],
          quantity:[1,2,1],
          measurements:["Cup(s)","Cup(s)","Spoon(s)"],
          instructions: ["Mix salt, sugar, water, and yeast . Set aside for 5 minutes.",
"Add flour and mix.",
"Let the mixture rise for approximately 1- 2 hours",
"In a large,sauce pan pour vegetable oil into a pot, until it is at least 3 inches (or about 5 centimeters) high (too little will result in flatter balls), and place on low heat.",
"Test to make sure the oil is hot enough by putting a ‘drop’ of batter into the oil. If it is not hot enough, the batter will stay at the bottom of the pot rather than rising to the top.",
"Using your hands grab a little bit of mixture at time and drop in the oil.",
"When the oil is hot enough, use a spoon to dish up the batter, and another spoon or spatula to drop it in the oil, sort of in the shape of a ball.",
"Fry for a few minutes until the bottom side is golden brown.",
"Turn the ball over and fry for a few more minutes until the other side is golden brown.",
"Use a large spoon or something like that to take it out of the oil. I usually place them on napkins right away to soak up some of the excess oil.",
"If desired, you can roll the finished product in table sugar or powdered sugar to make it sweeter"],
          servings: 4,
          display: false
      }
 ];
}

const containerStyle = {
    //font: "50px",
    display: "inline-block",
    width: "100%",
    height: "100%",
    
}

const contentStyle = {
// borderRadius: "25px",
maxWidth: "100vw",
maxHeight: "100vh",
overflow: "scroll",
width:"80%",
};


/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
// function myFunction() {
//     var x = document.getElementById("myTopnav");
//     console.log("Hello World 2");
//     // if (x.className === "topnav") {
//     //   x.className += " responsive";
//     // } else {
//     //   x.className = "topnav";
//     // }
//   }
  

export default App;

