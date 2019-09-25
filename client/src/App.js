/* eslint-disable no-dupe-class-members */
import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';
// import ListedMealsSection from './components/mealMenu/ListedMealsSection';
// import RecipeContentSection from './components/mealMenu/RecipeContentSection';
// import IngredientSection from './components/mealMenu/IngredientSection';
import { Nav, Navbar, NavDropdown, Form, FormControl } from 'react-bootstrap'
import { Popover, PopoverBody } from 'reactstrap';
import Popup from "reactjs-popup";
import { Link, Route, Switch } from "react-router-dom";
import { Spinner } from 'react-bootstrap'
import InfiniteCarousel from 'react-leaf-carousel';
import Slider from './components/product_slider/slider';
import WithScrollbar from './components/product_slider/WithScrollbar';
import RecipeContentSection from './components/mealMenu/RecipeContentSection';
import ListedMealsSection from './components/mealMenu/ListedMealsSection';
import IngredientSection from './components/mealMenu/IngredientSection';
import ProductsSection from './components/productSection/ProductsPage';
//import Collapse from 'react-bootstrap/Collapse';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CartPage from './components/GroceryPage/CartPage';
import Login from './components/Login';
import GroceryPage from './components/GroceryPage';
class App extends Component {


    meals = [];
    // Mongo 
    products = [];

    constructor(props) {
        super(props);
        this.suggestMealToggle = this.suggestMealToggle.bind(this);
        this.updateInstructionsDisplayBaseIndex = this.updateInstructionsDisplayBaseIndex.bind(this);
        // this.myFunction = this.myFunction.bind(this);

        this.state = {
            showSignup: false,
            itemTypeaheadState: '',
            itemState: '',
            optionState: '',
            nameItem: '',
            valueDataUpdate: '',
            infoCartState: '',
            suggestMealPopOver: false,
            mealsListed: false,
            mealSelected: false,
            IngredientsListed: false,
            recipes: [], //[this.Garri, this.Jollof_Rice],
            selectedMealIngredients: null,
            selectedMeal: null,
            showIngredients: {
                hidden: true
            },
            showProducts: {
                hidden: true
            },
            //open: false,

            mealsLength: null,
            base_index: 0,
            topNav_className: "w3-bar w3-dark-grey w3-green topnav",

            valueAllDataLists: [],
            message: null,
            userInfo: null,
            isAuthenticated: false,
            infoCart: null,
            infoItem: null,
            nameItems: [],
            itemOptionState: [],
            dataTypeahead: ''
        }
    }

    meal_popups = [];

    componentDidMount() {

        this.auth();
        console.log("Comes in apps component did mount")
        var url = "http://localhost:5000/get_products"
        fetch(url)
            .then(res => res.text())
            .then(body => {
                var productsList = JSON.parse(body);

                for (var i = 0; i < productsList.length; i++) {
                    this.products.push(productsList[i].product_name);
                    // console.log(productsList[i].product_name)
                }
            })
            .catch(err => {
                console.log(err);
            });
        // this.setInfoCart = (data) => {
        //     this.setState({ infoCart: data })
        // }

    }

    showIngredients = (event) => {
        let mealString = event.target.innerText;
        console.log(mealString);

        var meal;
        for (meal in this.meals) {
            //console.log(this.meals[meal].label);
            if (this.meals[meal].label === mealString) {
                //change selected ingredients
                this.setState({ selectedMealIngredients: this.meals[meal].ingredients });
                this.setState({ selectedMeal: this.meals[meal] });
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

    meal_popups = [];

    componentDidMount() {
        console.log("Comes in component did mount")
        var url = "http://localhost:5000/get_products"
        var url = "https://chopchowsd.herokuapp.com/get_products" // call in production

        fetch(url)
            .then(res => res.text())
            .then(body => {
                console.log()
                var productsList = JSON.parse(body)
                for (var i = 0; i < productsList.length; i++) {
                    this.products.push(productsList[i].product_name);
                    console.log(productsList[i].product_name)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    showIngredient(index) {
        console.log("updating popup boolean");
        this.meal_popups[index] = !this.meal_popups[index]
    }

    updateInstructionsDisplayBaseIndex(event) {
        console.log(event.target.innerText);
        var button = event.target.innerText;
        var regExp = '/^w+[ ]/d  $/';
        var slide_index = button.match(regExp);
        //console.log(slide_index);
        var last_chars = button.slice(6, 7);

        var slide_num = Number(last_chars);

        this.setState({ base_index: slide_num * 3 })
        //var base_index = slide_num*3;
        //console.log("Updating base index on click to: " +this.state.base_index);
    }



    componentDidMount() {
        fetch('/api/grocery', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
            },
          })
            .then(res => {
      
              return res.json()
      
            })
            .then(response => {
              if (response.success && response.data) {
                  this.setState({ Authentication: true });
              } else {
                this.setState({ Authenticated: false })
              }
              this.setState({ customerId: response.data })
              const { customerId } = this.state;
              fetch(`/api/getList/${customerId}`, {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/json',
                },
      
              })
                .then(res => {
                  return res.json()
                })
                .then(response => {
                  if (response) {//all lists for this customer
                    this.setState({ valueData: response.data })
                  }
      
                }).catch(() => {
                  this.setState({ message: 'Sorry , Internal Server ERROR' })
                })
      
      
            })
      
        this.auth()
        const { valueAllDataLists } = this.state
        fetch('/api/get-all-data-lists', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then(res => res.json())
            .then(response => {
                if (response) {

                    let arrAllData = [];
                    let resArr = response.data
                    console.log(response.data);

                    for (let i = 6; i <= resArr.length - 1; i++) {
                        arrAllData.push(response.data[i].product_name);
                        this.setState({ valueAllDataLists: arrAllData })
                        valueAllDataLists.map(item => {
                            this.setState({ itemState: item })

                        })
                    }
                }
                // }
            }).catch(() => {
                this.setState({ message: 'Sorry , Internal Server ERROR' })
            })


        fetch('/api/get-meals', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(res => res.json())
            .then(response => {
                if (response) {
                    this.setState({ recipes: response.data,
                                    selectedMealIngredients: response.data[0].new_ingredients,
                                    selectedMeal: response.data[0],
                                    mealsLength: response.data.length
                    });
                }
            }).catch(() => {
                this.setState({ message: 'Sorry , Internal Server ERROR' })
            })

        
    }


    auth() {
        fetch('/api/grocery', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res.success);
                if (res.success) {
                    this.setState({ isAuthenticated: true })
                }
            }).catch(er => console.log(er))

    }

    handleLogout = () => {
        fetch('/api/logout', {
            method: "GET",
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json',

            }
        }).then(res => {

            res.json()
                .then(response => {
                    if (response.data) {
                        this.setState({ isAuthenticated: false })
                    }
                })
        })
            .catch(() => {
                this.setState({ message: 'Sorry , Internal Server ERROR' })

            })
    }

    handleInputChange = itemState => {
        console.log('itemTypeahead in fetch', itemState);

        fetch(`/api/get-data-typeahead/${itemState}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                console.log('res', res);

                return res.json()
            })
            .then(response => {
                //  console.log('response for item in typeahead',response);
                this.setState({ dataTypeahead: response.data })

            })
    };
    render() {
        const { itemState, dataTypeahead, valueAllDataLists, isAuthenticated, itemOptionState } = this.state;
        // Render your page inside
        // the layout provider
        //const elements = ['one', 'two', 'three'];
        //const popOverInfo = []
        const items = []



        for (const [index, value] of this.state.recipes.entries()) {
            var base_index = 0;
            const mealPrep = value.instructions.map((step) => <li key={step} > {step} </li>);
            var popUpSlides = [];

            const instructionsLength = value.instructions.length;
            //console.log(instructionsLength);

            // var mealIngredient = value.ingredients ;
            const ingredientsList = value.ingredients.map((step) => <li key={step} > {step} </li>);
            var i;
            for (i = 0; i < instructionsLength / 3; i++) {
                popUpSlides.push(<button key={i} onClick={this.updateInstructionsDisplayBaseIndex}>Slide {i}  </button>)
            }
            this.meal_popups.push(false);
            // console.log(this.meal_popups);
            // console.log(index);
            items.push(
                <>
                    <div className="col-sm-12 col-md-6 col-lg-4 mealContainer" key={value.id} >
                        <div>
                            <div style={containerStyle} onClick={() => {
                                this.meal_popups[index] = !this.meal_popups[index];
                                // console.log(this.meal_popups);
                                var x = document.getElementById(value.id);
                                var y = document.getElementById(value.id + "products")
                                if (this.meal_popups[index]) {
                                    x.style.display = "block";
                                    y.style.display = "block";

                                }
                                else {
                                    x.style.display = "none";
                                    y.style.display = "none";
                                }
                            }}>
                                <img src={value.imageSrc} className="images" style={{ width: "100%" }} alt={value.id}></img>
                                {/* <img src={value.imageSrc} className="images" style={{width:"100%"}} alt={value.id} onClick={this.showIngredient(index)}></img> */}
                                <div style={{ color: "black" }}> <b> {value.label} | {value.cookTime}  </b>| <span style={{ color: "grey" }}> View Details</span></div>
                            </div>
                        </div>
                    </div>

                    <Popup
                        trigger={
                            <div id={value.id} style={{ display: "none" }}>
                                {value.intro}
                                <br></br>
                                <br></br>
                                <button style={{ backgroundColor: "orange" }}>View Steps</button>
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
                                } modal closeOnDocumentClick contentStyle={contentStyle}>
                        </div>
                        </div>
                        {/* Inside Pop - up */}
                        <div className="container">
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
                                <div id="mealPrepChunk">
                                    {mealPrep[this.state.base_index + 0]}
                                    {mealPrep[this.state.base_index + 1]}
                                    {mealPrep[this.state.base_index + 2]}
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
                        <img src={value.imageSrc} alt='info' style={{ width: "100%", height: "100%", align: "center" }}></img>
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
                    <div id={value.id + "products"} style={{ display: "none" }}>
                        <b>Ingredients 1</b>
                        <br></br>
                        {value.products}
                        <WithScrollbar products={value.product_slider} ingredients={[{ "name": "sugar", "image": "/images/products/sugar.jpeg" }, { "name": "onion", "image": "/images/products/onion.jpg" }, { "name": "tomato", "image": "/images/products/tomato.jpg" }, { "name": "water", "image": "/images/products/water.jpeg" }, { "name": "vegetable oil", "image": "/images/products/vegetable_oil.jpg" }]} />
                        <br />

                    </div>
                </>
            )
        }

        /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
        function myFunction() {
            var x = document.getElementById("myTopnav");
            console.log(x);
            // console.log({this.state.topNav_className});
            if (x.className === "w3-bar w3-dark-grey w3-green topnav") {
                x.className += " responsive";
            }
            else {
                x.className = "w3-bar w3-dark-grey w3-green topnav";
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
                <div className="w3-bar w3-dark-grey w3-green topnav" id="myTopnav">
                    {/* <a href="/v2" className="w3-bar-item w3-button w3-text-orange w3-hover-orange w3-mobile">CC</a> */}
                    <Link to="/v2" className="w3-bar-item w3-button w3-text-orange w3-hover-orange w3-mobile">CC</Link>

                    <Link to="/v2" className="w3-bar-item w3-button w3-hover-orange w3-mobile">Recipes</Link>

                    <Link to="/grocery" onClick={this.handleClickGrocery} className="w3-bar-item w3-button w3-hover-orange w3-mobile">Grocery List</Link>


                    <div className="w3-dropdown-hover w3-mobile">
                        <button className="w3-button w3-hover-orange w3-mobile">
                            Shop <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="w3-dropdown-content w3-bar-block w3-card-4 ">
                            <Link to="/products" className="w3-bar-item w3-button w3-text-black w3-hover-orange w3-mobile">Food Products</Link>
                            <Link to="/products" className="w3-bar-item w3-button w3-text-black w3-hover-orange w3-mobile">Kitchen Products</Link>
                            <Link to="/products" className="w3-bar-item w3-button w3-text-black w3-hover-orange w3-mobile">Other Household Items</Link>
                        </div>
                    </div>
                    <Link to="/" className="w3-bar-item w3-button w3-text-grey w3-hover-orange w3-mobile"> Stats</Link>
                    {/* <span onClick={()=>{console.log("Or thru here");myFunction()}} className="icon">
    <i className="fa fa-bars"> an option</i>
    </span> */}
                    <Link to="#" className="icon" onClick={() => { console.log("Comes thru here"); myFunction() }} >
                        <i className="fa fa-bars" ></i>
                    </Link>
                    {isAuthenticated ? (

                        <Link to='/' onClick={this.handleLogout} className="w3-bar-item w3-button w3-hover-orange w3-mobile">Logout</Link>
                    ) : null}

                </div>

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
                {/* // {console.log('valueAllDataLists',valueAllDataLists) */}
                {/* } */}
                {/* {valueAllDataLists.map(optionItem=>{ 
    //   console.log('popoppoop',optionItem);
      let varOptionItem = optionItem
    //   console.log('inside varOptionItem',varOptionItem);
       
    //   this.setState({optionState:optionItem}) 
    // console.log('outside varOptionItem',varOptionItem)
 })
 
}  */}


                {/* <Typeahead
                    onInputChange={this.handleInputChange(itemState)}
                    options={valueAllDataLists}
                    // filterBy={nameItems}
                    placeholder="Find Meals (and Ingredients) here.."
                    valueKey="id"
                    labelKey="name"
                    selected={valueAllDataLists}
                    id={`auto${itemState}`}
                    ref="typeahead"
                /> */}
                {/* <button onClick={() =>{

    this.refs.typeahead.getInstance().blur
    } }>
  Clear Typeahead
</button> */}


                <Switch>
                    <Route
                        exact
                        path="/login"
                        render={props => (
                            <Login {...props} />
                        )}
                    />
                    
                    <Route exact path="/" render={(props) => (
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
                    )} />

                    <Route path="/v1" render={(props) => (
                        <div className="container">
                            <br></br>
                            <div className="row">
                                <div className="col-sm">
                                    <b>Meals</b>
                                    <ListedMealsSection
                                        recipes={this.state.recipes} showIngredients={this.showIngredients}
                                        selectedMeal={this.state.selectedMeal} />
                                    <span>&#43;</span><input placeholder="Suggest Meal"></input>

                                    &nbsp;<button>Submit <span id="Popover1" onMouseOver={this.suggestMealToggle} onMouseOut={this.suggestMealToggle} >
                                        <img src="/images/info_icon.png" alt="info" style={{ width: '13px', height: '13px' }} /> </span></button>
                                    {/* onClick={this.suggestMealToggle} */}
                                </div>
                                <div className="col-sm">
                                    <b>Recipe Contents</b>
                                    <RecipeContentSection selectedMeal={this.state.selectedMeal} />

                                </div>

                                <div className="col-sm">
                                    <b>Ingredients</b>
                                    <IngredientSection selectedMealIngredients={this.state.selectedMealIngredients}
                                        selectedMeal={this.state.selectedMeal} />
                                    {/* <span>&#43;</span><input placeholder="Suggest Ingredient.."></input> */}
                                </div>

                                <Popover placement="auto" isOpen={this.state.suggestMealPopOver} target="Popover1" toggle={this.suggestMealToggle}>
                                    <PopoverBody><div className="payback-disclaimer">
                                        Suggestions by Guest Users are recorded, but do not change the publicly displayed Meals.
                </div></PopoverBody>
                                </Popover>
                            </div>
                        </div>
                    )} />

                    <Route path="/v2" render={(props) => (
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
                    )} />



                    <Route
                        exact
                        path="/grocery"
                        render={props => (
                            <GroceryPage
                                auth={isAuthenticated}
                                infoItemOption={itemOptionState}
                                dataTypeaheadProps={dataTypeahead}
                            />

                        )}

                    />

                    )}

                />
                    <Route
                        path='/test'
                        render={() =>

                            // valueDataUpdate.forEach(infoCart => {
                            //         let idItem = infoCart.id;
                            // })    

                            // valueDataUpdate.map((itemList) => {
                            //     let idItem = itemList.id;
                            //     return <>

                            //     {console.log('infooooo',idItem)}
                            //     </>
                            // })




                            <h1>this is the component</h1>
                            // <div className='yourlist__card-text-add'>No.List>>{infoCart.id}>></div>
                            // <div className='yourlist__card-text-add'>Name Product : {valueDataUpdate.map(item=>{
                            // item
                            // })}</div>
                            // <div className='yourlist__card-text-add'> Product Price :  {infoCart.product_price}</div>
                            // <div className='yourlist__card-text-add'> Product Size : {infoCart.sizes}</div>

                        }

                    />
                    <Route
                        exact
                        path="/grocery-empty"
                        render={props => (

                            <span className="grocery-page-empty__message">Sorry you must make log in to seen grocery list </span>



                        )} />
                    <Route
                        exact
                        path="/cart-page/:idItem"
                        component={CartPage}

                    />
                    <Route path="/products" render={(props) => (
                        <ProductsSection />
                    )} />
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
    width: "80%",
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

