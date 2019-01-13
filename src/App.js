import React, { Component } from 'react'; 
import {Typeahead} from 'react-bootstrap-typeahead';
import ListedMealsSection from './components/mealMenu/ListedMealsSection';
import RecipeContentSection from './components/mealMenu/RecipeContentSection';
import IngredientSection from './components/mealMenu/IngredientSection';



class App extends Component {

    meals = [
        {
            id: 1,
            label: "Garri",
            imageSrc: '../images/Garri.jpg',
            readTime: "2 mins read",
            cookTime: "2 mins to prepare",
            ingredients: ["Garri", "Water"],
            display: false
        },
        {
            id: 2,
            label: "Jollof Rice",
            imageSrc: "../images/Jollof.jpg",
            readTime: "4 mins read",
            cookTime: "45 mins to prepare",
            ingredients: ["Rice", "Tomatoes", "Onions", "Oil"],
            display: true
        },
        {
            id: 3,
            label: "Fried Beans",
            imageSrc: "../images/FriedBeans.jpg",
            readTime: "4 mins read",
            cookTime: "60 mins to prepare",
            ingredients: ["Black Eyed Beans", "Onions", "Palm Oil"],
            display: true
        },
        {
            id: 4,
            label: "Roasted Potatoes",
            imageSrc: "../images/roasted_potatoes.jpg",
            readTime: "3 mins read",
            cookTime: "90 mins to prepare",
            ingredients: ["Potatoes", "Ginger",  "Thyme", "Oregano", "Basil", "Parmesan Cheese", "Oil", "Butter"],
            display: true
        }
    ]

    state={
        showFIngreients: {
            hidden: ''
          },
          showTooltip: {
            hidden: ''
          },
          showSecondPart: {
            hidden: 'hidden'
          },
          showThirdPart: {
            hidden: 'hidden'
          },
          showForthPart: {
            hidden: 'hidden'
          },
          showFifthPart: {
            hidden: 'hidden'
          },
        mealsListed : false,
        mealSelected : false,
        IngredientsListed : false,
        recipes: this.meals, //[this.Garri, this.Jollof_Rice],
        selectedMealIngredients: this.meals[0].ingredients,
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

    render() {
        // Render your page inside
        // the layout provider
        return (
            <div className="container">
                <Typeahead options={this.meals} 
                placeholder="Find Meals (and Ingredients) here.."
                // filterBy={['label', 'ingredients']}
                />
                <br></br>
                <div className="row">
                    <div className="col-sm">
                        Meals
                        <ListedMealsSection 
                        recipes={this.state.recipes} showIngredients={this.showIngredients}/>
                        <span>&#43;</span><input placeholder="Suggest Meal"></input>

                     </div>                     
                    <div className="col-sm">
                        Recipe Content
                        <RecipeContentSection selectedMeal= {this.state.selectedMeal}/>
                        
                    </div>

                    <div className="col-sm">
                        <b>Ingredients</b>
                        <IngredientSection selectedMealIngredients= {this.state.selectedMealIngredients}/>
                        <span>&#43;</span><input placeholder="Suggest Ingredient.."></input>
                    </div>
                </div>
            </div>
        );
    }
} 

export default App;

