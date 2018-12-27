import React from 'react';
class IngredientsMenu extends React.Component {
    render(){
        const mealIngredients = (this.props.selectedMealIngredients).map((meal)=> <li key={meal.toString()}> {meal} </li> );
            return (
                <div>                    
                    <ol> {mealIngredients} </ol>
                </div>
        );
    }
}

export default IngredientsMenu
