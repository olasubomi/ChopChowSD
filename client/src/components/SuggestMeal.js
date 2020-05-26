import React, { Component } from "react";
import { TextField } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input'


class SuggestMeal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_fetched: false,
            chips : []
        };
    }

    handleAddChip(chip) {
        this.setState({ chips: [...this.state.chips, chip] }) //
    }

    handleDeleteChip() {
        console.log("removing chop input")
    }


    render() {

        return (
            <div>
                <div id="title">
                    <b>Suggestions</b>
                </div>
                <div>
                    <form noValidate autoComplete="off">
                        <TextField id="meal_label" label="Meal Name" variant="filled" /><br></br>
                        <TextField id="imgsrc" label="Image Source" variant="filled" /><br></br>
                        <TextField id="readTime" label="ReadTime" variant="filled" /><br></br>
                        <TextField id="cookTime" label="CookTime" variant="filled" /><br></br>
                        <TextField id="mealIntro" label="Intro" variant="filled" /><br></br>
                        {/*  controlled input */}
                        <ChipInput
                        label="Ingredients"
                            value={this.state.chips}
                            onAdd={(chip) => this.handleAddChip(chip)}
                            onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                        /><br></br>
                        <TextField id="servings" label="Servings" variant="filled" /><br></br>
                        <TextField id="instructions" label="Instructions" variant="filled" /><br></br>
                    </form>
                </div>

            </div>
        )
    };

}

export default SuggestMeal;