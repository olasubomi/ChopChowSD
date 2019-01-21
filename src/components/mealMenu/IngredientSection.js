import React from 'react';
import { Popover, PopoverBody } from 'reactstrap';

class IngredientSection extends React.Component {
    constructor(props){
        super(props);
        this.IngredientInfoToggle = this.IngredientInfoToggle.bind(this);

        this.state={
            ingredientPopOver: false
        }
    }

    IngredientInfoToggle() {
        this.setState({
            ingredientPopOver: !this.state.ingredientPopOver
        });
    }

    render(){
        let ingredientCount = this.props.selectedMeal;

         const mealIngredients = (this.props.selectedMeal.ingredients).map((ingredient)=> 
         <li key={ingredient[0].toString()}> {ingredient} <span id="Popover2" onMouseOver={this.IngredientInfoToggle} onMouseOut={this.IngredientInfoToggle} >
        <img src="/images/info_icon.png" alt="info" style={{width:'13px', height:'13px'}}/> </span></li>);

        {/* const mealIngredients = <li>{this.props.selectedMeal}</li>;
         (this.props.selectedMeal.ingredients).map(
             (ingredient) => 
             <li key={ingredient[0].toString()}> {ingredient} s {ingredient[0]} t
             <span id="Popover2" onMouseOver={this.IngredientInfoToggle} onMouseOut={this.IngredientInfoToggle} >
             <img src="/images/info_icon.png" alt="info" style={{width:'13px', height:'13px'}}/> </span></li> ); */}

            return (
                <div>                    
                    <ul> {mealIngredients} </ul>
                    {/* <Popover placement="auto" isOpen={this.state.ingredientPopOver} target="Popover2" toggle={this.IngredientInfoToggle}>
                        <PopoverBody><div className="payback-disclaimer">
                            Add to WishList<br></br>
                            Add To Cart <br></br><hr></hr>
                             <button>In Stock</button>
                        </div></PopoverBody>
                    </Popover> */}
                </div>
        );
    }
}

export default IngredientSection