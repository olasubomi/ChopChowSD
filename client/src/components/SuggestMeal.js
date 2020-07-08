import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import ChipInput from "material-ui-chip-input";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete"; // createFilterOptions,

// height of the TextField

class SuggestMeal extends Component {
  products = [];
  categories = [];
  measurements = [
    "mL",
    "oz",
    "L",
    "cup(s)",
    "Tbsp",
    "tsp",
    "pt",
    "lb",
    "g",
    "kg",
    "lb",
  ];
  constructor(props) {
    super(props);
    this.state = {
      mealLabel: "",
      intro: "",
      servings: 0,
      currentIngredient: "Butter scotch",
      currentIngredientMeasurement: null,
      currentIngredientQuantity: 0,
      ingredientStrings: [],
      formatted_ingredient: [],
      instructionsChip: [],
      imgSrc: "",
      readTime: "0 mins read",
      cookTime: "10 mins cook time",
      categoryChips: ["snacks", "abc", "123"],
      productsPopulated: false,
    };
    this.handleIngredientDropdownChange = this.handleIngredientDropdownChange.bind(
      this
    );
    this.handleIngredientMeasurement = this.handleIngredientMeasurement.bind(
      this
    );
    this.handleIngredientQuantity = this.handleIngredientQuantity.bind(this);
    this.addIngredientToMeal = this.addIngredientToMeal.bind(this);
  }

  componentDidMount() {
    var url = "./api/get-all-products";

    fetch(url, {
      method: "GET",
      // credentials: 'include',
      // headers: {
      //   'Content-Type': 'application/json',
      // }
    })
      .then((res) => res.text())
      .then((body) => {
        // console.log("should print body");
        // console.log(body);
        var productsList = JSON.parse(body);
        if (productsList && productsList.data.length !== 0) {
          console.log("returns GET ALL PRODUCTS ");
          console.log(productsList.data.length);
          for (var i = 0; i < productsList.data.length; i++) {
            this.products.push(productsList.data[i].product_name);
          }
          console.log("PRINTING ALL PRODUCTS LIST");
          console.log(this.products);
          this.setState({ productsPopulated: true });
        } else {
          console.log("get all products function does not return");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //get category meals
    url = "./api/get-all-categories";

    fetch(url, {
      method: "GET",
      // credentials: 'include',
      // headers: {
      //   'Content-Type': 'application/json',
      // }
    })
      .then((res) => res.text())
      .then((body) => {
        // console.log("should print body");
        console.log(body);
        var categoryList = JSON.parse(body);
        if (categoryList && categoryList.data.length !== 0) {
          console.log("returns GET of ALL Categories ");
          console.log(categoryList.data.length);
          for (var i = 0; i < categoryList.data.length; i++) {
            this.categories.push(categoryList.data[i]);
          }
          console.log("PRINTING UPDATED CATEGORIES LIST");
          console.log(this.categories);
        } else {
          console.log("get all products function does not return");
        }
      })
      .catch((err) => {
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
    // console.log("Target name: " + [e.target]);
    this.setState({ [e.target.id]: e.target.value });
  };

  handleAddIngredientChip(chip) {
    this.setState({
      ingredientStrings: [...this.state.ingredientStrings, chip],
    });
    // check if ingredients already exists , if exists use product,
    // else add product to suggested products
  }

  handleAddCategoryChip(chip) {
    this.setState({ categoryChips: [...this.state.categoryChips, chip] }); //
    // check if category already exists , if exists use it,
    // else add category to new category
  }

  handleAddInstructionStep(chip) {
    // this.setState({
    //     instructionsChip: [...this.state.instructionsChip, instructionStep]
    // })

    this.setState({
      instructionsChip: [...this.state.instructionsChip, chip],
    });
  }

  handleDeleteIngredientChip(chip) {
    console.log("removing chop input");
    var array = [...this.state.ingredientStrings]; // make a separate copy of the array
    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ ingredientStrings: array });
    }
  }

  handleDeleteCategoryChip(chip) {
    console.log("removing chop input");
    var array = [...this.state.categoryChips]; // make a separate copy of the array
    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ categoryChips: array });
    }
  }

  handleDeleteInstructionsStep(chip) {
    console.log("removing chop input");
    var array = [...this.state.instructionsChip]; // make a separate copy of the array
    var index = array.indexOf(chip);
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
    console.log(event.target);
    if (event.target.value) {
      this.setState({ currentIngredient: event.target.value });
    } else {
      this.setState({ currentIngredient: event.target.innerHTML });
    }
  }
  handleIngredientMeasurement(event) {
    if (event.target.value) {
      this.setState({ currentIngredientMeasurement: event.target.value });
    } else {
      this.setState({ currentIngredientMeasurement: event.target.innerHTML });
    }
  }

  addIngredientToMeal(event) {
    event.preventDefault();
    console.log(this.state.currentIngredientMeasurement);
    var properIngredientStringSyntax;

    if (document.getElementById("currentIngredient").value === "") {
      window.alert("Enter an ingredient to add to meal");
      return;
    }

    if (this.state.currentIngredientQuantity === 0) {
      properIngredientStringSyntax = document.getElementById(
        "currentIngredient"
      ).value;
    } else if (
      document.getElementById("currentIngredientMeasurement").value === null
    ) {
      properIngredientStringSyntax =
        "" +
        this.state.currentIngredientQuantity +
        " " +
        document.getElementById("currentIngredient").value;
    } else {
      properIngredientStringSyntax =
        "" +
        this.state.currentIngredientQuantity +
        " " +
        document.getElementById("currentIngredientMeasurement").value +
        " of " +
        document.getElementById("currentIngredient").value;
    }
    var currIngredientObject = {
      product: this.state.currentIngredient,
      quantity: this.state.currentIngredientQuantity,
      measurement: this.state.currentIngredientMeasurement,
    };
    console.log(properIngredientStringSyntax);
    this.handleAddIngredientChip(properIngredientStringSyntax);
    this.setState({
      formatted_ingredient: [
        ...this.state.formatted_ingredient,
        currIngredientObject,
      ],
    });
    // this.state.currentIngredientMeasurement +
  }
  // use function format to allow for use of this.state
  // within a component function
  sendSuggestedMealToDB = (e) => {
    // e.preventDefault();
    console.log("Comes in suggest meal func");
    // get our form data out of state
    const {
      mealLabel,
      intro,
      servings,
      ingredientStrings,
      formatted_ingredient,
      instructionsChip,
      imgSrc,
      readTime,
      cookTime,
      categoryChips,
    } = this.state;

    if (mealLabel === "") {
      console.log("meal label blank");
      return;
    }
    console.log("ingredient chips are:");
    console.log(ingredientStrings);
    if (ingredientStrings.length === 0) {
      window.alert(
        "Suggested meal requires adding at least one ingredient to submit"
      );
      return;
    }

    var url = "/api/addMealSuggestion/";
    console.log("gets to call fetch");

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mealLabel,
        intro,
        servings,
        formatted_ingredient,
        instructionsChip,
        ingredientStrings,
        imgSrc,
        readTime,
        cookTime,
        categoryChips,
      }),
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response);
          console.log("Display Meal submitted successfully");
          // return response;
          // window.location.reload();
        } else {
          console.log("Somthing happened wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    var instructionSteps = (
      <ol className="mdc-list">
        {this.state.instructionsChip.map((chip) => (
          <li className="mdc-list-item" tabIndex="0">
            <span className="mdc-list-item__text">{chip}</span>
          </li>
        ))}
      </ol>
    );

    return (
      <div>
        <div id="title">
          <b>Suggestions</b>
        </div>

        <div style={{ textAlign: "center" }}>
          <br></br>
          {/* add hash action so that form does not reload on enter or button click */}
          <form autoComplete="off" action="#">
            <TextField
              id="mealLabel"
              onChange={this.onTextFieldChange}
              label="Meal Name"
              required
              variant="filled"
            />
            <br></br>
            <TextField
              multiline
              id="intro"
              onChange={this.onTextFieldChange}
              label="Intro"
              variant="filled"
            />
            <br></br>
            <TextField
              id="servings"
              type="number"
              onChange={this.onTextFieldChange}
              label="Servings"
              variant="filled"
              placeholder="1 person, 2, 4 or 10 people"
            />
            <br></br>
            {/*  Be able to display product images on clock */}
            <ChipInput
              label="IngredientsList"
              value={this.state.ingredientStrings}
              onAdd={(chip) => this.handleAddIngredientChip(chip)}
              placeholder="e.g 1 Onion, 2 Cups of Water, etc"
              onDelete={(chip, index) =>
                this.handleDeleteIngredientChip(chip, index)
              }
              variant="filled"
            />
            <br></br>
            <div>
              {/* <select onChange={this.handleIngredientDropdownChange}>
                {productOptions}
              </select> */}

              <Autocomplete
                id="currentIngredient"
                options={this.products.map((option) => option)}
                onChange={this.handleIngredientDropdownChange}
                // style={{ width: 200 }}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ingredient.."
                    variant="filled"
                  />
                )}
              />

              <TextField
                id="currentIngredientQuantity"
                type="number"
                onChange={this.onTextFieldChange}
                label="Quantity"
                variant="filled"
                placeholder="1.."
              />

              <Autocomplete
                id="currentIngredientMeasurement"
                options={this.measurements.map((option) => option)}
                onChange={this.handleIngredientMeasurement}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Measurement.."
                    variant="outlined"
                  />
                )}
              />
              <button onClick={this.addIngredientToMeal}>
                {" "}
                Add Ingredient +{" "}
              </button>

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
              onDelete={(chip, index) =>
                this.handleDeleteInstructionsStep(chip, index)
              }
            />
            <br></br>
            {/* <TextField id="instructions" onChange={this.onChange} label="Instructions" variant="filled" /><br></br> */}
            <TextField
              id="imgsrc"
              type="file"
              onChange={this.onTextFieldChange}
              label="Upload meal image"
              variant="filled"
            />
            <br></br>
            {/* <input type="file" name="file-input" multiple /><br></br>  */}
            {/* {...props} */}
            <TextField
              id="readTime"
              type="number"
              onChange={this.onTextFieldChange}
              label="ReadTime (mins)"
              variant="filled"
              required
            />{" "}
            <br></br>
            <TextField
              id="cookTime"
              type="number"
              onChange={this.onTextFieldChange}
              label="CookTime (mins)"
              variant="filled"
              required
            />
            <br></br>
            <Autocomplete
              multiple
              id="tags-filled"
              options={this.categories.map((option) => option)}
              defaultValue={[this.categories[0]]}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Categories"
                  placeholder="Suggest categories for this meal.."
                />
              )}
            />
            <br></br>
            <button onClick={this.sendSuggestedMealToDB}> Suggest Meal </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SuggestMeal;
