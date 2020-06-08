import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';

// height of the TextField
const height = 84

class SuggestMeal extends Component {
    products = [];
    categories = [];
    measurements = ["mL", "oz", "L", "cup(s)"]
    constructor(props) {
        super(props);
        this.state = {
            mealLabel: "",
            intro: "",
            servings: 0,
            currentIngredient: "Ijebu Garri",
            currentIngredientMeasurement: "",
            currentIngredientQuantity: 0,
            ingredientChips: [],
            instructionsChip: [],
            imgSrc: "",
            readTime: "0 mins read",
            cookTime: "10 mins cook time",
            categoryChips: ["snacks", "abc", "123"],
            productsPopulated: false
        };
        this.handleIngredientDropdownChange = this.handleIngredientDropdownChange.bind(this);
        this.handleIngredientMeasurement = this.handleIngredientMeasurement.bind(this);
        this.handleIngredientQuantity = this.handleIngredientQuantity.bind(this);
        this.addIngredientToMeal = this.addIngredientToMeal.bind(this);



    }

    componentDidMount() {
        var url = "./api/get-all-products"

        fetch(url, {
            method: 'GET',
            // credentials: 'include',
            // headers: {
            //   'Content-Type': 'application/json',
            // }
        })
            .then(res => res.text())
            .then(body => {
                // console.log("should print body");
                // console.log(body);
                var productsList = JSON.parse(body);
                if (productsList && productsList.data.length !== 0) {
                    console.log("returns GET ALL PRODUCTS ");
                    console.log(productsList.data.length);
                    for (var i = 0; i < productsList.data.length; i++) {
                        this.products.push(productsList.data[i].product_name);
                    }
                    console.log("PRINTING ALL PRODUCTS LIST")
                    console.log(this.products);
                    this.setState({ productsPopulated: true })
                }
                else {
                    console.log("get all products function does not return");
                }
            })
            .catch(err => {
                console.log(err);
            });


        //get category meals
        var url = "./api/get-all-categories"

        fetch(url, {
            method: 'GET',
            // credentials: 'include',
            // headers: {
            //   'Content-Type': 'application/json',
            // }
        })
            .then(res => res.text())
            .then(body => {
                // console.log("should print body");
                // console.log(body);
                var categoryList = JSON.parse(body);
                if (categoryList && categoryList.data.length !== 0) {
                    console.log("returns GET of ALL Categories ");
                    console.log(categoryList.data.length);
                    for (var i = 0; i < categoryList.data.length; i++) {
                        this.categories.push(categoryList.data[i]);
                    }
                    console.log("PRINTING UPDATED CATEGORIES LIST")
                    console.log(this.categories);
                }
                else {
                    console.log("get all products function does not return");
                }
            })
            .catch(err => {
                console.log(err);
            });

    }



    onTextFieldChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        console.log("Comes in on change");
        this.setState({ [e.target.name]: e.target.value });
    }


    handleAddIngredientChip(chip) {
        this.setState({ ingredientChips: [...this.state.ingredientChips, chip] })
        // check if ingredients already exists , if exists use product,
        // else add product to suggested products
    }

    addIngredientToMeal(event) {
        event.preventDefault();
        console.log(this.state.currentIngredientMeasurement);
        console.log(this.state.currentIngredient);

        var properIngredientSyntax = "" + this.state.currentIngredientQuantity + " " + this.state.currentIngredientMeasurement + " of " + this.state.currentIngredient;
        console.log(properIngredientSyntax);
        this.handleAddIngredientChip(properIngredientSyntax);
    }

    handleAddCategoryChip(chip) {
        this.setState({ categoryChips: [...this.state.categoryChips, chip] }) //
        // check if category already exists , if exists use it,
        // else add category to new category
    }

    handleAddInstructionStep(chip) {
        // this.setState({
        //     instructionsChip: [...this.state.instructionsChip, instructionStep]
        // })

        this.setState({
            instructionsChip: [...this.state.instructionsChip, chip]
        })
    }

    handleDeleteIngredientChip(chip) {
        console.log("removing chop input")
        var array = [...this.state.ingredientChips]; // make a separate copy of the array
        var index = array.indexOf(chip)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ ingredientChips: array });
        }
    }

    handleDeleteCategoryChip(chip) {
        console.log("removing chop input")
        var array = [...this.state.categoryChips]; // make a separate copy of the array
        var index = array.indexOf(chip)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ categoryChips: array });
        }
    }

    handleDeleteInstructionsStep(chip) {
        console.log("removing chop input")
        var array = [...this.state.instructionsChip]; // make a separate copy of the array
        var index = array.indexOf(chip)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ instructionsChip: array });
        }
    }
    handleIngredientQuantity(event) {
        console.log(event.target.value);
        this.setState({ currentIngredientQuantity: event.target.value });
    }
    handleIngredientDropdownChange(event) {
        console.log(event.target.value);
        this.setState({ currentIngredient: event.target.value });
    }
    handleIngredientMeasurement(event) {
        console.log(event.target.value);
        this.setState({ currentIngredientMeasurement: event.target.value });
    }

    // use function format to allow for use of this.state
    // within a component function
    sendSuggestedMealToDB = () => {
        // e.preventDefault();
        console.log("Comes in suggest meal func")
        // get our form data out of state
        const { mealLabel, intro, servings, ingredientChips,
            instructionsChip, imgSrc, readTime, cookTime, categoryChips } = this.state;

        var url = "/api/addMealSuggestion/";
        console.log("gets to call fetch")

        fetch(url, {

            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mealLabel, intro, servings, ingredientChips,
                instructionsChip, imgSrc, readTime, cookTime, categoryChips
            })
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                console.log(response);
                return response;
                // window.location.reload();
            } else {
                console.log('Somthing happened wrong');
            }
        }).catch(err => {
            console.log(err)
        });
    }

    render() {
        var instructionSteps =
            <ol className="mdc-list">
                {this.state.instructionsChip.map((chip) =>
                    <li className="mdc-list-item" tabIndex="0">
                        <span className="mdc-list-item__text">{chip}</span>
                    </li>)}
            </ol>;

        var productOptions = this.products.map(product => {
            return (
                <option value={product} key={product}> {product} </option>)
        });

        var measurementOptions = this.measurements.map(m_unit => {
            return (
                <option value={m_unit} key={m_unit}> {m_unit} </option>)
        });

        return (
            <div>
                <div id="title">
                    <b>Suggestions</b>
                </div>

                <div style={{ "textAlign": "center" }}>
                    <br></br>
                    {/* add hash action so that form does not reload on enter or button click */}
                    <form autoComplete="off" action="#">
                        <TextField id="meal_label" onChange={this.onTextFieldChange} label="Meal Name" required variant="filled" /><br></br>
                        <TextField multiline id="mealIntro" onChange={this.onTextFieldChange} label="Intro" variant="filled" /><br></br>
                        <TextField id="servings" type="number" onChange={this.onTextFieldChange} label="Servings" variant="filled" /><br></br>
                        <ChipInput
                            label="Ingredients"
                            value={this.state.ingredientChips}
                            onAdd={(chip) => this.handleAddIngredientChip(chip)}
                            onDelete={(chip, index) => this.handleDeleteIngredientChip(chip, index)}
                        /><br></br>
                        <div>
                            <select onChange={this.handleIngredientDropdownChange}>
                                {productOptions}
                            </select>
                            <input type='number' placeholder="Quantity" onChange={this.handleIngredientQuantity} />

                            <select onChange={this.handleIngredientMeasurement}>
                                {measurementOptions}
                            </select>
                            <button onClick={this.addIngredientToMeal}> Add Ingredient + </button>

                            {/* <FormControl>
                                <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={measurement}
                                    onChange={handleMeasurementChange}
                                >
                                    <MenuItem value={measurement}>
                                        <em>Measurement</em>
                                    </MenuItem>
                                    <MenuItem value={1}>mL</MenuItem>
                                    <MenuItem value={2}>oz</MenuItem>
                                    <MenuItem value={3}>tbs</MenuItem>
                                    <MenuItem value={4}>lbs</MenuItem>
                                </Select>
                                <FormHelperText>Enter measurement unit for serving</FormHelperText>
                            </FormControl> */}
                            {/* <input>Measurement</input><input>Product</input> */}
                        </div>

                        {instructionSteps}
                        <ChipInput
                            label="Instructions"
                            value={this.state.instructionsChip}
                            onAdd={(chip) => this.handleAddInstructionStep(chip)}
                            onDelete={(chip, index) => this.handleDeleteInstructionsStep(chip, index)}

                        /><br></br>
                        {/* <TextField id="instructions" onChange={this.onChange} label="Instructions" variant="filled" /><br></br> */}
                        <TextField id="imgsrc" type="file" onChange={this.onTextFieldChange} label="Upload meal image" variant="filled" /><br></br>
                        {/* <input type="file" name="file-input" multiple /><br></br>  */}
                        {/* {...props} */}
                        <TextField id="readTime" type="number" onChange={this.onTextFieldChange} label="ReadTime (mins)" variant="filled" required />  <br></br>
                        <TextField id="cookTime" type="number" onChange={this.onTextFieldChange} label="CookTime (mins)" variant="filled" required /><br></br>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={dbCategories.map((option) => option.title)}
                            defaultValue={[dbCategories[2].title]}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField {...params} variant="filled" label="Categories" placeholder="Suggest categories for this meal.." />
                            )}
                        />
                        <br></br>
                        {/* <ChipInput
                            label="Categories"
                            value={this.state.categoryChips}
                            onAdd={(chip) => this.handleAddCategoryChip(chip)}
                            onDelete={(chip, index) => this.handleDeleteCategoryChip(chip, index)}
                        /><br></br> */}
                        <button onClick={this.sendSuggestedMealToDB}> Suggest Meal </button>
                    </form>
                </div>

            </div>
        )
    };

}

const dbCategories = [
    {
        title: 'abc'
    }, {
        title: '123'
    },
    {
        title: 'snacks'
    }
];

export default SuggestMeal;