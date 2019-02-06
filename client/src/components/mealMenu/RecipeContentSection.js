import React, { Component } from 'react';

class RecipeContentSection extends Component {
    render(){
        //var imgsrc = this.props.selectedMeal.imageSrc;
        const mealPrep = this.props.selectedMeal.instructions.map((step)=> <li key={step} > {step} </li>);

            return (
                <div>                    
                    <div>{this.props.selectedMeal.label} </div>
                    <div> 
                    {/* <img src={require('./images/Garri.jpg')}/> */}
                    {/* <img src={this.props.selectedMeal.imageSrc} alt="alt"/> */}
                    <img src={this.props.selectedMeal.imageSrc} alt='info' style={{width:'350px', height:'350px'}}/>
                    {/* <img src={require('/images/Garri.jpg')} alt='info' style={{width:'13px', height:'13px'}}/> */}
                    </div>
                    <div>{this.props.selectedMeal.readTime} </div>
                    <div> {this.props.selectedMeal.cookTime}</div>
                    <ol> {mealPrep}</ol>

                </div>
        );
    }
}

export default RecipeContentSection;