import React, { Component } from 'react'; 
import {Typeahead} from 'react-bootstrap-typeahead';
// import ListedMealsSection from './components/mealMenu/ListedMealsSection';
// import RecipeContentSection from './components/mealMenu/RecipeContentSection';
// import IngredientSection from './components/mealMenu/IngredientSection';
import {Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
import { Popover, PopoverBody } from 'reactstrap';
import Popup from "reactjs-popup";
//import Collapse from 'react-bootstrap/Collapse';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App2 extends Component {

    meals = [
        {
            id: 1,
            label: "Garri",
            imageSrc: '/images/Garri.jpg',
            readTime: "2 mins read",
            cookTime: "2 mins to prepare",
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
            quantity:[1,2,1],
            measurements:["Cup(s)","Cup(s)","Spoon(s)"],
            instructions: ["Mix Garri and Sugar in a bowl", "Add ice, water and groundnuts as preffered", "Enjoy!"],
            servings: 1,
            display: false
        },
        {
            id: 2,
            label: "Puff Puff",
            imageSrc: '/images/puff_puff.jpg',
            readTime: "4 mins read",
            cookTime: "80  mins to prepare",
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
        },
        {
            id: 3,
            label: "Jollof Rice",
            imageSrc: "/images/Jollof.jpg",
            readTime: "4 mins read",
            cookTime: "45 mins to prepare",
            ingredients: ["Rice- 3 Cups", "Tomatoes x 6", "Onion x 2", "Palm Oil- 2 Cups"],
            instructions:[ "Tomato , Onion Tatashe, Rodo Blended in Blender",
            "Vegetable Oil + Palm Oil, Low Heat in Pan",
            "Add onions to Pan", "Add Tomato Paste", "Add Powdered Ginger, Garlic and Curry",
            "Add Blended Tomatoes mix (If too thick, add water)","Add seasoning, Maggi (Chicken Flavor), Salt",
        "For Jollof Rice, add Bay Leaves."],
            display: true
        },
        {
            id: 4,
            label: "Fried Beans",
            imageSrc: "/images/FriedBeans.jpg",
            readTime: "4 mins read",
            cookTime: "60 mins to prepare",
            ingredients: ["Black Eyed Beans x 1 bag(350mL)", "Onions x 2", "Palm Oil- 2 Cups"],
            instructions: ["Soak beans in water overnight","The next day, chop 1 onion into thin slices, cut the other one into 4 big chunks then pound/grind the pepper.",
        "Rinse the beans and put in a sizeable pot. I rinse it twice.",
     "Pre-cook the sliced onions with a few drops of water to soften them a bit.","When the beans is done, add salt, leave to dry up all the water and transfer the beans to another container.",
    "Now, set a dry clean pot on the stove, pour the palm oil and heat it up till the oil melts (if congealed). Note that you should only heat it up, not bleach the oil. You will know it is hot enough when a piece of onion dropped into the oil sizzles.",
"Add the precooked onions and stir for a bit.", "Add the ground Habanero pepper and stir till everything is heated up very well, at most 2 minutes.","Add the beans and stir for about 2 minutes. Add salt if necessary.",
"Cover and leave to simmer for about 2 minutes and it's done."],
            display: true
        },
        {
            id: 5,
            label: "Roasted Potatoes",
            imageSrc: "/images/roasted_potatoes.jpg",
            readTime: "3 mins read",
            cookTime: "90 mins to prepare",
            ingredients: ["Potatoes - 8", "Garlic- 6 cloves",  "Thyme", "Oregano", "Basil", "Parmesan Cheese", "Oil", "Butter"],
            instructions: ["Adjust oven rack to lowest position and heat oven to 450 degrees. ", "Cut potatoes into quarter chunks",
        "Toss potatoes with oil, salt and pepper chopped garlic, Thyme, Oregano, Basil and then Parmesan Cheese", 
    "Arrange, cut side down, on a large lipped cookie sheet or jellyroll pan.", "Roast until tender and golden brown, or until desired crispiness about 30-45 minutes","Add butter in between roasting for a savory taste, Transfer to a serving dish when ready."],
            display: true
        }
    ]


    constructor(props){
        super(props);
        this.suggestMealToggle = this.suggestMealToggle.bind(this);
        //this.showIngredient = this.showIngredient.bind(this);

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

            mealsLength : this.meals.length
        }
    }

    meal_popups  = [];

    showIngredients=(event)=>{
        let mealString = event.target.innerText;
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
        //console.log({meal}.name);
        //get list of ingredients
    }

    suggestMealToggle() {
        this.setState({
            suggestMealPopOver: !this.state.suggestMealPopOver
        });
    }

    showIngredient(index){
        console.log("updating popup boolean");
        this.meal_popups[index] = !this.meal_popups[index]
    }


    render() {
        // Render your page inside
        // the layout provider
        //const elements = ['one', 'two', 'three'];

        const items = []
        
        //const popOverInfo = []

        for (const [index, value] of this.meals.entries()) {
            //console.log();
            const mealPrep = value.instructions.map((step)=> <li key={step} > {step} </li>);
            //console.log(value);
            var mealIngredient = value.ingredients ;
            const ingredientsList = value.ingredients.map((step)=> <li key={step} > {step} </li>);
            this.meal_popups.push(false);
            console.log(this.meal_popups);
            console.log(index);
            items.push(
                <div className="col-sm-12 col-md-6 col-lg-4 mealContainer"  key = {value.id} >
                    <div>
                        <div style={containerStyle}>
                            <img src={value.imageSrc} className="images" style={{width:"100%"}} alt={value.id} onClick={()=>{
                                this.meal_popups[index] = !this.meal_popups[index];
                                console.log(this.meal_popups);
                                var x = document.getElementById(value.ingredients);
                                if(this.meal_popups[index]){
                                    x.style.display = "block";
                                }
                                else{
                                    x.style.display = "none";
                                }
                                }}></img>
                            {/* <img src={value.imageSrc} className="images" style={{width:"100%"}} alt={value.id} onClick={this.showIngredient(index)}></img> */}

                        </div>
                        <div style={{color: "blue"}}> {value.label}</div>
                    </div>
                <Popup 
                    trigger={
                        <div id = {value.ingredients} style={{ display:"none"}}>
                        {value.ingredients}   
                        <Button>View Steps</Button>     
                        </div> 

   
                    } modal closeOnDocumentClick contentStyle={contentStyle}>

                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="col align-items-center">{value.readTime}</div>
                                <div className="col align-items-center">{value.cookTime}</div>
                                <div><b>Ingredients</b></div>
                                <div className="col align-items-center"><ol>{ingredientsList}</ol></div>
                                <div><img src={value.imageSrc} alt='info' style={{ width:"100%", height:"100%", align:"center"}}></img></div>

                            </div>
               
                            <div className="col">
                                <div className="col align-items-center"><ol>{mealPrep}</ol></div>
                            </div>
                        </div>
                    </div>
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
                    
                </div>
            )
        }

        return (
            <div>
                {/* <div> */}
                    {/* <Router> */}

                    <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">CC app menu bar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar.Text>
                            text1
                        </Navbar.Text>
                        <Navbar.Text>
                            text2 <a href="#login">Chop Chow Tech Team</a>
                        </Navbar.Text>
                        {/* <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link> */}
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                        {/* </Nav> */}
                        <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                    </Navbar>
                    {/* </Router> */}
                {/* </div> */}
                <Typeahead options={this.meals} 
                placeholder="Find Meals (and Ingredients) here.."
                id="typeahead"
                // onChange={(selected) => {
                //     // Handle selections...
                //   }}
                // filterBy={['label', 'ingredients']}
                />
                &nbsp; <span>&#43;</span><input placeholder="Suggest Meal"></input> 
             &nbsp;<button>Submit <span id="Popover1" onMouseOver={this.suggestMealToggle} onMouseOut={this.suggestMealToggle} >
            <img src="/images/info_icon.png" alt="info" style={{width:'13px', height:'13px'}}/> </span></button>
                
                <Popover placement="auto" isOpen={this.state.suggestMealPopOver} target="Popover1" toggle={this.suggestMealToggle}>
                        <PopoverBody><div className="payback-disclaimer">
                        Suggestions by Guest Users are recorded, but do not change the publicly displayed Meals.
                        </div></PopoverBody>
                </Popover>
            <div className="container">
                <div className="row ">
                    {items} 
                </div>
            </div>
    
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


export default App2;

