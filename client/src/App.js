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
            label: "Puff Puff",
            imageSrc: '../images/puff_puff.jpg',
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
            id: 4,
            label: "Fried Beans",
            imageSrc: "../images/FriedBeans.jpg",
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
            imageSrc: "../images/roasted_potatoes.jpg",
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
           
        //     <div className="container">
        //     <div className="row ">
        //         <div className="col-sm-12 col-md-6 col-lg-4">
        //             <div className="mealContainer">
        //             <a href="#" target="_blank" >
        //                 <img src = "images/roasted_potatoes.jpg" className="images" style={{width:"100%"}} alt="Garri" />
        //                 <div className="caption">Roasted Potatoes</div>
        //             </a>
        //             </div>
        //         </div>
        //         <div className=" col-sm-12 col-md-6 col-lg-4">
        //             <div className="mealContainer">
        //             <a href="#" target="_blank" >
        //                 <img src = "images/FriedBeans.jpg" className="images" style={{width:"100%"}} alt="Fried Beans" />
        //                 <div className="caption">Fired Beans</div>
        //             </a>
        //             </div>
        //         </div> 
        //         <div className="col-sm-12 col-md-6 col-lg-4">
        //             <div className="mealContainer">
        //             <a href="#" target="_blank" >
        //                 <img src = "images/Garri.jpg" className="images" style={{width:"100%"}} alt="Garri" />
        //                 <div className="caption">Garri</div>
        //             </a>
        //             </div>
        //         </div>
        //         <div className="col-sm-12 col-md-6 col-lg-4">
        //             <div className="mealContainer">
        //             <a href="#" target="_blank">
        //                 <img src = "images/Jollof.jpg" className="images" style={{width:"100%"}} alt="Jollof Rice" />
        //                 <div className="caption">Jollof Rice</div>
        //             </a>
        //             </div>
        //         </div>
        //         <div className="col-sm-12 col-md-6 col-lg-4">
        //             <div className="mealContainer">
        //             <a href="#" target="_blank">
        //                 <img src = "images/Jollof.jpg" className="images" style={{width:"100%"}} alt="Puff Puff" />
        //                 <div className="caption">Jollof Rice</div>
        //             </a>
        //             </div>
        //         </div> 

        //         <div className="col-sm-12 col-md-6 col-lg-4">
        //             <div className="mealContainer">
        //             <a href="#" target="_blank">
        //                 <img src = "images/roasted_potatoes.jpg" className="images" style={{width:"100%"}} alt="Roasted Potatoes" />
        //                 <div className="caption">Roasted Potatoes</div>
        //             </a>
        //             </div>
        //         </div>
        //     </div>
        // </div>


            //     <div className="container blogThumbnails text-center">
            //         <div className="row no-gutters">
            //         <div className="col-sm-12 col-md-6 col-lg-4">
            //             <div className="thumbnail">
            //             <a href="#" target="_blank">
            //                 <img src = "images/Garri.jpg"  alt="Garri" />
            //                 <div className="caption">Garri</div>
            //             </a>
            //             </div>
            //         </div>
            //         <div className="col-sm-12 col-md-6 col-lg-4">
            //             <div className="thumbnail">
            //             <a href="#" target="_blank">
            //                 <img src = "images/Jollof.jpg"  alt="Fried Beans" />
            //                 <div className="caption">Jollof Rice</div>
            //             </a>
            //             </div>
            //         </div> 
            //         <div className="col-sm-12 col-md-6 col-lg-4">
            //             <div className="thumbnail">
            //             <a href="#" target="_blank">
            //                 <img src = "images/Garri.jpg"  alt="Garri" />
            //                 <div className="caption">Garri</div>
            //             </a>
            //             </div>
            //         </div>
            //         <div className="col-sm-12 col-md-6 col-lg-4">
            //             <div className="thumbnail">
            //             <a href="#" target="_blank">
            //                 <img src = "images/Jollof.jpg"   alt="Jollof Rice" />
            //                 <div className="caption">Jollof Rice</div>
            //             </a>
            //             </div>
            //         </div>
            //         <div className="col-sm-12 col-md-6 col-lg-4">
            //             <div className="thumbnail">
            //             <a href="#" target="_blank" rel="noopener noreferrer" className="viewFoodContent">
            //                 <img src = "images/Jollof.jpg"  alt="Puff Puff" />
            //                 <div className="caption">Jollof Rice</div>
            //             </a>
            //             </div>
            //         </div> 
            //         <section className="col-sm-12 col-md-6 col-lg-4">
            //             <div className="thumbnail">
            //             <a href="#" target="_blank" rel="noopener noreferrer" className="viewFoodContent">
            //                 <img src = "images/roasted_potatoes.jpg"  alt="Roasted Potatoes" />
            //                 <div className="caption">Roasted Potatoes</div>
            //             </a>
            //             </div>
            //       </section>
            //     </div>
            //   </div>
           
            <div className="container">
                {/* <Typeahead options={this.meals} 
                placeholder="Find Meals (and Ingredients) here.."
                // onChange={(selected) => {
                //     // Handle selections...
                //   }}
                // filterBy={['label', 'ingredients']}
                /> */}
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
                        <b>Recipe Contents</b>
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

