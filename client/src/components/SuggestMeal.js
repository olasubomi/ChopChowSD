import React, { Component, useState } from "react";
import TextField from "@material-ui/core/TextField";
import ChipInput from "material-ui-chip-input";
// import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete"; // createFilterOptions,
// import axios from 'axios';
import axios from '../util/Api';
import { Container, Row, Col } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PreviewMealsPage from "./mealsPage/PreviewMealsPage";

// import ProductsPageModal from "./ProductsPageModal";
var FormData = require('form-data');

// var fs = require('fs');


class SuggestMeal extends Component {
  ingredientsQuantityMeasurements = [];

  constructor(props) {
    super(props);
    this.state = {
      mealName: "",
      mealImage: "",
      mealImageName: "",
      intro: "",

      ingredientNames: [],
      // do we need product group list AND strings ?
      ingredientGroupList: [],
      // store product names of inputted strings to compare with db products
      ingredientStrings: [],
      // do we want to use current ingredient formats ? Yes.
      currentIngredient: "",
      currentIngredientMeasurement: "",
      currentIngredientQuantity: "",
      currentProductImgSrc: null,
      currentProductDisplayIndex: 0,

      currentStore: "",

      // we need to update how we create image paths
      productImg_path: "",
      // product_ind: 0,
      // this is similar to how we will check for new Products from existing products

      // new_product_ingredients: [{
      //   productName: "",
      //   productImgFile: undefined,
      //   productImgPath: null,
      //   // these are added to ingredient packets on submit, and not relevant in product object details
      //   quantity: 0,
      //   measurement: null,
      // }],
      new_product_ingredients: [],

      suggested_stores: [],

      currProductIndexInDBsProductsList: -1,
      // currStoreIndexIfExistsInProductsList: -1,


      suggestedUtensils: [],

      cookTime: 0,
      prepTime: 0,

      stepSlides: [],

      instructionChunk6: {
        title: "",
        instructionSteps: [],
        dataName: ""
      },
      instructionChunk1: {
        title: "",
        instructionSteps: [],
        dataName: ""
      },
      instructionChunk2: {
        title: "",
        instructionSteps: [],
        dataName: ""
      },
      instructionChunk3: {
        title: "",
        instructionSteps: [],
        dataName: ""
      },
      instructionChunk4: {
        title: "",
        instructionSteps: [],
        dataName: ""
      },
      instructionChunk5: {
        title: "",
        instructionSteps: [],
        dataName: ""
      },

      chunk1Content: "",
      chunk2Content: "",
      chunk3Content: "",
      chunk4Content: "",
      chunk5Content: "",
      chunk6Content: "",

      // do we want all the instruction variables ?
      // instructionGroupList:[],

      instructionimagesAndVideos: [],

      chef: "",
      suggestedCategories: [],
      servings: 0,
      tips: [],

      booleanOfDisplayOfDialogBoxConfirmation: false,
    };

    this.handleIngredientMeasurement = this.handleIngredientMeasurement.bind(this);
    // this.handleIngredientQuantity = this.handleIngredientQuantity.bind(this);
    this.addIngredientToMeal = this.addIngredientToMeal.bind(this);
    this.updateChef = this.updateChef.bind(this);
    this.updateTip = this.updateTip.bind(this);
    this.handleAddInstructionStep = this.handleAddInstructionStep.bind(this);
    this.handleInstructionTitle = this.handleInstructionTitle.bind(this);

    this.handleUtensilsDropdownChange = this.handleUtensilsDropdownChange.bind(this);
    // this.openProductDetailsModal = this.openProductDetailsModal.bind(this);
    this.handleProductNameInput = this.handleProductNameInput.bind(this);
    // this.handleStoreNameInput = this.handleStoreNameInput.bind(this);

    // this.getProductIndex = this.getProductIndex.bind(this);
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {

    // get all Meal Names***
    var url = "/get-meals";
    axios.get(url).then((body) => {
      var mealList = body.data;
      if (mealList && mealList.data.length !== 0) {
        console.log("returns GET of ALL MEALS ");
        for (var i = 0; i < mealList.data.length; i++) {
          this.props.allMealNames.push(mealList.data[i].label);
        }
      } else {
        console.log("get all meal names function does not return");
      }
    })
      .catch((err) => {
        console.log(err);
      });

    console.log(this.allMealNames);
    // get all store names*, if NEW products section exists.

    // can redux resolve this for us by checking if we recently called this in cache or from another page ??
    // var url = "/get-all-products";
    url = "http://chopchowdev.herokuapp.com/get-all-products";

    // axios.get(url).then((body) => {
    //   this.productsList = body.data;
    //   if (this.productsList && this.productsList.data.length !== 0) {
    //     console.log("returns GET ALL PRODUCTS ");
    //     for (var i = 0; i < this.productsList.data.length; i++) {
    //       this.productNames.push(this.productsList.data[i].product_name);
    //       this.productImageLink.push(this.productsList.data[i].product_image);
    //     }       
    //   } else {
    //     console.log("get all products function does not return");
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    //----get category meals-------------------------
    url = "/get-all-categories";
    axios.get(url).then((body) => {
      var categoriesFromDBList = body.data;
      if (categoriesFromDBList && categoriesFromDBList.data.length !== 0) {
        console.log("returns GET of ALL Categories ");

        for (var i = 0; i < categoriesFromDBList.data.length; i++) {
          this.categories.push(categoriesFromDBList.data[i].category_name);
        }
        console.log("PRINTING UPDATED CATEGORIES LIST");
      } else {
        console.log("get all products function does not return");
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleClose = () => {
    this.setState({ booleanOfDisplayOfDialogBoxConfirmation: false });
    // close out of state tracker..
    // productDisplayBooleansOutOfState[index] = false;
  };

  //////////////////////////////////////////////////////////////////////////////////////////////
  openProductDetailsModal = (index) => {
    // toggle products page visibility for product to be Edited.
    // this.productDisplayBooleansOutOfState[this.state.ingredientGroupList.length] = false;
    // this.productDisplayBooleansOutOfState[index] = true;

    // var tmpIngredientGroupList = this.state.ingredientGroupList;
    // tmpIngredientGroupList[index].display = true;
    // tmpIngredientGroupList[currentProductDisplayIndex].display = false;
    // this.setState({ingredientGroupList: tmpIngredientGroupList});
    console.log("Comes in toggle product details div id. Index is : " + index);

    var individualProductDisplay = document.getElementById("ProductAdditionalDataDisplayed");
    console.log(individualProductDisplay);

    if (individualProductDisplay.style.display === "block") {
      individualProductDisplay.style.display = "none";
    }
    else {
      individualProductDisplay.style.display = "block";
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  onTextFieldChange = (e) => {
    console.log("Comes in on text field change; ");

    console.log(" " + [e.target.id] + " " + e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  onInputChange = (e) => {
    console.log("Comes in on text field change; ");

    console.log(" " + [e.target.id] + " " + e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  onUpdateMealImage = (event) => {
    if (event.target.files[0] === undefined) return;
    this.setState({ mealImage: event.target.files[0], mealImageName: event.target.files[0].name });

    // Allowing file type
    var allowedImageExtensions = /(\.jpg|\.jpeg|\.png|\.)$/i;

    if (allowedImageExtensions.exec(event.target.files[0].name)) {
      //display meals main image or videoin suggest meal
      var image = document.getElementById("MealsMainImages");
      image.style.display = "block";
      image.src = URL.createObjectURL(event.target.files[0]);

      console.log(event.target.files[0]);
      console.log(event.target.files[0].name);


      console.log(allowedImageExtensions.exec(event.target.files[0].name));

      // console.log(URL.createObjectURL(event.target.files[0]));
    }
    else {
      alert("Invalid image type");
    }

  };

  ///////////////////////////////////////////////////////////////////////////////////////
  onhandleInstructionImg = (event, id) => {
    if (event.target.files[0] === undefined) return;

    console.log("uploading recipeChunkImageOrVideo content looks like below: ");
    console.log(event.target.files[0]);

    switch (id) {
      case 1:
        this.setState({ chunk1Content: event.target.files[0] });
        break;
      case 2:
        this.setState({ chunk2Content: event.target.files[0] });
        break;
      case 3:
        this.setState({ chunk3Content: event.target.files[0] });
        break;
      case 4:
        this.setState({ chunk4Content: event.target.files[0] });
        break;
      case 5:
        this.setState({ chunk5Content: event.target.files[0] });
        break;
      case 6:
        this.setState({ chunk6Content: event.target.files[0] });
        break;
      default:
      // ..do nothing
    }

    // this.setState({ instructionimagesAndVideos: recipeChunkImageOrVideo });


    // Allowing file type
    var allowedImageExtensions = /(\.jpg|\.jpeg|\.png|\.)$/i;
    var allowedVideoExtensions = /(\.mp4|\.m4v|\.)$/i;

    var imageElementId = "chunk" + (id) + "Image";
    var videoElementId = "chunk" + (id) + "Video";
    var image = document.getElementById(imageElementId);
    var video = document.getElementById(videoElementId);

    // console.log(allowedImageExtensions.exec(event.target.files[0].name));

    // we need to keep track of wether an image or video was last uploaded and use the last one only.
    if (allowedImageExtensions.exec(event.target.files[0].name)) {
      //display meals main image or videoin suggest meal
      image.style.display = "block";
      video.style.display = "none";

      image.src = image.src = URL.createObjectURL(event.target.files[0]);
    }
    else if (allowedVideoExtensions.exec(event.target.files[0].name)) {
      //display meals main image or videoin suggest meal
      video.style.display = "block";
      image.style.display = "none";

      // var video_source = document.getElementById(videoElementId+'Source');
      // video_source.src =  URL.createObjectURL(event.target.files[0]);
      video.src = URL.createObjectURL(event.target.files[0]);

      video.play();
      // console.log(URL.createObjectURL(event.target.files[0]));
      console.log(event.target.files[0]);
    }
    else {
      alert('Invalid file type');
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////
  onUpdateInstructionImg = (event, ind) => {
    if (event.target.files[0] === null) return;

    // const tmp_instructionData = this.state.instructionGroupList;
    // const tmp_instructionItem = tmp_instructionData[ind];

    const temp_instructionImageOrVideoArray = this.state.instructionimagesAndVideos;
    // const individual_ImageOrVideo = temp_instructionImageOrVideoArray[ind];

    // tmp_instructionData[ind] = tmp;
    temp_instructionImageOrVideoArray[ind] = event.target.files[0];

    // this.setState({instructionGroupList: tmp_instructionData});
    this.setState({ instructionimagesAndVideos: temp_instructionImageOrVideoArray });
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  updateChef() {
    var chefName = document.getElementById("chef").value;
    this.setState({ chef: chefName })
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  updateTip(chip) {
    // var mealTip = document.getElementById("tips").value;
    let tipsList = this.state.tips;
    this.setState({ tips: [...this.state.tips, chip] })
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  deleteTip(chip) {
    // var mealTip = document.getElementById("tips").value;
    let tipsList = this.state.tips;

    var index = tipsList.indexOf(chip);
    if (index !== -1) {
      tipsList.splice(index, 1);
      this.setState({ tips: tipsList });
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////
  handleProductNameInput = (event, val) => {

    console.log("In handleProductNameInput . \n val is: " + val);
    if (val !== undefined && val !== null) {
      // CHECK IF INPUT MATCHES ANY PRODUCT ALREADY IN DB and
      // set currProductIndexInDBsProductsList variable 
      const searchResult = this.props.productNames.map(function callback(element) { if (element.toLowerCase() === (val.toLowerCase())) { return true; } else { return false; } });
      const tmpcurrProductIndexInDBsProductsList = searchResult.indexOf(true);
      console.log("Curr Product Index If Exists In Products List is: \n" + tmpcurrProductIndexInDBsProductsList);

      // check if product name is an existing product
      // set product existense to index, so one will not need to edit
      this.setState({ currProductIndexInDBsProductsList: tmpcurrProductIndexInDBsProductsList });

      // set current ingredient to input Product regardless
      // console.log("Event is: \n"+ event.target);
      if (event != null && event.target.value !== null) {
        this.setState({ currentIngredient: event.target.innerHTML });

      } else {
        this.setState({ currentIngredient: val });
      }
    }
    else {
      console.log('val is null or undefined');
    }
  }

  // getProductIndex(){
  //   this.productDisplayBooleansOutOfState.map(function(key, value){
  //     if(value == true){
  //       return key;
  //     }
  //   })
  // };
  ///////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////
  handleAddIngredientChip(chip) {
    this.setState({
      ingredientStrings: [...this.state.ingredientStrings, chip],
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  deleteNewIngredientFromNewProductPopUp = (ind) => {
    var array = this.state.ingredientStrings;
    var removeFromGroup = this.state.ingredientGroupList;
    var tmpNewProductsList = this.state.new_product_ingredients;
    // dont we need to get the specific index from new products list and ingredient group list ?
    if (ind !== -1) {
      array.splice(ind, 1);
      removeFromGroup.splice(ind, 1);
      tmpNewProductsList.splice(ind, 1);
      this.setState({ ingredientStrings: array, ingredientGroupList: removeFromGroup, new_product_ingredients: tmpNewProductsList });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleDeleteIngredientChip(chip) {
    var array = this.state.ingredientStrings; // make a separate copy of the array
    var removeFromGroup = this.state.ingredientGroupList;

    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      removeFromGroup.splice(index, 1);

      this.setState({ ingredientStrings: array, ingredientGroupList: removeFromGroup });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // handleIngredientQuantity(event) {
  //   console.log(event.target.value);
  //   this.setState({ currentIngredientQuantity: event.target.value });
  // }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleIngredientMeasurement(event, val) {
    // if (event.target.value) {
    //   this.setState({ currentIngredientMeasurement: event.target.value });
    // } else {
    //   this.setState({ currentIngredientMeasurement: "" });
    // }

    console.log("In handleIngredientMeasurement . \n val is: " + val);

    if (val !== null && val !== undefined) {
      // CHECK IF INPUT MATCHES ANY PRODUCT ALREADY IN DB and
      // set currProductIndexInDBsProductsList variable 
      const searchResult = this.props.measurements.map(function callback(element) { if (element.toLowerCase() === (val.toLowerCase())) { return true; } else { return false; } });
      const tmpcurrMeasurementIndexInDBsMeasurementList = searchResult.indexOf(true);
      console.log("Curr Product Index If Exists In Products List is: \n" + tmpcurrMeasurementIndexInDBsMeasurementList);

      // check if product name is an existing product
      // set product existense to index, so one will not need to edit
      // this.setState({ currProductIndexInDBsProductsList: tmpcurrMeasurementIndexInDBsMeasurementList });

      // set current ingredient to input Product regardless
      // console.log("Event is: \n"+ event.target);
      if (event != null && event.target.value !== null) {
        this.setState({ currentIngredientMeasurement: event.target.innerHTML });

      } else {
        this.setState({ currentIngredientMeasurement: val });
      }
    }
    else {
      console.log('val is null!');
    }
  }




  handleInstructionTitle(event, chunkIndex) {
    console.log("Index is : " + chunkIndex);
    let chip = event.target.value;
    console.log("Chip is : " + chip);

    let particularArray;

    switch (chunkIndex) {
      case 1:
        particularArray = this.state.instructionChunk1;
        particularArray.title = chip;
        this.setState({ instructionChunk1: particularArray });
        break;
      case 2:
        particularArray = this.state.instructionChunk2;
        particularArray.title = chip;
        this.setState({ instructionChunk2: particularArray });
        break;
      case 3:
        particularArray = this.state.instructionChunk3;
        particularArray.title = chip;
        this.setState({ instructionChunk3: particularArray });
        break;
      case 4:
        particularArray = this.state.instructionChunk4;
        particularArray.title = chip;
        this.setState({ instructionChunk4: particularArray });
        break;
      case 5:
        particularArray = this.state.instructionChunk5;
        particularArray.title = chip;
        this.setState({ instructionChunk5: particularArray });
        break;
      case 6:
        particularArray = this.state.instructionChunk6;
        particularArray.title = chip;
        this.setState({ instructionChunk6: particularArray });
        break;
      default:
      // ..do nothing
    }

  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleAddInstructionStep(chip, chunkIndex) {

    var particularArray;

    console.log("Index is : " + chunkIndex);

    switch (chunkIndex) {
      case 1:
        particularArray = this.state.instructionChunk1;
        particularArray.instructionSteps = [...this.state.instructionChunk1.instructionSteps, chip]
        this.setState({ instructionChunk1: particularArray });
        break;
      case 2:
        particularArray = this.state.instructionChunk2;
        particularArray.instructionSteps = [...this.state.instructionChunk2.instructionSteps, chip]
        this.setState({ instructionChunk2: particularArray });
        break;
      case 3:
        particularArray = this.state.instructionChunk3;
        particularArray.instructionSteps = [...this.state.instructionChunk3.instructionSteps, chip]
        this.setState({ instructionChunk3: particularArray });
        break;
      case 4:
        particularArray = this.state.instructionChunk4;
        particularArray.instructionSteps = [...this.state.instructionChunk4.instructionSteps, chip]
        this.setState({ instructionChunk4: particularArray });
        break;
      case 5:
        console.log("Comes in here too");
        particularArray = this.state.instructionChunk5;
        particularArray.instructionSteps = [...this.state.instructionChunk5.instructionSteps, chip]
        this.setState({ instructionChunk5: particularArray });
        break;
      case 6:
        particularArray = this.state.instructionChunk6;
        particularArray.instructionSteps = [...this.state.instructionChunk6.instructionSteps, chip]
        this.setState({ instructionChunk6: particularArray });
        break;
      default:
      // ..do nothing
    }

  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleDeleteInstructionsStep(chip, chunkIndex) {
    console.log("In delete instruction step/chip")
    console.log("Chip is " + chip);
    console.log("Index is " + chunkIndex);

    let particularArray;
    let index;
    let arraySteps;

    switch (chunkIndex) {
      case 1:
        particularArray = this.state.instructionChunk1; // make a separate copy of the array
        arraySteps = particularArray.instructionSteps
        index = arraySteps.indexOf(chip);
        if (index !== -1) {
          arraySteps.splice(index, 1);
          particularArray.instructionSteps = arraySteps;
          console.log("new array : \n"+ particularArray);
          this.setState({ instructionChunk1: particularArray });
        }
        break;
      case 2:
        particularArray = this.state.instructionChunk2; // make a separate copy of the array
        arraySteps = particularArray.instructionSteps
        index = arraySteps.indexOf(chip);
        if (index !== -1) {
          arraySteps.splice(index, 1);
          particularArray.instructionSteps = arraySteps;
          this.setState({ instructionChunk2: particularArray });
        }
        break;
      case 3:
        particularArray = this.state.instructionChunk3; // make a separate copy of the array
        arraySteps = particularArray.instructionSteps
        index = arraySteps.indexOf(chip);
        if (index !== -1) {
          arraySteps.splice(index, 1);
          particularArray.instructionSteps = arraySteps;
          this.setState({ instructionChunk3: particularArray });
        }
        break;
      case 4:
        particularArray = this.state.instructionChunk4; // make a separate copy of the array
        arraySteps = particularArray.instructionSteps
        index = arraySteps.indexOf(chip);
        if (index !== -1) {
          arraySteps.splice(index, 1);
          particularArray.instructionSteps = arraySteps;
          this.setState({ instructionChunk4: particularArray });
        }
        break;
      case 5:
        particularArray = this.state.instructionChunk5; // make a separate copy of the array
        arraySteps = particularArray.instructionSteps
        index = arraySteps.indexOf(chip);
        if (index !== -1) {
          arraySteps.splice(index, 1);
          particularArray.instructionSteps = arraySteps;
          this.setState({ instructionChunk5: particularArray });
        }
        break;
      case 6:
        particularArray = this.state.instructionChunk6; // make a separate copy of the array
        arraySteps = particularArray.instructionSteps
        index = arraySteps.indexOf(chip);
        if (index !== -1) {
          arraySteps.splice(index, 1);
          particularArray.instructionSteps = arraySteps;
          this.setState({ instructionChunk6: particularArray });
        }
        break;
      default:
      // ..do nothing
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleKitchenUtensilInputName = (val) => {
    this.setState({ suggestedUtensils: val });

    // causees error when testing in request payload
    // var tmpKitchenUtenails = [...this.state.suggestedUtensils]
    // this.setState({ suggestedUtensils: [tmpKitchenUtenails, val] });
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  handleUtensilsDropdownChange(event) {
    if (event.target.value) {
      this.setState({ suggestedUtensils: [...this.state.suggestedUtensils, event.target.value] });
    } else {
      this.setState({ suggestedUtensils: [...this.state.suggestedUtensils, event.target.innerHTML] });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleDeleteUtensilsChip(chip) {
    var array = [...this.state.suggestedUtensils]; // make a separate copy of the array
    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ suggestedUtensils: array });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleAddCategoryChip(chip) {
    this.setState({ suggestedCategories: [...this.state.suggestedCategories, chip] });

    // new categories are created and handled on submit meal simply


  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleCategoryDropdownChange = (val) => {
    this.setState({ suggestedCategories: val });
    // below setstate causes an error to make each new set a sum of all previous.
    // this.setState({ suggestedCategories: [...this.state.suggestedCategories, val] });

  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleDeleteCategoryChip(chip) {
    var array = [...this.state.suggestedCategories]; // make a separate copy of the array
    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ suggestedCategories: array });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  addIngredientToMeal(event) {
    console.log("COMES IN addIngredientToMeal");
    event.preventDefault();
    var properIngredientStringSyntax;
    var ingredientValue = document.getElementById("currentIngredient").value;
    var quantityValue = document.getElementById("currentIngredientQuantity").value;
    // best to get the measurement from the state
    // perhaps becuse inner html is defined before state is updated
    // var measurementValue = this.state.currentIngredientMeasurement;
    var measurementValue = document.getElementById("currentIngredientMeasurement").value;


    if (ingredientValue === "") { window.alert("Enter an ingredient to add to meal"); return; }
    // update ingredient string syntax for no quantity or no measurement.
    if (quantityValue === "") {
      properIngredientStringSyntax = ingredientValue;
    } else if (measurementValue === "" && quantityValue !== "") {
      // MAKE sure we are using the right and tested variables to display the right type of string at all times.
      properIngredientStringSyntax = "" + quantityValue + " " + ingredientValue;
    } else {
      properIngredientStringSyntax =
        "" + quantityValue + " " + measurementValue +
        " of " + ingredientValue;
    }
    console.log(properIngredientStringSyntax);

    // This is the Object for an Ingredient of a Known Product
    var currIngredientObject = {
      // productName: this.state.currentIngredient,  
      productName: ingredientValue,
      // productImgFile: this.state.currentProductImgSrc,
      productImgPath: null,
      // display: this.state.currProductIndexInDBsProductsList,
      // availableLocations: [],

      // these are added to ingredient packets on submit, and not relevant in product object details
      quantity: quantityValue,
      measurement: measurementValue,
      properIngredientStringSyntax: properIngredientStringSyntax
    };

    console.log("current state of product index at Add Ingredient To Meal is : \n" + this.state.currProductIndexInDBsProductsList);

    const searchResult = this.props.productNames.map(function callback(element) { if (element.toLowerCase() === (ingredientValue.toLowerCase())) { return true; } else { return false; } });
    const tmpcurrProductIndexInDBsProductsList = searchResult.indexOf(true);
    console.log("Curr Product Index If Exists In Products List is: \n" + tmpcurrProductIndexInDBsProductsList);


    if (tmpcurrProductIndexInDBsProductsList !== -1) {
      console.log("using already existing product object from db");

      // necessary, but we first need to get the index of the product
      // to assign the path to current object productImageLink
      // if we are able to get this ingredient id then we can pass its image
      // index in products list is different from that of ingredients group list

      currIngredientObject.productImgPath = this.productImageLink[this.state.currProductIndexInDBsProductsList];
      console.log("DOES NOT ADD to new _product_ingredients");

    }
    else {
      console.log("ADDs to new_product_ingredients");

      console.log("creating new product object");

      // edit product details for new product object
      // currIngredientObject.productImgFile = null;
      currIngredientObject.productIndex = 0;
      // currIngredientObject.calories = 0;

      // append String to new Products array if not
      // var tmpNewProducts = [...this.state.new_product_ingredients];
      // var tmpNewProducts = this.state.new_product_ingredients;
      // var updatedProductList = [tmpNewProducts, currIngredientObject];

      // this.setState({ new_product_ingredients: updatedProductList })
      this.setState({ new_product_ingredients: [...this.state.new_product_ingredients, currIngredientObject] });

    }

    this.setState({ ingredientGroupList: [...this.state.ingredientGroupList, currIngredientObject] });
    // after adding product to ingredient group list
    // reset current product img src and path to null, and same for current ingredient inputs
    this.setState({ currentProductImgSrc: null, productImg_path: "" });
    this.setState({ currentIngredient: "null", currentIngredientQuantity: '', currentIngredientMeasurement: "null" });
    this.setState({ currentIngredient: "", currentIngredientMeasurement: "" });
    this.handleAddIngredientChip(properIngredientStringSyntax);

    //  Resetting inner html directly to clear ingredient inputs without changing state
    // document.getElementById("currentIngredient").value = 'NewPs';
    // document.getElementById("currentIngredientQuantity").value = 8;
    // document.getElementById("currentIngredientMeasurement").value = 'Removed';

  }


  ///////////////////////////////////////////////////////////////////////////////////////
  sendSuggestedMealToDB = async (e) => {
    const { mealName, prepTime, cookTime, mealImage, mealImageName, intro, servings, chef, new_product_ingredients, ingredientStrings, ingredientGroupList, suggestedCategories, tips, suggestedUtensils, } = this.state;

    // handle edge case meal name, ingredienrs or image upload required to submit form
    if (mealName === "") { console.log("meal label blank"); return; }
    // if (ingredientStrings.length === 0) { window.alert("Suggested meal requires adding at least one ingredient to submit"); return; }
    if (mealImage === null || mealImage === undefined) { window.alert("You didn't add suggested meal image"); return; }

    // Handle instruction/product images to create url for product images on server
    /*Loop through Ingredients meal data
    Check if all products listed exist in the database.
    If not, let server create placeholder before submitting to db.
    Get list of new products and new Categories

    This for loop is making sure we are building a product_slider.
    we could probably merge this in the above for loop easily, but we want to call this path function,
    so lets figure out what its even doing!*/

    const all_ingredients_formatted = [];
    const product_slider = [];
    const new_products = [];
    let i = 0;
    for (i = 0; i < new_product_ingredients.length; i++) {
      // store ingredient format to submit ingredient product objects
      var tmp_ingredient = {
        // name and optional image added to new product,
        // we can add remainder products data after testing current
        ingredient: new_product_ingredients[i].productName,
        image: new_product_ingredients[i].productImgFile
      };

      // handle quantity measurement list
      var measurementQuantity = {
        quantity: ingredientGroupList[i].quantity,
        measurement: ingredientGroupList[i].measurement,
      }

      // no need for handlers since this is created on submit!
      this.ingredientsQuantityMeasurements.push(measurementQuantity);

      // new_products.push(tmp_ingredient);
      // product_slider.push(tmp_slider_data);
    }

    let new_measurements = [];
    for (i = 0; i < ingredientGroupList.length; i++) {
      // store ingredient format to submit ingredient product objects
      var tmp_ingredient = {
        // name and optional image added to new product,
        // we can add remainder products data after testing current
        productName: ingredientGroupList[i].productName,
        quantity: ingredientGroupList[i].quantity,
        measurement: ingredientGroupList[i].measurement,
        productImgPath: ingredientGroupList[i].productImgPath,
        properIngredientStringSyntax: ingredientGroupList[i].properIngredientStringSyntax
      };

      all_ingredients_formatted.push(tmp_ingredient);
      console.log(tmp_ingredient);

      const tmp_slider_data = {
        ingredient: ingredientGroupList[i].product,
        image: ingredientGroupList[i].productImgPath,
        display: ingredientGroupList[i].display,
      };
      // store product slider format to submit slider object to meal
      product_slider.push(tmp_slider_data);


      // get new_Measurements from inputted ingredient packets
      if (ingredientGroupList[i].measurement !== "") {
        let index = this.props.measurements.indexOf(ingredientGroupList[i].measurement);
        if (index === -1) new_measurements.push(ingredientGroupList[i].measurement);
      }
    }
    //-------------to make new category data ------------------------------------------
    // get list of new categories to submit to mongo
    let new_categories = [];
    for (i = 0; i < suggestedCategories.length; i++) {
      // check if categories already exist, only add new categories to db,
      // though all will still be attached to meal, as mentioned
      let index = this.categories.indexOf(suggestedCategories[i]);
      if (index === -1) new_categories.push(suggestedCategories[i]);
    }

    let new_kitchen_utensils = [];
    for (i = 0; i < suggestedUtensils.length; i++) {
      // check if categories already exist, only add new categories to db,
      // though all will still be attached to meal, as mentioned
      let index = this.props.kitchenUtensils.indexOf(suggestedUtensils[i]);
      if (index === -1) new_kitchen_utensils.push(suggestedUtensils[i]);
    }

    //prepare Meal data to Mongo and Recipe Steps Images and Video content to s3
    const instructionGroupData = [];
    const contentNameToContentImageOrVideoMapForS3 = new FormData();
    console.log("Meal name:");
    console.log(this.state.mealName);

    // max recipe chunks is 6
    for (i = 0; i < 6; i++) {
      var contentKey = 'instructionChunkContent' + (i + 1);
      console.log(this.state.instructionimagesAndVideos[i]);
      // add image or video to recipecontent array
      if (this.state.instructionimagesAndVideos[i] !== undefined) {
        console.log("Comes in here to send individual content");
        console.log(this.state.instructionimagesAndVideos[i]);
        // contentNameToContentImageOrVideoMapForS3.append( "mealContentName" , contentKey);
        contentNameToContentImageOrVideoMapForS3.append(contentKey, this.state.instructionimagesAndVideos[i]);
        // var fsReadStream = fs.createReadStream(this.state.instructionimagesAndVideos[i])
        // console.log(fsReadStream);
        // contentNameToContentImageOrVideoMapForS3.append( "Content", fs.readFile(contentKey, this.state.instructionimagesAndVideos[i],  function(err, data){
        //   // Display the file content
        //   console.log(data);
        // }));
        // contentNameToContentImageOrVideoMapForS3.append( "Content", fs.createReadStream(URL.createObjectURL(this.state.instructionimagesAndVideos[i])));
        // contentNameToContentImageOrVideoMapForS3.append( "mealContent", this.state.instructionimagesAndVideos[i]);
        console.log(contentNameToContentImageOrVideoMapForS3);
        //pass json as object rather than as file in json
        // const jsonFormattedMap = Object.fromEntries(contentNameToContentImageOrVideoMapForS3);
        // console.log(jsonFormattedMap);
      }



      let currInstructionChunk = [];
      // let chunkContent;
      switch (i) {
        case 1:
          currInstructionChunk = this.state.instructionChunk1;
          // dataname = this.state.chunk1Content.filename;
          break;
        case 2:
          currInstructionChunk = this.state.instructionChunk2;
          // chunkContent = this.state.chunk2Content;
          break;
        case 3:
          currInstructionChunk = this.state.instructionChunk3;
          // chunkContent = this.state.chunk3Content;
          break;
        case 4:
          currInstructionChunk = this.state.instructionChunk4;
          // chunkContent = this.state.chunk4Content;
          break;
        case 5:
          currInstructionChunk = this.state.instructionChunk5;
          // chunkContent = this.state.chunk5Content;
          break;
        case 6:
          currInstructionChunk = this.state.instructionChunk6;
          // chunkContent = this.state.chunk6Content;
          break;
        default:
          currInstructionChunk = "null";
      }

      // do not include and submite a step zero..
      if (i != 0) {
        let submitable_recipe_chunk = {
          step: i,
          // title is defined in instruction chunk
          instructionChunk: currInstructionChunk,
          // dataname : null
        }
        // allMealsInstructionimagesAndVideosCombined.push(contentNameToContentImageOrVideoMapForS3);
        instructionGroupData.push(submitable_recipe_chunk);
      }

    }

    contentNameToContentImageOrVideoMapForS3.append('mealContentName', this.state.mealName);
    console.log(contentNameToContentImageOrVideoMapForS3);
    var keyValueData = { mealContentName: this.state.mealName };
    // console.log("Stringified version:");
    // console.log(keyValueData);
    var singleTitleTest = JSON.stringify(keyValueData);
    console.log(singleTitleTest);


    //-------------Submit remainder data of meal to Mongo ------------------------------------------
    let suggestMealForm = new FormData();
    let s3Form = new FormData();

    suggestMealForm.append('mealName', mealName);
    suggestMealForm.append('mealImage', mealImage);
    suggestMealForm.append('mealImageName', mealImageName);

    suggestMealForm.append('prepTime', prepTime);
    suggestMealForm.append('cookTime', cookTime);

    suggestMealForm.append('intro', intro);
    suggestMealForm.append('mealTip', tips);
    suggestMealForm.append('chef', chef);
    suggestMealForm.append('servings', servings);

    // suggestMealForm.append('ingredientStrings', ingredientStrings);
    // list of products quantity measurements (created on submit meal)
    suggestMealForm.append('ingredientsQuantityMeasurements', JSON.stringify(this.ingredientsQuantityMeasurements));
    suggestMealForm.append('new_measurements', JSON.stringify(new_measurements));

    // suggestMealForm.append('product_slider', JSON.stringify(product_slider));
    suggestMealForm.append('formatted_ingredient', JSON.stringify(all_ingredients_formatted));

    // new suggested products
    suggestMealForm.append('new_product_ingredients', JSON.stringify(new_product_ingredients));

    suggestMealForm.append('categoryChips', JSON.stringify(suggestedCategories));
    suggestMealForm.append('newCategories', JSON.stringify(new_categories));

    suggestMealForm.append('kitchenUtensils', JSON.stringify(suggestedUtensils));
    suggestMealForm.append('newKitchenUtensils', JSON.stringify(new_kitchen_utensils));

    // RecipeSteps
    suggestMealForm.append('instructionsGroupList', JSON.stringify(instructionGroupData));


    // suggestMealForm.append('instructionsGroupList', instructionGroupData);
    console.log(this.state.chunk1Content);
    suggestMealForm.append('instructionData1Name', this.state.chunk1Content.filename);
    suggestMealForm.append('instructionData2Name', this.state.chunk2Content.filename);
    suggestMealForm.append('instructionData3Name', this.state.chunk3Content.filename);
    suggestMealForm.append('instructionData4Name', this.state.chunk4Content.filename);
    suggestMealForm.append('instructionData5Name', this.state.chunk5Content.filename);
    suggestMealForm.append('instructionData6Name', this.state.chunk6Content.filename);


    suggestMealForm.append('instructionChunkContent1', this.state.chunk1Content);
    suggestMealForm.append('instructionChunkContent2', this.state.chunk2Content);
    suggestMealForm.append('instructionChunkContent3', this.state.chunk3Content);
    suggestMealForm.append('instructionChunkContent4', this.state.chunk4Content);
    suggestMealForm.append('instructionChunkContent5', this.state.chunk5Content);
    suggestMealForm.append('instructionChunkContent6', this.state.chunk6Content);

    // -------------Save Instruction Content chunks to server ------------------------------------------
    // var url = "https://chopchowdev.herokuapp.com/api/addMealInstructionContent/";
    // var url = "http://localhost:5000/api/addMealInstructionContentToServerAndS3/";

    // // this st
    // fetch(url, {
    //   method: "POST",
    //   // credentials: "same-origin",
    //   //   headers: {
    //   //     "Content-type": "application/json"
    //   // },
    //   // body: contentNameToContentImageOrVideoMapForS3
    //   body: s3Form

    // })
    //   .then((response) => {
    //     response.json().then((res) => {
    //       console.log("Multer successfully stores to server ");
    //       console.log(res);
    //     });

    //   })
    //   .catch((err) => {
    //     console.log("Multer fails to submit meal content to database");
    //     console.log(err);
    //   });


    //-------------Submit instruction content to s3 after successful Multer save------------------------------------------
    // var url = "http://localhost:3000/api/transferToS3/";

    //  use axios instead of fetch for image and video http requests
    // const instructionContentConfigs = { method: 'POST', data: singleTitleTest, url: "http://localhost:3000/api/transferToS3/" };
    // const instructionContentConfigs = {  method: 'POST', url: "http://localhost:3000/api/addMealInstructionContent/", headers: {'Content-Type': 'multipart/form'}};

    // const axiosResponse = axios(instructionContentConfigs)

    // const response = await axios.post("http://localhost:3000/api/addMealInstructionContent/", contentNameToContentImageOrVideoMapForS3)
    // console.log(axiosResponse);

    //---------------------------------------------Submit Meal to Mongo---------------------------------------------------
    var url = "/addMealSuggestion/";

    const config = {
      method: 'POST', data: suggestMealForm, url: url,
      headers: {
        // 'application/json' is the modern content-type for JSON, but some
        // older servers may use 'text/json'.
        // See: http://bit.ly/text-json
        // application/x-www-form-urlencoded
        // 'content-type': 'multipart/form-data'
      }
    };

    console.log("Printing Chunk Contents");
    // console.log(suggestMealForm[instructionsGroupList]);
    //   for (var value of suggestMealForm.values()) {
    //     console.log(value);
    //  }

    //  console.log(this.state.chunk0Content);
    //  console.log(this.state.chunk1Content);
    //  console.log(this.state.chunk2Content);
    //  console.log(this.state.chunk3Content);
    //  console.log(this.state.chunk4Content);
    //  console.log(this.state.chunk5Content);
    var instructionData = JSON.parse(JSON.stringify(instructionGroupData));
    console.log(instructionData);

    axios(config).then(response => {
      if (response.status >= 200 && response.status < 300) {
        this.setState({ booleanOfDisplayOfDialogBoxConfirmation: true });
        console.log(response);
        console.log("Display Meal submitted successfully");
        // window.location.href = "/SuggestMeal"
      } else {
        console.log("Something wrong happened ");
      }
    }).catch(error => {
      console.log(error);
    });

  }

  ///////////////////////////////////////////////////////////////////////////////////////
  render() {

    // const [ingredientInput, setIngredientInput] = useState('');    

    const theme = createMuiTheme({
      palette: { primary: green },
    });
    const theme2 = createMuiTheme({
      palette: { primary: green },
    });

    const { categoryList, availableLocations, suggested_stores, new_product_ingredients, ingredientGroupList } = this.state;

    {/* // add product object slider with option to include images and available locations*/ }

    var preview = <PreviewMealsPage />

    return (
      <div>
        <br></br>
        <div style={{ width: "85%", margin: "auto", backgroundColor: "#f4f4f4" }}>
          <div style={{ padding: "20px", boxShadow: "1px 1px 4px 2px #00000030" }}>
            <div id="title" style={{ marginTop: "20px", marginBottom: "20px", }}>
              <b>Begin Suggesting Meal:</b>
            </div>
            <form noValidate autoComplete="off" encType="multipart/form-data" method="post" >
              <Row className="mb-3">
                <Col>
                  <Autocomplete
                    id="mealName"
                    options={this.props.allMealNames.map((option) => option)}
                    onChange={(ev) => this.onInputChange(ev)}
                    onInputChange={(ev, val) => this.onInputChange(ev, val)}
                    freeSolo
                    renderInput={(params) => (<TextField {...params} label="Meal Name" variant="filled" />)}
                    fullWidth
                    className="mb-3"
                    value={this.state.mealName}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <TextField id="prepTime" className="mb-2" type="number" fullWidth onChange={this.onTextFieldChange} label="PrepTime (mins)" variant="filled" required />
                </Col>
                <Col md={6}>
                  <TextField id="cookTime" className="mb-2" type="number" fullWidth onChange={this.onTextFieldChange} label="CookTime (mins)" variant="filled" required />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12} style={{ marginTop: "20px" }}>
                  <input accept="image/*,video/mp4,video/mov,video/x-m4v,video/*" id="mealImage" name="mealImage" type="file" className="mb-2 pr-4" onChange={(ev) => this.onUpdateMealImage(ev)} />
                  <p><img id="MealsMainImages" width="100%" alt="main_Meal_Image" style={{ display: "none" }} />
                  </p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <TextField multiline id="intro" fullWidth onChange={this.onTextFieldChange} label="Intro" variant="filled" className="mb-3 " />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <TextField id="servings" fullWidth type="number" onChange={this.onTextFieldChange} label="Serves" variant="filled" className="mb-3 " placeholder="1 person, 2, 4 or 10 people" />
                </Col>
                <Col md={6}>
                  <TextField id="chef" value={this.state.chef} fullWidth onChange={this.updateChef} label="Chef" variant="filled" className="mb-3 " />
                </Col>
              </Row>
              <b>Add Ingredients:</b>
              <hr />
              <Row className="mb-1">
                <Col>
                  <Autocomplete
                    id="currentIngredient"
                    options={this.props.productNames.map((option) => option)}
                    // onChange={(ev)=>this.onTextFieldChange(ev)}
                    value={this.state.currentIngredient}
                    onChange={(ev, val) => this.handleProductNameInput(ev, val)}
                    freeSolo
                    renderInput={(params) => (<TextField {...params} id="currentIngredient" label="ingredients"
                      value={this.state.currentIngredient} variant="filled" type="text"
                      onChange={this.onTextFieldChange}
                    />)}
                    fullWidth
                    className="mb-3"

                  />
                </Col>

              </Row>
              <Row className="mb-1">

                <Col md={5}>
                  <TextField fullWidth id="currentIngredientQuantity" type="number" onChange={this.onTextFieldChange}
                    label="Quantity" variant="filled" placeholder="1.." className="mb-3" value={this.state.currentIngredientQuantity} />
                </Col>

                <Col md={5}>
                  <Autocomplete
                    id="currentIngredientMeasurement"
                    options={this.props.measurements.map((option) => option)}
                    value={this.state.currentIngredientMeasurement}
                    onChange={this.handleIngredientMeasurement}
                    freeSolo
                    renderInput={(params) => (<TextField {...params}
                      value={this.state.currentIngredientMeasurement} id="currentIngredientMeasurement"
                      label="Measurements" variant="filled" type="text" onChange={this.onTextFieldChange} />)}
                    className="mb-3"
                  />
                </Col>

                <Col md={2} style={{ textAlign: "center", margin: "auto" }}>
                  <Button variant="contained" color="primary" disableRipple onClick={this.addIngredientToMeal} style={{ color: "white", width: "80%" }} className="mb-3" > Add Ingredient</Button>
                </Col>

              </Row>
              <Row className="mb-2">
                <Col md={12}>
                  <ChipInput
                    label="IngredientsList"
                    value={this.state.ingredientStrings}
                    onAdd={(chip) => this.handleAddIngredientChip(chip)}
                    placeholder="e.g 1 Onion, 2 Cups of Water, etc"
                    onDelete={(chip) => this.handleDeleteIngredientChip(chip)}
                    variant="filled"
                    fullWidth
                    className="mb-2"
                  />
                </Col>
              </Row>

              {/* // show all ingredients in two column table format */}
              {/* Show all Products in display format as expected in Meal Page*/}

              {/* <Container  >   */}
              <Container style={{ flex: "row-reverse" }} >


                {
                  // reverse to display list in inputted orer           
                  ingredientGroupList.map((data, index) => (
                    <Col md={5} key={index} name="suggestedProductsContainer" style={{ margin: "1px", backgroundColor: "white", boxShadow: "1px 1px 4px 2px #00000030" }}>

                      {data.properIngredientStringSyntax}

                      {/* <Col>
                            <Autocomplete
                              id="availableStores"
                              multiple
                              freeSolo
                              options={this.availableLocations.map((option) => option)}
                              onChange={({index}, chip) => this.handleAddStoreChip({index}, chip)}
                              // onInputChange={(ev, index) => this.handleAddStoreChip(ev, index)}         
                              renderInput={(params) => (<TextField {...params} label="Available Store Locations" variant="filled" />)}
                              fullWidth
                              className="mb-3"
                              value={this.state.new_product_ingredients[index].availableLocations}
                            />
                            <b> Nutrition Facts (optional)</b>
                            <br></br>
                            <input id='calories' placeholder="calories" label='Enter number of calories' type='number' />
                            <input id='total_carbs' placeholder="total_carbohydrate" label='Enter number of carbs in this product' type='number' />
                            <input id='net_carbs' placeholder="net_carbs" label='Enter net_carbs' type='number' />
                            <input id='sugar' placeholder="sugar" label='Enter grams of sugar' type='number' />
                            <input id='protein' placeholder="protein" label='Enter grams of protein' type='number' />
                            <input id='fat' placeholder="fat" label='Enter grams of fat' type='number' />
                            <input id='sodium' placeholder="sodium" label='Enter grams of sodium' type='number' /> <br></br>
                            // <button> Save </button> 
                          </Col> */}
                    </Col>
                  ))
                }

              </Container>

              {/* <ProductsPageModal
                        value={this.state.ingredientGroupList}
                        productIndex = {this.getProductIndex()}
                        // {this.state.currentProductIndexDisplayed}
                        // toggleProductPage={this.
                        // openProductDetailsModal
                      // }
             /> */}
              {/* 
availableLocations,
    rawImages, productImages,
    calories
    total_carbs, net_carbs, fiber, fat, protein ,
    sodium, cholesterol, vitamind, calcium, iron, potassium */}

              <br /><hr /><br />
              <Row>
                <Col>
                  <Autocomplete
                    multiple
                    id="kitchen_utenails"
                    freeSolo
                    options={this.props.kitchenUtensils.map((option) => option)}
                    // onChange={(ev,val)=>this.handleUtensilsDropdownChange(ev,val)}
                    onChange={(e, val) => this.handleKitchenUtensilInputName(val)}
                    renderInput={(params) => (<TextField {...params}
                      label="Kitchen Utensils : Add any unique cooking utensils needed to make this meal (optional)"
                      variant="filled" />)}
                    fullWidth
                    className="mb-3"
                    value={this.state.suggestedUtensils}
                  />
                  {/* <ChipInput label=" className="mb-2" fullWidth id="utensils" onChange={(chip) => this.updateUtensils(chip)} variant="filled" /> */}
                </Col>
              </Row>

              {/* add kitchen slider template here? */}

              <b>Add Recipe Chunks <sup>i</sup>:</b>
              <hr />
              {/* <Row className="mb-3">
                  <Col md={12}>
                    <ChipInput label="Instructions"  className="mb-2" fullWidth  value={this.state.instructionsChip} onAdd={(chip) => this.handleAddInstructionStep(chip)} onDelete={(chip, index) =>this.handleDeleteInstructionsStep(chip, index)}   variant="filled" />
                  </Col>               
                </Row> */}

              <Row className="mb-3">
                <p> Upload photos/videos for different parts of recipe steps</p>

                {/* <Col md={12}  className="mb-2">
                    <input accept="image/*,video/mp4,video/x-m4v,video/*" id="imgSrc1" type="file" className="mb-2" onChange={(ev)=>this.onhandleInstructionImg(ev)} />
                  </Col>    */}

                {/* <Col md={4}  style={{textAlign:"center", margin: "auto"}}> 
                    <Button variant="contained" color="primary"  disableRipple style={{color:"white", width:"300px"}}  className="mb-3" onClick={this.addInstructionList}  > ADD NEW INSTRUCTION SET</Button>
                  </Col> */}
              </Row>

              <Row>
                <Col md={6}>
                  <TextField id="chunk1Title" className="mb-2" onChange={(ev) => this.handleInstructionTitle(ev, 1)} label="Section 1 Title" variant="filled" />
                  <br />
                  <input accept="image/*,video/mp4,video/x-m4v,video/*" id="instructionChunkContent1" name="instructionChunkContent1" type="file" className="mb-2" onChange={(ev) => this.onhandleInstructionImg(ev, 1)} />
                  <p><img id="chunk1Image" width="100%" alt="recipe_step1_image_or_video" style={{ display: "none" }} />
                    <video width="100%" id="chunk1Video" style={{ display: "none" }} controls>
                      Your browser does not support the video tag.
                    </video>
                  </p>
                  <ChipInput label="Instructions" className="mb-2" fullWidth value={this.state.instructionChunk1.instructionSteps} onAdd={(chip) => this.handleAddInstructionStep(chip, 1)} onDelete={(chip, index) => this.handleDeleteInstructionsStep(chip, 1)} variant="filled" />
                </Col>
                <Col md={6}>
                  <TextField id="chunk2Title" className="mb-2" onChange={(ev) => this.handleInstructionTitle(ev, 2)} label="Section 2 Title" variant="filled" />

                  <br />
                  <input accept="image/*,video/mp4,video/x-m4v,video/*" id="instructionChunkContent2" name="instructionChunkContent2" type="file" className="mb-2" onChange={(ev) => this.onhandleInstructionImg(ev, 2)} />
                  <p><img id="chunk2Image" width="100%" alt="recipe_step2_image_or_video" style={{ display: "none" }} />
                    <video width="100%" id="chunk2Video" style={{ display: "none" }} controls>
                      <source type="video/mp4" id="chunk2VideoSource" />
                      Your browser does not support the video tag.
                    </video>
                  </p>
                  <ChipInput label="Instructions" className="mb-2" fullWidth value={this.state.instructionChunk2.instructionSteps} onAdd={(chip) => this.handleAddInstructionStep(chip, 2)} onDelete={(chip, index) => this.handleDeleteInstructionsStep(chip, 2)} variant="filled" />

                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <TextField id="chunk3Title" className="mb-2" onChange={(ev) => this.handleInstructionTitle(ev, 3)} label="Section 3 Title" variant="filled" />

                  <br />
                  <input accept="image/*,video/mp4,video/x-m4v,video/*" id="instructionChunkContent3" name="instructionChunkContent3" type="file" className="mb-2" onChange={(ev) => this.onhandleInstructionImg(ev, 3)} />
                  <p><img id="chunk3Image" width="100%" alt="recipe_step3_image_or_video" style={{ display: "none" }} />
                    <video width="100%" id="chunk3Video" style={{ display: "none" }} controls>
                      <source type="video/mp4" id="chunk3VideoSource" />
                      Your browser does not support the video tag.
                    </video>
                  </p>
                  <ChipInput label="Instructions" className="mb-2" fullWidth value={this.state.instructionChunk3.instructionSteps} onAdd={(chip) => this.handleAddInstructionStep(chip, 3)} onDelete={(chip, index) => this.handleDeleteInstructionsStep(chip, 3)} variant="filled" />

                </Col>
                <Col md={6}>
                  <TextField id="chunk4Title" className="mb-2" onChange={(ev) => this.handleInstructionTitle(ev, 4)} label="Section 4 Title" variant="filled" />

                  <br />
                  <input accept="image/*,video/mp4,video/x-m4v,video/*" id="instructionChunkContent4" name="instructionChunkContent4" type="file" className="mb-2" onChange={(ev) => this.onhandleInstructionImg(ev, 4)} />
                  <p><img id="chunk4Image" width="100%" alt="recipe_step4_image_or_video" style={{ display: "none" }} />
                    <video width="100%" id="chunk4Video" style={{ display: "none" }} controls>
                      <source type="video/mp4" id="chunk4VideoSource" />
                      Your browser does not support the video tag.
                    </video>
                  </p>
                  <ChipInput label="Instructions" className="mb-2" fullWidth value={this.state.instructionChunk4.instructionSteps} onAdd={(chip) => this.handleAddInstructionStep(chip, 4)} onDelete={(chip, index) => this.handleDeleteInstructionsStep(chip, 4)} variant="filled" />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <TextField id="chunk5Title" className="mb-2" onChange={(ev) => this.handleInstructionTitle(ev, 5)} label="Section 5 Title" variant="filled" />

                  <br />
                  <input accept="image/*,video/mp4,video/x-m4v,video/*" id="instructionChunkContent5" name="instructionChunkContent5" type="file" className="mb-2" onChange={(ev) => this.onhandleInstructionImg(ev, 5)} />
                  <p><img id="chunk5Image" width="100%" alt="recipe_step5_image_or_video" style={{ display: "none" }} />
                    <video width="100%" id="chunk5Video" style={{ display: "none" }} controls>
                      <source type="video/mp4" id="chunk5VideoSource" />
                      Your browser does not support the video tag.
                    </video>
                  </p>
                  <ChipInput label="Instructions" className="mb-2" fullWidth value={this.state.instructionChunk5.instructionSteps} onAdd={(chip) => this.handleAddInstructionStep(chip, 5)} onDelete={(chip, index) => this.handleDeleteInstructionsStep(chip, 5)} variant="filled" />
                </Col>
                <Col md={6}>
                  <TextField id="chunk6Title" className="mb-2" onChange={(ev) => this.handleInstructionTitle(ev, 6)} label="Section 6 Title" variant="filled" />

                  <br />
                  <input accept="image/*,video/mp4,video/x-m4v,video/*" id="instructionChunkContent6" name="instructionChunkContent6" type="file" className="mb-2" onChange={(ev) => this.onhandleInstructionImg(ev, 6)} />
                  <p><img id="chunk6Image" width="100%" alt="recipe_step6_image_or_video" style={{ display: "none" }} />
                    <video width="100%" id="chunk6Video" style={{ display: "none" }} controls>
                      <source type="video/mp4" id="chunk6VideoSource" />
                      Your browser does not support the video tag.
                    </video>
                  </p>
                  <ChipInput label="Instructions" className="mb-2" fullWidth value={this.state.instructionChunk6.instructionSteps} onAdd={(chip) => this.handleAddInstructionStep(chip, 6)} onDelete={(chip, index) => this.handleDeleteInstructionsStep(chip, 6)} variant="filled" />
                </Col>
              </Row>

              <hr />

              <Row className="mb-3">
                <Col md={12}>
                  <Autocomplete
                    multiple
                    id="tags-filled"
                    className="mb-2"
                    freeSolo
                    // filterSelectedOptions
                    options={this.props.categories.map((option) => option)}
                    // onChange={(ev,val)=>this.handleCategoryDropdownChange(ev,val)}
                    onChange={(e, newValue) => this.handleCategoryDropdownChange(newValue)}
                    // getOptionLabel={option => option}
                    // renderTags={() => {}}
                    value={this.state.suggestedCategories}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="Categories"
                        placeholder="Suggest categories for this meal.."
                        fullWidth
                      />
                    )}
                  />
                </Col>

              </Row>
              <Row>
                <Col md={12}>
                  {/* <ChipInput label="tips" className="mb-2" fullWidth value={this.state.tips} onAdd={(chip) => this.updateTip(chip)} onDelete={(chip, index) => this.deleteTip(chip, index)} variant="filled" /> */}
                  <ChipInput id="tips" label="Tips(optional): include any modifications to this meal you will like to add" className="mb-3" fullWidth value={this.state.tips} onAdd={(chip) => this.updateTip(chip)} onDelete={(chip, index) => this.deleteTip(chip, index)} variant="filled" />

                </Col>
              </Row>
              <u onClick={this.openProductDetailsModal}> Show Preview +</u>
              <br /><br />
              <div id="ProductAdditionalDataDisplayed" >
                {/* <PreviewMealsPage mealData="Passed in meal name" mealPrep = {this.state.instructionGroupData}/> */}
              </div>
              <Row className="mb-5">
                <Col md={12}>
                  <ThemeProvider theme={theme}>
                    <Button variant="contained" className="mb-2" color="primary" style={{ color: "white", width: "100%" }} onClick={() => this.sendSuggestedMealToDB()}> Add Meal</Button>
                  </ThemeProvider>
                </Col>
                <TextField>View privacy policy <sup>i</sup></TextField>
              </Row>
            </form>
          </div>
        </div>
        <Dialog
          open={this.state.booleanOfDisplayOfDialogBoxConfirmation}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">Information</DialogTitle>
          <DialogContent>
            <DialogContentText>Successfully added to database</DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default SuggestMeal;


    // fetch(url, {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     // 'Content-type': 'application/json',
    //     'Content-type': 'multipart/form-data',

    //   },
    //   // body: JSON.stringify(this.state.selected),
    //   // body: JSON.stringify(suggestMealForm)
    //   body: suggestMealForm

    // }).then(response => {
    //     console.log(response)
    //     // if (response.status >= 200 && response.status < 300) {
    //     if(response.status === 200 ){
    //       console.log(response);
    //       console.log("Display Meal submitted successfully");
    //       return (window.location.href = "/ViewSuggestedMeals");
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

// handleAddStoreChip(index, chip) {
//   // add store to new products available_locations from new products list
//   // add store to local avaialable locations for further use,
//   // and store to suggested locations list for admin reference 
//   console.log(" chip is " + chip + " and group list is: ");
//   console.log(this.state.ingredientGroupList);


//   // let tmp_new_products_list = this.state.new_product_ingredients;

//   // let specific_new_products_available_locations = tmp_new_products_list[index].availableLocations;

//   // check if to use value for input or innerhtml for dropdown selection
//   if (chip !== undefined) {
//     console.log(" chip target value is " + chip + " and index is " + index);
//     // add store location to new products available locations
//     // specific_new_products_available_locations = [specific_new_products_available_locations, chip];
//     // this.availableLocations = [this.availableLocations, chip];
//   }
//   else {
//     console.log(" chip is undefined");

//   //   console.log(" chips inner html is " + chip+ " and index is " + index);
//   //   specific_new_products_available_locations = [specific_new_products_available_locations, event.target.innerHTML];
//   //   this.availableLocations = [this.availableLocations, event.target.innerHTML];
//   }

//   // store back in product and list to update state
//   // tmp_new_products_list[chip].availableLocations = specific_new_products_available_locations;

//   // update store locations in product locations as well
//   // this.setState({ new_product_ingredients: tmp_new_products_list });

// }

// /////////////////////////////////////////////////////////////////////////////////////
// handleStoreNameInput = (event, newProductsIndex) => {
//   // const searchResult = this.availableLocations.map(function callback(element){
//   //   let availableLocation = element.toLowerCase();
//   //   // console.log(event.target.innerHTML);
//   //   // console.log(event.target.value);

//   //   if(availableLocation === event.target.innerHTML.toLowerCase()){return true; }
//   //   else{return false;}
//   // });

//   // const tmpCurrStoreIndexIfExistsInProductsList = searchResult.indexOf(true);
//   // console.log("Curr Store Index If Exists In Store List is: \n"+tmpCurrStoreIndexIfExistsInProductsList);

//   // check if product name is an existing product
//   // set product existense to index, so one will not need to edit
//   // this.setState({currStoreIndexIfExistsInProductsList:tmpCurrStoreIndexIfExistsInProductsList});

//   // set current ingredient to input Product regardless
//   // console.log("Event is: \n"+ event.target);
//   let tmp_new_products_list = this.state.new_product_ingredients;

//   if (event != null && event.target.value !== null) {
//     // update store locations in product locations as well
//     this.setState({ new_product_ingredients: [tmp_new_products_list, event.target.innerHTML] });
//   }
//   else {
//     this.setState({ new_product_ingredients: [tmp_new_products_list, event.target.value] });
//   }
//   // }
//   // else{
//   //   console.log('val is null!');
//   // }
// }


  ///////////////////////////////////////////////////////////////////////////////////////
  // addInstructionList =()=>{
  //   if( this.state.instructionsChip.length ===0 ) return;
  //   let tmp = {
  //     step: this.state.instructionsChip,
  //     imgdata: this.state.instructionImgData,
  //     imgpath: this.state.instructionImgPath,
  //   }
  //   this.setState({instructionGroupList: [...this.state.instructionGroupList, tmp ]});
  //   this.setState({instructionsChip:[], instructionImgData: null, instructionImgPath:"" });
  // }

  //   {/* Servings */}
  // {/* <Row className="mb-3"> */}
  //   {/* confirm what is this loading img src ? */}
  // {/* <Col md={4} style={{  marginTop:"20px", textAlign:"center"}}>
  //   <img src={loading_imgSrc} width="70%" height="auto"  alt=""/>
  // </Col>
  //   <Col md={4}  style={{textAlign:"center", margin: "auto"}}> </Col>
  //   <Col md={4}  style={{textAlign:"center", margin: "auto"}}> </Col>
  // </Row> */}


  // handle submission of NEW products
    // let productImgForm = new FormData();
    // let img_count1 = 0;
    // // check for Ingredient products that do not already have an image in database
    // for (var i = 0; i < ingredientGroupList.length; i++){
    //   if (ingredientGroupList[i].productImgData !== null)
    //   {
    //     // appending all known ingredient product images to product image form..
    //     productImgForm.append('productImgs', ingredientGroupList[i].productImgData);
    //     img_count1++;
    //   }
    // }

    // TO DELETE algorithm once we store Product images in Multer then Mongo.
    // let productImg_paths = null;
    // if(img_count1 !== 0){
    //   // Sending post with all products/ingredients images to get an image url for it ??
    //   var productImg_url = "/getProductImgURL/";
    //   const productImg_config = {  method: 'POST',  data: productImgForm, url: productImg_url };

    //   const response = await axios(productImg_config)
    //   console.log("UploadedImage_URL: ", response)
    //   productImg_paths = response.data.productImg_paths;
    // }

    //comenting out section based on storing all suggested product images on file server
    //  let image = "";
    //  // Confirm what is the difference between productImgData AND productImgPath ***
    //  if (ingredientGroupList[i].productImgData !== null)
    //  {
    //    // setting the image to be at the returned value of where the path of the image will now be stored ?? NO.
    //    n1++; image = productImg_paths[n1]
    //  }
    //  else{
    //    // set image to url if no img data ?
    //    image = ingredientGroupList[i].productImgPath;
    //  }
    // add image to temporary slider data


    // var instructionImg_paths = null;
    // if(img_count !== 0){
    //   var instructionImg_url = "/getInstructionImgURL/";
    //   const instructionImg_config = {  method: 'POST',  data: instructionImgForm, url: instructionImg_url };

    //   const response = await axios(instructionImg_config)
    //   instructionImg_paths = response.data.instrutionImg_paths;
    // }

    // let tmp = {
    //   step: tmp_instructionItem.step,
    //   imgdata: event.target.files[0],
    //   imgpath: URL.createObjectURL(event.target.files[0]),
    // };

        // for ( i = 0; i < instructionGroupList.length; i++){
    //   let image = null;
    //   if (instructionGroupList[i].imgdata !== null)
    //   {   n ++; image = instructionImg_paths[n] }

    //   let tmp = {
    //     step: instructionGroupList[i].step,
    //     image: image,
    //   }
    //   instructionGroupData.push(tmp);
    // }



    // NOt sure what this comp_instructions is, but its caller was commented out ...
    // var comp_instructions = [];
    // var count_index = 1;
    // for (let i = 0; i < this.state.instructionGroupList.length ; i++) {
    //   if(i !==0 ){
    //     count_index += this.state.instructionGroupList[i-1].step.length;
    //   }

    //   comp_instructions.push(
    //     <div key={i}  className="mb-3" style={{margin:"10px", padding:"10px", backgroundColor:"white",  boxShadow: "1px 1px 4px 2px #00000030"}}>
    //       <Row style={{justifyContent: "flex-end"}}>
    //         <i className="fa fa-remove" style={{fontSize:"50%", marginTop: "0px", marginRight: "15px"}} onClick={()=>this.onHandleInstructionItem(i)}></i>
    //       </Row>
    //       <Row >
    //         <Col md={4}  className="mb-2" style={{overflowWrap: "break-word"}}>
    //           <div className="mdc-list">
    //             {this.state.instructionGroupList[i].step.map((chip, index1) => (
    //               <div className="mdc-list-item" key={index1}>
    //                 <span className="mdc-list-item__text">{index1+count_index}.
    //                   <span className="mdc-list-item__text"> {chip}</span>
    //                 </span>
    //               </div>
    //             ))}
    //           </div>
    //         </Col>
    //         <Col md={4}  className="mb-2" style={{textAlign: "center"}}>
    //           <img className="mb-2" src={this.state.instructionGroupList[i].imgpath} width="auto" height="150px" alt=""/>
    //           <input accept="image/*,video/mp4,video/x-m4v,video/*" id="imgSrc1" type="file" className="mb-2, ml-3" onChange={(ev)=>this.onUpdateInstructionImg(ev, i)} />
    //         </Col>
    //         <Col md={4}  className="mb-2"></Col>
    //       </Row>
    //     </div>
    //   )
    // }

      ///////////////////////////////////////////////////////////////////////////////////////
  // onHandleInstructionItem = (ind) =>{
  //   const array  =this.state.instructionGroupList;
  //   array.splice(ind, 1);
  //   this.setState({instructionGroupList: array});
  //   // instructionChunks
  //FG }

  // Handle load file update for product image in this function
  ///////////////////////////////////////////////////////////////////////////////////////
  // if image already exists, append image, else suggest new image to Suggessted Product
  // onUpdateIngredientImg = (event, idName) => {
  //   if (event.target.files[0] === undefined) return;
  //   let thisImageOrVideo = event.target.files[0];
  //   let particularArray;
  //   // this.setState({ mealImage: event.target.files[0] });
  //   // Allowing file type
  //   var allowedImageExtensions = /(\.jpg|\.jpeg|\.png|\.)$/i;
  //   if (allowedImageExtensions.exec(event.target.files[0].name)) {
  //     //display meals main image or videoin suggest po0======
  //     var image = document.getElementById(idName);
  //     image.style.display = "block";
  //     image.src = URL.createObjectURL(event.target.files[0]);
  //     console.log(event.target.files[0]);
  //     console.log(allowedImageExtensions.exec(event.target.files[0].name));
  //     console.log(URL.createObjectURL(event.target.files[0]));
  //     console.log(image.src);
  //   }
  //   else {
  //     alert("Invalid image type");
  //   }
    // if (event.target.files[0] === null || this.state.ingredientGroupList.length<= ind) return;
    // const tmp_ingredientData = this.state.ingredientGroupList;
    // const tmp_ingredientItem = tmp_ingredientData[ind];
    // var tmp1 = { bkk
    //   product: tmp_ingredientItem.product,
    //   quantity: tmp_ingredientItem.quantity,
    //   measurement: tmp_ingredientItem.measurement,
    //   productImgData: event.target.files[0],
    //   // productImgPath: event.target.files[0].path,
    //   // Should we store suggested products directly on server? Is that safe ?
    //   // Perhaps we should add to Mongo as image object instead, YES.
    //   // productImgPath: URL.createObjectURL(event.target.files[0].path),
    //   display: false,
    // };
    // tmp_ingredientData[ind] = tmp1;
    // this.setState({ingredientGroupList: tmp_ingredientData});
    // // update new Products array if Ingredient is a new Product.
  // }