import React, { Component } from 'react';


class ListedMealsSection extends Component {
        render() {
            const mealsListed = this.props.recipes.map((meal)=> <li key={meal.id} onClick={this.props.showIngredients}> {meal.label} </li>);
            return (
                <div>                    
                    <ol> {mealsListed} </ol>
                </div>
            );
        }
}

export default ListedMealsSection;