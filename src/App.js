import React, { Component } from 'react'; 
import RecipesPage from './pages/RecipesPage';
import IngredientsMenu from './components/mealMenu/IngredientsMenu';


class App extends Component {
    Garri={
        name: "Garri",
        ingredients: ["Garri", "Water"],
        display: false
    }

    Jollof_Rice={
        name: "Red/Jollof Rice",
        ingredients: ["Tomatoes", "Rice", "Onions", "Oil"],
        display: true
    } 

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
        recipes: [this.Garri, this.Jollof_Rice],
        selected: {
            product: "",
            ingredients: []
        },
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
        console.log(event.target);
    }

    render() {

        // Render your page inside
        // the layout provider
        return (
            <div className="container">
                <input placeholder="Search or create meal"></input>
                <div className="row">
                    <div className="col-sm">
                        Recipes List
                        <RecipesPage 
                        recipes={this.state.recipes} showIngredients={this.showIngredients}/>
                     </div>
                     
                    <div className="col-sm">
                        Recipe Content
                    </div>

                    <div className="col-sm">
                        Ingredients
                        <IngredientsMenu selected = {this.state.selected}/>
                    </div>
                </div>
            </div>
            // <div>
            //     <Grid>
            //         <Row className="show-grid">
            //             <Col xs={12} md={8}>
            //             <code>{'<Col xs={12} md={8} />'};</code>
            //             </Col>
            //             <Col xs={6} md={4}>
            //             <code>{'<Col xs={6} md={4} />'}</code>
            //             </Col>
            //         </Row>
            //     </Grid>
            // </div>
        );
    }
}

export default App;

