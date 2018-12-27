import React, { Component } from 'react';


class RecipesPage extends Component {
        render() {
            const mealsListed = this.props.recipes.map((meal)=> <li key={meal.id} onClick={this.props.showIngredients}> {meal.label} </li>);
            return (
                <div>                    
                    <ul> {mealsListed} </ul>
                </div>
                // <Page layout="public">
                    // <Section slot="main">
                //     <div className='styled-select'>
                // <div className="mealMenu">
                // Garris

                    /* <RecipesMenu year={this.state.recipe}/>
                    {/* <RecipesMenu year={this.state.recipe} setYear={this.state.setYear}/>
                </div>
                <div className={`${this.state.showFakeIngredients.hidden} mealMenu`}>
                    <FakeIngredientsMenu />
                </div>
                <div className={`${this.state.showIngredients.hidden} mealMenu`}>
                    <IngredientsMenu make={this.state.ingredients} />
                    {/* <IngredientsMenu make={this.state.make} setMake={this.state.setMake}
                    makeMenu={this.state.makeMenu}/> 
                </div>
                <div className={`${this.state.showFakeProducts.hidden} mealMenu`}>
                    <FakeProductsMenu className={this.state.showFakeProducts}/>
                </div>
                <div className={`${this.state.showProducts.hidden} mealMenu`}>
                    <ProductsMenu model={this.state.model} setModel={this.state.setModel}
                    modelMenu={this.state.modelMenu}/>*/
                /* </div>
            </div> */

                    // <MealsSection/>
                        /* <h1> Page Content, This is the meals section slot in public layout </h1> */
                    
                    /* <Section slot="ingredients">
                        <h1> Page Content, This is the ingredients section slot in public layout </h1>
                    </Section> */
                // </Page>
            );
        }
}

export default RecipesPage;