import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
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

import RecipeContentSection from './components/mealMenu/RecipeContentSection';
import ListedMealsSection from './components/mealMenu/ListedMealsSection';
import IngredientSection from './components/mealMenu/IngredientSection';
import ProductsSection from './components/productSection/ProductsPage';
//import Collapse from 'react-bootstrap/Collapse';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/Login';
import GroceryPage from './components/GroceryPage';
class App extends Component {


    meals = [
        {
            id: 1,
            label: "Garri",
            imageSrc: '/images/meal_pics/Garri.jpg',
            readTime: "2 mins read",
            cookTime: "2 mins to prepare",
            intro: "Garri (African cereal) is a populous snack-meal in Western African region. " +
                "It is made from cassava and can be drink by soaking in cold water or eaten as meal by soaking in hot water till its solid.",
            ingredients: ["Garri", "Water", "Sugar"],
            new_ingredient: {
                "Garri": {
                    servings: {
                        quantitiy: 1,
                        measurements: "Cup(s)"
                    }
                },
                "Water": {
                    servings: {
                        quantitiy: 1,
                        measurements: "Cup(s)"
                    }
                },
                "Sugar": {
                    servings: {
                        quantitiy: 1,
                        measurements: "Spoon(s)"
                    }
                }

            },
            products: ["Garri ", "Sugar ", "Water "],
            quantity: [1, 2, 1],
            measurements: ["Cup(s)", "Cup(s)", "Spoon(s)"],
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
            intro: " Puff Puff -- A very popular West African street food that's quick and easy to make with different variations." +
                " Dangerously delicious and addicting!",
            ingredients: ["Water- 2 Cups", "Yeast - 2 and 1/4 teaspoons(1 packet)", "Flour- 3 and 1/2 Cups", "Sugar- 3/4 Cup"],
            new_ingredient: {
                "Garri": {
                    servings: {
                        quantitiy: 1,
                        measurements: "Cup(s)"
                    }
                },
                "Water": {
                    servings: {
                        quantitiy: 1,
                        measurements: "Cup(s)"
                    }
                },
                "Sugar": {
                    servings: {
                        quantitiy: 1,
                        measurements: "Spoon(s)"
                    }
                }

            },
            products: ["Flour ", "Sugar ", "Yeast ", "Water "],
            quantity: [1, 2, 1],
            measurements: ["Cup(s)", "Cup(s)", "Spoon(s)"],
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
        },
        {
            id: 3,
            label: "Jollof Rice",
            imageSrc: "/images/meal_pics/Jollof.jpg",
            readTime: "4 mins read",
            cookTime: "45 mins to prepare",
            intro: "Jollof rice is a common delicacy that is enjoyed in the Western Africa region." +
                "Jollof rice a.k.a “One pot” in Benachin, is a delicious delicacy that can be enjoyed without the need of a side-dish. " +
                " Jollof rice is a good source for carbohydrate, starch, fibers and traces of protein depending on the in the ingredients. " +
                "Cooking jollof rice is often considered as a work of art due to the many styles and techniques and taste as good as next day left-over. " +
                "Chop-Chow guarantees one of the best methods in Cooking Jollof rice. Chow!",
            ingredients: ["Rice- 3 Cups", "Tomatoes x 6", "Onion x 2"],
            products: ["Rice ", "Tomatoes ", "Onions "],
            instructions: ["Tomato , Onion Tatashe, Rodo Blended in Blender",
                "Vegetable Oil, Low Heat in Pan",
                "Add onions to Pan", "Add Tomato Paste", "Add Powdered Ginger, Garlic and Curry",
                "Add Blended Tomatoes mix (If too thick, add water)", "Add seasoning, Maggi (Chicken Flavor), Salt",
                "For Jollof Rice, add Bay Leaves."],
            display: true
        },
        {
            id: 4,
            label: "Fried Beans",
            imageSrc: "/images/meal_pics/Fried_beans_w_red_oil_plate.jpg",
            readTime: "4 mins read",
            cookTime: "60 mins to prepare",
            intro: "Fried beans is a delicious meal rich in protein, vitamins and fiber." +
                " It can serves as alternative for those trying to reduce the intake of meat and animal protein.",
            ingredients: ["Black Eyed Beans x 1 bag(350mL)", "Onions x 2", "Palm Oil- 2 Cups"],
            products: ["Black Eyed Beans ", "Onions ", "Palm Oil "],
            instructions: ["Soak beans in water overnight", "The next day, chop 1 onion into thin slices, cut the other one into 4 big chunks then pound/grind the pepper.",
                "Rinse the beans and put in a sizeable pot. I rinse it twice.",
                "Pre-cook the sliced onions with a few drops of water to soften them a bit.", "When the beans is done, add salt, leave to dry up all the water and transfer the beans to another container.",
                "Now, set a dry clean pot on the stove, pour the palm oil and heat it up till the oil melts (if congealed). Note that you should only heat it up, not bleach the oil. You will know it is hot enough when a piece of onion dropped into the oil sizzles.",
                "Add the precooked onions and stir for a bit.", "Add the ground Habanero pepper and stir till everything is heated up very well, at most 2 minutes.", "Add the beans and stir for about 2 minutes. Add salt if necessary.",
                "Cover and leave to simmer for about 2 minutes and it's done."],
            display: true
        },
        {
            id: 5,
            label: "Roasted Potatoes",
            imageSrc: "/images/meal_pics/roasted_potatoes.jpg",
            readTime: "3 mins read",
            cookTime: "90 mins to prepare",
            intro: "Delicious Red Roasted Potatoes. Popular in European dishes",
            ingredients: ["Potatoes - 8", "Garlic- 6 cloves", "Thyme", "Oregano", "Basil", "Parmesan Cheese", "Oil", "Butter"],
            products: ["Red Potatoes ", "Parmesan Cheese ", "Thyme ", "Oregano ", "Basil ", "Vegetable Oil ", "Butter "],
            instructions: ["Adjust oven rack to lowest position and heat oven to 450 degrees. ", "Cut potatoes into quarter chunks",
                "Toss potatoes with oil, salt and pepper chopped garlic, Thyme, Oregano, Basil and then Parmesan Cheese",
                "Arrange, cut side down, on a large lipped cookie sheet or jellyroll pan.", "Roast until tender and golden brown, or until desired crispiness about 30-45 minutes", "Add butter in between roasting for a savory taste, Transfer to a serving dish when ready."],
            display: true
        },
        {
            id: 6,
            label: "Beans Burger",
            imageSrc: "/images/meal_pics/bean_burger.jpg",
            readTime: "8 mins read",
            cookTime: "40 mins to prepare",
            intro: "A healthy replacement for beef burgers, Beans burgers is just as filling and can be even more delicious.",
            ingredients: ["2 cans black beans", "1/2 bell pepper", "1 large onion", "6 garlic cloves", "1 cup breadcrumbs", "3 eggs (or more)", "Paprika", "Cumin", "Garlic powder", "½ cup cheese", "1 tbsp worcestershire sauce", "2 tbsp ketchup or bbq sauce"],
            products: ["Black Beans", "Vegetable Oil", "BreadCrumbs", "Paprika", "Cheese", "Worcestershire Wauce", "BBQ Sauce", "Heinz Ketchup"],
            instructions: ["Drain and rinse beans and lay out on a baking tray in a single layer. Bake 325F for 15 min, while you set up the rest.",
                "Dice the onion, garlic and pepper as finely as you can. Fry them together with a very small amount of oil, until onions start to go clear.",
                "Blot the onion mix with a paper towel to remove excess oil and moisture. Add to a large mixing bowl with the beans and all other ingredients.",
                "Mix ingredients together and mash with a fork. If the mix does not form solid patties, add more eggs and breadcrumbs until it is more solid. These 2 ingredients are the binding agents.",
                "Form patties with the mix. I typically make them ½ cup size each. For a more tasty version, try adding a layer of cheese in between 2 smaller patties.",
                "Cook by frying around 5 mins on each side, or grill or bake at medium heat for about 10 minutes on each side. Any remaining burgers can be frozen in sandwich bags and cooked another time without any loss of flavour. You don’t need to wait for the burgers to thaw before cooking.",
                "Serve in a bun with toppings and sauces of your choice."],
            display: true
        },
        {
            id: 7,
            label: "Egusi Stew",
            imageSrc: "/images/meal_pics/image_coming_soon.png",
            readTime: "5 mins read",
            cookTime: "40 mins to prepare",
            intro: "A classic west African delicious stew that can be customized to your taste. Egusi can be eaten with varieties of meal like rice, amala and eba.",
            ingredients: ["Melon Seeds - 3 Cups", "Palm Oil", "Chicken/Beef", "Spinach - 1", "Bell Pepper - 1", "Tomatoes - 3", "Onion - 1", "Maggi", "Salt", "Stockfish", "Crayfish", "Assorted meats"],
            products: ["Melon Seeds", "Palm Oil", "Chicken/Beef", "Spinach", "Bell Pepper", "Tomatoes", "Onion", "Maggi", "Salt", "Stockfish", "Crayfish", "Assorted meats"],
            instructions: ["Boil chicken/meat and keep aside the liquid broth for later use", "Pour 3 cups of powder melon seed into a bowl", "Pour 2 cups of water and mix into a thick paste",
                "Pour desired amount of stock fish and crayfish into a bowl and add hot water to soften", "Add 1 bell pepper, 3 tomatoes and half onion into blender and blend", "Pour a small amount of palm oil and half onion diced into a cooking pot",
                "Let it sizzle for a minute, then add the blended mixture", " Cook for 10 minutes, then add chicken or meat broth", "Cook for additional 5 minutes ",
                "Add the powdered melon seed in paste form and stir continuously (Reduce the heat to avoid burning)", "Add 2 maggi and a sprinkle of salt, then cook for 7 mins", "Add a box of chopped spinach and stir",
                "Add the stock fish and crayfish", "Add 1 maggi (Taste often for desired level of seasoning)", "Cook for additional 10 minutes"],
            display: true
        },
        {
            id: 8,
            label: "Egg Stew",
            imageSrc: "/images/meal_pics/image_coming_soon.png",
            readTime: "5 mins read",
            cookTime: "30 mins to prepare",
            intro: "Egg stew is a creative modern style of frying eggs and insanely delicious, easy to make. Watch out, you might find this meal addictive.",
            ingredients: ["Eggs -3 uncooked", "Tomatoes - 3", "Onions - 1", "Oil", "Maggi - 2 cubes", "Salt", "Shrimp", "Sardine"],
            products: ["Eggs", "Tomatoes", "Onions", "Oil", "Maggi", "Salt", "Shrimp", "Sardine"],
            instructions: ["Add 3 tomatoes and ½ onion into blender and blend", "Crack 3 eggs into a bowl, plus 1 maggi and a little sprinkle of salt, then mix well ", "Add a small amount of cooking oil into frying pan",
                "Add ½ diced onion and let it fry for about a minute ", "Add your choice of secondary ingredients", "Let it cook for 5 mins", " Add the blended mixture, plus 1 maggi", "Let it cook for another 5 mins (Taste often for desired level of seasoning",
                "Pour the egg mixture into the fry pan and stir often ", "Let it cook for about 7 mins (stir often)"
            ],
            display: true
        },

    ]
    // Mongo 
    products = [];

    constructor(props) {
        super(props);
        this.suggestMealToggle = this.suggestMealToggle.bind(this);
        this.updateInstructionsDisplayBaseIndex = this.updateInstructionsDisplayBaseIndex.bind(this);
        // this.myFunction = this.myFunction.bind(this);

        this.state = {
            suggestMealPopOver: false,
            mealsListed: false,
            mealSelected: false,
            IngredientsListed: false,
            recipes: this.meals, //[this.Garri, this.Jollof_Rice],
            selectedMealIngredients: this.meals[0].new_ingredients,
            selectedMeal: this.meals[0],
            showIngredients: {
                hidden: true
            },
            showProducts: {
                hidden: true
            },
            //open: false,

            mealsLength: this.meals.length,
            base_index: 0,
            topNav_className: "w3-bar w3-dark-grey w3-green topnav",
            
            valueAllDataLists: [],
            message: null,
            userInfo:null,
            isAuthenticated:false
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
         this.auth()
        fetch('/api/get-all-data-lists', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(res => res.json())
            .then(response => {
                if (response) {
                    let arrAllData =[];
                    for (let i = 15; i <= 29; i++) {
                        arrAllData.push(response.data[i].product_name);
                        this.setState({ valueAllDataLists: arrAllData })
                    }
                }
            }).catch(() => {
                this.setState({ message: 'Sorry , Internal Server ERROR' })
            })

        
    }

   
auth(){
    fetch('/api/grocery', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res.success);
        if (res.success) {
            this.setState({isAuthenticated: true})
        }
    }).catch(er => console.log(er))
    
}

handleLogout = () => {
   fetch('/api/logout',{
       method:"GET",
       credentials:'same-origin',
       headers:{
        'Content-type': 'application/json',
        
       }
   }).then(res=>{
       
    res.json()
   .then(response=>{
       if(response.data){
           this.setState({isAuthenticated:false})
       }
   })
})
   .catch(()=>{
    this.setState({ message: 'Sorry , Internal Server ERROR' })

   })
}

    render() {
        const { valueData, valueAllDataLists, message,isLogged,isAuthenticated} = this.state;
        
        console.log(266666,isAuthenticated);
        
        // Render your page inside
        // the layout provider
        //const elements = ['one', 'two', 'three'];
        //const popOverInfo = []
        const items = []



        for (const [index, value] of this.meals.entries()) {
            //console.log();
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
                        <Slider products={value.products} />
                    </div>
                </div>
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
                    {!isAuthenticated?(
                        <Link to="/login"  >Login</Link>
                        ):<Link to = "/api/grocery">GroceryPage</Link>}
                     
                     
                    <Link to="/v2" className="w3-bar-item w3-button w3-hover-orange w3-mobile">Recipes</Link>
                    

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
                    {isAuthenticated?(

                        <Link to='/logout' onClick={this.handleLogout}>Logout</Link>
                    ):null}

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

                <Typeahead
                    options={valueAllDataLists}
                    placeholder="Find Meals (and Ingredients) here.."
                    id="typeahead"
                />




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
                    path="/api/grocery" 
                    render={props=>(
                        <GroceryPage
                        
                        />  
                        
                        )}
                        
                        />
                            {/* {auth?(
                                this.setState({isAuthenticated:true})
                            ):this.setState({isAuthenticated:false})} */}
                        

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
    overflow: "scroll"
    // width: "90%",
    // height: "50%",

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

