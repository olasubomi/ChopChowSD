import React, { Component } from 'react'; 
import {Typeahead} from 'react-bootstrap-typeahead';
import ListedMealsSection from './components/mealMenu/ListedMealsSection';
import RecipeContentSection from './components/mealMenu/RecipeContentSection';
import IngredientSection from './components/mealMenu/IngredientSection';
import { Popover, PopoverBody } from 'reactstrap';




class App extends Component {

    meals = [
        {
            id: 1,
            label: "Garri",
            imageSrc: '../images/Garri.jpg',
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
            label: "Jollof Rice",
            imageSrc: "../images/Jollof.jpg",
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
            id: 3,
            label: "Fried Beans",
            imageSrc: "../images/FriedBeans.jpg",
            readTime: "4 mins read",
            cookTime: "60 mins to prepare",
            ingredients: ["Black Eyed Beans x 1 bag(350mL)", "Onions x 2", "Palm Oil- 2 Cups"],
            instructions: ["Soak beans in water overnight","The next day, chop 1 onion into thin slices, cut the other one into 4 big chunks then pound/grind the pepper.",
        "Rinse the beans and put in a sizeable pot. I rinse it twice.","Pre-cook the sliced onions with a few drops of water to soften them a bit.",
     "Pre-cook the sliced onions with a few drops of water to soften them a bit.","When the beans is done, add salt, leave to dry up all the water and transfer the beans to another container.",
    "Now, set a dry clean pot on the stove, pour the palm oil and heat it up till the oil melts (if congealed). Note that you should only heat it up, not bleach the oil. You will know it is hot enough when a piece of onion dropped into the oil sizzles.",
"Add the precooked onions and stir for a bit.", "Add the ground Habanero pepper and stir till everything is heated up very well, at most 2 minutes.","Add the beans and stir for about 2 minutes. Add salt if necessary.",
"Cover and leave to simmer for about 2 minutes and it's done."],
            display: true
        },
        {
            id: 4,
            label: "Roasted Potatoes",
            imageSrc: "../images/roasted_potatoes.jpg",
            readTime: "3 mins read",
            cookTime: "90 mins to prepare",
            ingredients: ["Potatoes x 8", "Garlic- 6 cloves",  "Thyme", "Oregano", "Basil", "Parmesan Cheese", "Oil", "Butter"],
            instructions: ["Adjust oven rack to lowest position and heat oven to 450 degrees. ", "Cut potatoes into quarter chunks",
        "Toss potatoes with oil, salt and pepper chopped garlic, Thyme, Oregano, Basil and then Parmesan Cheese", 
    "Arrange, cut side down, on a large lipped cookie sheet or jellyroll pan.", "Roast until tender and golden brown, or until desired crispiness about 30-45 minutes","Add butter in between roasting for a savory taste, Transfer to a serving dish when ready."],
            display: true
        }
    ]
    constructor(props){
        super(props);
        this.suggestMealToggle = this.suggestMealToggle.bind(this);

        this.state={
            suggestMealPopOver: false,
            mealsListed : false,
            mealSelected : false,
            IngredientsListed : false,
            recipes: this.meals, //[this.Garri, this.Jollof_Rice],
            selectedMealIngredients: this.meals[0].new_ingredients,
            selectedMeal: this.meals[0],
            showFakeIngredients:{
                hidden: false
            },
            showIngredients:{
                hidden: true
            },
            showFakeProducts:{
                hidden: false
            },
            showProducts:{
                hidden: true
            }
        }
    }


    

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

    render() {
        // Render your page inside
        // the layout provider
        return (
            <div className="container">
                <Typeahead options={this.meals} 
                placeholder="Find Meals (and Ingredients) here.."
                // onChange={(selected) => {
                //     // Handle selections...
                //   }}
                // filterBy={['label', 'ingredients']}
                />
                <br></br>
                <div className="row">
                    <div className="col-sm">
                        <b>Meals</b>
                        <ListedMealsSection 
                        recipes={this.state.recipes} showIngredients={this.showIngredients}
                        selectedMeal={this.state.selectedMeal}/>
                        <span>&#43;</span><input placeholder="Suggest Meal"></input> 
                        
                      &nbsp;<button>Submit <span id="Popover1" onMouseOver={this.suggestMealToggle} onMouseOut={this.suggestMealToggle} >
                      <img src="/images/info_icon.png" alt="info" style={{width:'13px', height:'13px'}}/> </span></button>
                      {/* onClick={this.suggestMealToggle} */}
                     </div>                     
                    <div className="col-sm">
                        <b>Recipe Content</b>
                        <RecipeContentSection selectedMeal= {this.state.selectedMeal}/>
                        
                    </div>

                    <div className="col-sm">
                        <b>Ingredients</b>
                        <IngredientSection selectedMealIngredients= {this.state.selectedMealIngredients}
                        selectedMeal= {this.state.selectedMeal}/>
                        {/* <span>&#43;</span><input placeholder="Suggest Ingredient.."></input> */}
                    </div>
                    
                    <Popover placement="auto" isOpen={this.state.suggestMealPopOver} target="Popover1" toggle={this.suggestMealToggle}>
                        <PopoverBody><div className="payback-disclaimer">
                        Suggestions by Guest Users are recorded, but do not change the publicly displayed Meals.
                        </div></PopoverBody>
                    </Popover>
                </div>
            </div>
            
        );
    }
} 

export default App;

