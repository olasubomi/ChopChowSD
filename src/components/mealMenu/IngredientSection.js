import React from 'react';
class IngredientSection extends React.Component {
    render(){
        const mealIngredients = (this.props.selectedMealIngredients).map((meal)=> <li key={meal.toString()}> {meal} </li> );
            return (
                <div>                    
                    <ul> {mealIngredients} </ul>
                </div>
        );
    }
}

export default IngredientSection