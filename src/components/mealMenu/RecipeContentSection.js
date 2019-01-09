import React, { Component } from 'react';

class RecipeContentSection extends Component {
    render(){
        var imgsrc = this.props.selectedMeal.imageSrc;
        imgsrc = '../images/Garri.jpg';
            return (
                <div>                    
                    <div>{this.props.selectedMeal.label} </div>
                    <div> 
                        <img src={this.props.selectedMeal.imageSrc} alt="alt"/>
                    </div>
                    <div>{this.props.selectedMeal.readTime} </div>
                    <div> {this.props.selectedMeal.cookTime}</div>
                </div>
        );
    }
}

export default RecipeContentSection;