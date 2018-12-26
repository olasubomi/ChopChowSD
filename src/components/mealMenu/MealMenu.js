import React from 'react';
import RecipesMenu from './RecipesMenu';
import IngredientsMenu from './IngredientsMenu';
import ProductsMenu from './ProductsMenu';
import FakeIngredientsMenu from './FakeIngredientsMenu';
import FakeProductsMenu from './FakeProductsMenu';

class MealMenu extends React.Component {

    state={

    }
    render() {

        return(
            <div className='styled-select'>
                <div className="mealMenu">
                    <RecipesMenu year={this.state.year} setYear={this.state.setYear}/>
                </div>
                <div className={`${this.state.showFakeMake.hidden} mealMenu`}>
                    <FakeIngredientsMenu />
                </div>
                <div className={`${this.state.showMake.hidden} mealMenu`}>
                    <IngredientsMenu make={this.state.make} setMake={this.state.setMake}
                    makeMenu={this.state.makeMenu}/>
                </div>
                <div className={`${this.state.showFakeModel.hidden} mealMenu`}>
                    <FakeProductsMenu className={this.state.showFakeModel}/>
                </div>
                <div className={`${this.state.showModel.hidden} mealMenu`}>
                    <ProductsMenu model={this.state.model} setModel={this.state.setModel}
                    modelMenu={this.state.modelMenu}/>
                </div>
            </div>
        );
    }
}



export default MealMenu;