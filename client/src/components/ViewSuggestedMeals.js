import React, { Component } from "react";
import {Table,TableBody, TableCell,TableContainer,TableHead, TablePagination, TableRow,Checkbox, Typography,Toolbar, Dialog,DialogContent,DialogTitle,Button,IconButton,TextField  } from '@material-ui/core';
import clsx from "clsx";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SendIcon from '@material-ui/icons/Send';

import ChipInput from "material-ui-chip-input";
import Autocomplete from "@material-ui/lab/Autocomplete"; 
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
// import axios from 'axios';
import axios from '../util/Api';
import { Row, Col } from "react-bootstrap";
import Tooltip from '@material-ui/core/Tooltip';

// height of the TextField
const columns = [
    { id: '_id', label: 'id', minWidth: 100 },
    { id: 'label', label: 'MealName', minWidth: 100 },
    { id: 'intro', label: 'Intro', minWidth: 100 },
    { id: 'servings', label: 'Servings',  minWidth: 30},
    { id: 'mealImage', label: 'ImageSrc',  minWidth: 100},
    { id: 'readTime', label: 'ReadTime',  minWidth: 30},
    { id: 'cookTime', label: 'cookTime',  minWidth: 30},
    { id: 'active', label: 'Active',  minWidth: 150}
  ];

const styles = theme => ({
  button: {   margin: theme.spacing.unit,  },  
  leftIcon: {  marginRight: theme.spacing.unit, },
  rightIcon: {   marginLeft: theme.spacing.unit, },
  iconSmall: {   fontSize: 20, },
  root: {   width: '95%',   margin:'auto',   marginTop:'20px', },
  container: {   maxHeight: 440, },
});

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#c0dbf2',
    color: '#000000',
    boxShadow: theme.shadows[1],
    fontSize: 15,
    marginTop:"50px"
  },
}))(Tooltip);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
class ViewSuggestedMeals extends Component {
  products = [];
  productsImg_path = [];
  categories = [];
  measurements = ["mL","oz","L","cup(s)","Tbsp","tsp","pt","lb","g","kg","lb"];

  constructor(props) {
    super(props);

    this.state = {
      mealLabel: "",
      intro: "",
      servings: 0,
      // currentIngredient: "Butter scotch",
      currentIngredient: "",
      currentIngredientMeasurement: "",
      currentIngredientQuantity: "",
      ingredientStrings: [],
      formatted_ingredient: [],
      instructionsChip: [],
      readTime: "0 mins read",
      cookTime: "10 mins cook time",
      categoryChips: ["snacks", "abc", "123"],
      productsPopulated: false,
      img_change_flag : false,

      selected_id:"",
      mealData_list:[],
      page:0,
      rowsPerPage:10,
      open:false,
      suggestMealRole: "",

      imgSrc: "",
      loading_imgSrc: "",
      productImgSetting_flag: null,
      productImgSrc: null,
      productImg_path:"",
      product_ind: 0,      
      ingredientGroupList:[],
      selected :[],

      instructionGroupList:[],
      instructionImgData: null,
      instructionImgPath: "",    
            
      categoryList:[],
    };

    this.handleIngredientDropdownChange = this.handleIngredientDropdownChange.bind(
      this
    );
    this.handleProductName = this.handleProductName.bind(this);
    this.handleIngredientMeasurement = this.handleIngredientMeasurement.bind(
      this
    );
    this.handleIngredientQuantity = this.handleIngredientQuantity.bind(this);
    this.addIngredientToMeal = this.addIngredientToMeal.bind(this);
    
  }

///////////////////////////////////////////////////////////////////////////////////////
addInstructionList =()=>{
  if( this.state.instructionsChip.length ===0 ) return;
  let tmp = {
    step: this.state.instructionsChip,
    imgdata: this.state.instructionImgData,
    image: this.state.instructionImgPath,
  }
  this.setState({instructionGroupList: [...this.state.instructionGroupList, tmp ]});
  this.setState({instructionsChip:[], instructionImgData: null, instructionImgPath:"" });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
updateSuggestItem = (data, mealRole) => {  
  const instrutionData = data.instructions;
  const tmp_instrutionData = [];

  for(let i= 0; i< instrutionData.length; i++)
  {
    let tmp = {
      step: instrutionData[i].step,
      imgdata: -1,
      image: instrutionData[i].image,
    }
    tmp_instrutionData.push(tmp);
  }

  this.setState({categories: data.categories});
  this.setState({selected_id: data._id, instructionGroupList:tmp_instrutionData, suggestMealRole: mealRole, mealLabel: data.label, intro: data.intro, servings: data.servings, loading_imgSrc:  data.mealImage, formatted_ingredient:data.newer_ingredient_format});
  this.setState({open: true});

  // this.setState({ currentIngredientMeasurement: last_ingredient.measurement, currentIngredientQuantity: last_ingredient.quantity, currentIngredient: last_ingredient.product });
  this.setState({ imgSrc: data.mealImage, readTime:  data.readTime,  cookTime:  data.cookTime, product_slider:  data.product_slider, productImgSetting_flag: false});

  const last_slider = data.product_slider[data.product_slider.length-1];
  this.setState({productImg_path: last_slider.image});

  let tmp_inst_groupList = [];
  let temp = [];
  for(let i=0; i<data.newer_ingredient_format.length; i++)
  {
    var currProductObject = { 
      product: data.newer_ingredient_format[i].product,  
      quantity: data.newer_ingredient_format[i].quantity,  
      measurement: data.newer_ingredient_format[i].measurement, 
      productImgData: null,
      productImgPath: data.product_slider[i].image,
      flag: false,
    };
    tmp_inst_groupList.push(currProductObject);

    const last_ingredient = data.newer_ingredient_format[i];
    var properIngredientStringSyntax;

    if (last_ingredient.quantity === 0) properIngredientStringSyntax = last_ingredient.product;
    else if (last_ingredient.measurement === null ) properIngredientStringSyntax ="" + last_ingredient.quantity + " " +  last_ingredient.product;
    else properIngredientStringSyntax ="" + last_ingredient.quantity + " " +  last_ingredient.measurement+" of " + last_ingredient.product;

    temp.push(properIngredientStringSyntax);
    
    // const tmp_data = {imgSrc:null, path_flag: data.product_slider[i].flag, path: data.product_slider[i].image};
    // tmp_ingredientData.push(tmp_data);
  }

  this.setState({ ingredientGroupList: tmp_inst_groupList});
  this.setState({ ingredientStrings: temp });  
  // this.setState({ ingredientData: tmp_ingredientData }); 

}

///////////////////////////////////////////////////////////////////////////////////////
onhandleInstructionImg = (event) => {   
  this.setState({ instructionImgData: event.target.files[0] });
  if (event.target.files[0] !== null) {
      this.setState({ instructionImgPath:  URL.createObjectURL(event.target.files[0]) });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
handleUpdateSubmit= async() => {    
  const data = this.state; 
    const {mealLabel,intro,servings,instructionGroupList,ingredientGroupList, ingredientStrings,imgSrc,readTime,cookTime, selected_id, categoryList } = data;
  
  let productImgForm = new FormData();
  let img_count1 = 0;
  for (var i = 0; i < ingredientGroupList.length; i++){
    if (ingredientGroupList[i].productImgData !== null)
    {
      productImgForm.append('productImgs', ingredientGroupList[i].productImgData);
      img_count1 ++;
    }
  }

  let productImg_paths = null;
  if(img_count1 !== 0){
    var productImg_url = "/getProductImgURL/";
    const productImg_config = {  method: 'POST',  data: productImgForm, url: productImg_url };

    const response = await axios(productImg_config)
    productImg_paths = response.data.productImg_paths;
  }
  console.log("productImg_paths: ", productImg_paths);

  //-------------to make prodcut data ------------------------------------------
  const formatted_ingredient1 = [];
  const product_slider = [];
  let n1 = -1;
  for ( i = 0; i < ingredientGroupList.length; i++){
    var tmp_ingredient = { 
      product: ingredientGroupList[i].product,  
      quantity: ingredientGroupList[i].quantity,  
      measurement: ingredientGroupList[i].measurement, 
    };
    formatted_ingredient1.push(tmp_ingredient);

    //-----------------------------------------------
    let image = "";
    if (ingredientGroupList[i].productImgData !== null)
    {   
      n1 ++; image = productImg_paths[n1]
    }
    else{
      image = ingredientGroupList[i].productImgPath;
    }

    const tmp_slider_data = { 
      ingredient: ingredientGroupList[i].product,  
      image: image,  
      flag: ingredientGroupList[i].flag, 
    };
    product_slider.push(tmp_slider_data);
  }

  //------------- to get glabal path for instrution image ----------------------------------------
  let instructionImgForm = new FormData();
  let img_count = 0;
  for ( i = 0; i < instructionGroupList.length; i++){
    if (instructionGroupList[i].imgdata !== null && instructionGroupList[i].imgdata !== -1)
    {
      instructionImgForm.append('instructionImgs', instructionGroupList[i].imgdata);
      img_count ++;
    }
  }

  let instructionImg_paths = null;
  if(img_count !== 0){
    var instructionImg_url = "/getInstructionImgURL/";
    const instructionImg_config = {  method: 'POST',  data: instructionImgForm, url: instructionImg_url };

    const response = await axios(instructionImg_config)
    instructionImg_paths = response.data.instrutionImg_paths;
  }

  //-------------to make instruction data ------------------------------------------
  const instructionGroupData = [];
  let n = -1;
  for ( i = 0; i < instructionGroupList.length; i++){
    let image = null;
    if (instructionGroupList[i].imgdata !== null && instructionGroupList[i].imgdata !== -1)
    {   
      n ++; image = instructionImg_paths[n] 
    }
    else if(instructionGroupList[i].imgdata === -1) {
      image = instructionGroupList[i].image;
    }

    let tmp = {
      step: instructionGroupList[i].step,
      image: image,
    }
    instructionGroupData.push(tmp);
  }

  //-------------to make new category data ------------------------------------------
  let new_categories = [];
  for(i =0; i< categoryList.length; i++)
  {
    let index = this.categories.indexOf(categoryList[i]);
    if(index === -1) new_categories.push(categoryList[i])
  }

  let suggestMealForm = new FormData();
  suggestMealForm.append('id', selected_id);
  suggestMealForm.append('mealLabel', mealLabel);
  suggestMealForm.append('intro', intro);
  suggestMealForm.append('servings', servings);
  suggestMealForm.append('product_slider', JSON.stringify(product_slider));
  suggestMealForm.append('formatted_ingredient', JSON.stringify(formatted_ingredient1));
  suggestMealForm.append('instructionsGroupList', JSON.stringify(instructionGroupData));
  suggestMealForm.append('ingredientStrings', ingredientStrings);
  suggestMealForm.append('readTime', readTime);
  suggestMealForm.append('cookTime', cookTime);
  suggestMealForm.append('categoryChips', JSON.stringify(categoryList)); 
  suggestMealForm.append('newCategories', JSON.stringify(new_categories));    
  suggestMealForm.append('imgSrc', imgSrc);
  
  // const ingredient_list = [];
  if(this.state.img_change_flag){
    suggestMealForm.append('img_change_flag', "true");      
    suggestMealForm.append('imgSrc', imgSrc);
  }else{
    suggestMealForm.set('img_change_flag', "false");     
  }

  // console.log("KKKKKKKKKKK: ", ingredientData);
  // for(var i=0; i< ingredientData.length; i++)
  // {
  //   if(ingredientData[i].imgSrc==null){
  //     ingredient_list.push(null);
  //   }else{
  //     ingredient_list.push({path_flag:ingredientData[i].path_flag,  path: ingredientData[i].path});
  //     if(ingredientData[i].path_flag){
  //       suggestMealForm.append('imgSrc', ingredientData[i].imgSrc);
  //     } 
  //   }    
  // }  
  // suggestMealForm.append('ingredient_list', JSON.stringify(ingredient_list));
  
  var url = "/updateSuggestItem";
  const config = {  method: 'POST',  data: suggestMealForm, url: url };
  const response = await axios(config)
  if( response.status >= 200 && response.status < 300){
    console.log("Updated Meal submitted successfully");        
    return (window.location.href = "/ViewSuggestedMeals");
  }else
  {
    console.log("Somthing happened wrong");
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
componentDidMount() {
  var url = "/get-all-products";
  axios.get(url)
    .then((body) => {
      var productsList = body.data;
      if (productsList && productsList.data.length !== 0) {

        console.log("returns GET ALL PRODUCTS ");
        for (var i = 0; i < productsList.data.length; i++) {
          this.products.push(productsList.data[i].product_name);
          this.productsImg_path.push(productsList.data[i].product_image);
        }

        console.log("PRINTING ALL PRODUCTS LIST", this.products);
        this.setState({ productsPopulated: true });
      } else { console.log("get all products function does not return");}
    })
    .catch((err) => {   console.log(err); });

  console.log("Comes in meal pages component did mount");

  var url1 = "/get-suggested-meals"
  axios.get(url1).then(body => {
      var productsList = body.data;

      if(productsList && productsList.data.length !== 0){
        console.log("shows products does return");
        this.setState({mealData_list:productsList.data});
      }
      else{  console.log("shows products do not return"); }
    }).catch(err => {console.log(err);});

 //----get category meals-------------------------
 url = "/get-all-categories";
 axios.get(url).then((body) => {     
     var categoryList = body.data;
     console.log(categoryList);
     if (categoryList && categoryList.data.length !== 0) {
       console.log("returns GET of ALL Categories ");

       for (var i = 0; i < categoryList.data.length; i++) {
         this.categories.push(categoryList.data[i].category_name);
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

////////////////////////////////////////////////////////////////////////////
onTextFieldChange = (e) => {
  this.setState({ [e.target.id]: e.target.value });
};

////////////////////////////////////////////////////////////////////////////
onTextFieldClick = (event) => {     
  this.setState({ imgSrc: event.target.files[0] });

  if (this.state.imgSrc !== null) {
      this.setState({ loading_imgSrc:  URL.createObjectURL(event.target.files[0]) });
      this.setState({ img_change_flag: true });
  }
};

///////////////////////////////////////////////////////////////////////////////////////
onhandleProductImg = (event) => {   
  this.setState({ productImgSrc: event.target.files[0] });
  if (event.target.files[0] !== null) {
      this.setState({ productImg_path:  URL.createObjectURL(event.target.files[0]) });
  }
};

////////////////////////////////////////////////////////////////////////////
handleAddIngredientChip(chip) {
  let temp = this.state.ingredientStrings;
  temp.push(chip);
  this.setState({ ingredientStrings: temp });
}

////////////////////////////////////////////////////////////////////////////
handleAddCategoryChip(chip) {
  this.setState({ categoryChips: [...this.state.categoryChips, chip] }); //
}

///////////////////////////////////////////////////////////////////////////////////////
handleAddInstructionStep(chip) {
  this.setState({
    instructionsChip: [...this.state.instructionsChip, chip],
  });
}

///////////////////////////////////////////////////////////////////////////////////////
onHandleIngredientItem = (ind) =>{
  var array = this.state.ingredientStrings; // make a separate copy of the array
  var array3 = this.state.ingredientGroupList;
  if (ind !== -1) {
    array.splice(ind, 1);
    array3.splice(ind, 1);
    this.setState({ ingredientStrings: array,ingredientGroupList: array3});
  }
}

///////////////////////////////////////////////////////////////////////////////////////
onHandleInstructionItem = (ind) =>{
  const array  =this.state.instructionGroupList;
  array.splice(ind, 1);
  this.setState({instructionGroupList: array});
}

///////////////////////////////////////////////////////////////////////////////////////
onUpdateIngredientImg= (event, ind) =>{
  // if (event.target.files[0] === null || this.state.ingredientData.length<= ind) return;
  // const tmp_ingredientData = this.state.ingredientData;
  // const tmp = {imgSrc:event.target.files[0], path_flag: true, path:URL.createObjectURL(event.target.files[0])}
  // tmp_ingredientData[ind] = tmp;
  // this.setState({ingredientData: tmp_ingredientData});
  if (event.target.files[0] === null || this.state.ingredientGroupList.length<= ind) return;
  const tmp_ingredientData = this.state.ingredientGroupList;
  const tmp_ingredientItem = tmp_ingredientData[ind];

  var tmp1 = { 
    product: tmp_ingredientItem.product,  
    quantity: tmp_ingredientItem.quantity,  
    measurement: tmp_ingredientItem.measurement, 
    productImgData: event.target.files[0],
    productImgPath: URL.createObjectURL(event.target.files[0]),
    flag: true,
  };
  tmp_ingredientData[ind] = tmp1;
  this.setState({ingredientGroupList: tmp_ingredientData});
}
///////////////////////////////////////////////////////////////////////////////////////
onUpdateInstructionImg = (event, ind) =>{
  if (event.target.files[0] === null || this.state.instructionGroupList.length<= ind) return;
  const tmp_instructionData = this.state.instructionGroupList;
  const tmp_instructionItem = tmp_instructionData[ind];

  let tmp = {
    step: tmp_instructionItem.step,
    imgdata: event.target.files[0],
    image: URL.createObjectURL(event.target.files[0]),
  };

  tmp_instructionData[ind] = tmp;
  this.setState({instructionGroupList: tmp_instructionData});
}

////////////////////////////////////////////////////////////////////////////
handleDeleteIngredientChip(chip) {
  var array = this.state.ingredientStrings; // make a separate copy of the array
  var array3 = this.state.ingredientGroupList;

  var index = array.indexOf(chip);
  if (index !== -1) {
    array.splice(index, 1);
    array3.splice(index, 1);

    this.setState({ ingredientStrings: array, ingredientGroupList:array3});
  }
}

////////////////////////////////////////////////////////////////////////////
handleDeleteCategoryChip(chip, index) {
  console.log("handleDeleteCategoryChip:", index)
}

// ////////////////////////////////////////////////////////////////////////////
// handleDeleteCategoryChip(chip) {
//   console.log("removing chop input");
//   var array = [...this.state.categoryChips]; // make a separate copy of the array
//   var index = array.indexOf(chip);
//   if (index !== -1) {
//     array.splice(index, 1);
//     this.setState({ categoryChips: array });
//   }
// }

////////////////////////////////////////////////////////////////////////////
handleDeleteInstructionsStep(chip) {
  console.log("removing chop input");
  var array = [...this.state.instructionsChip]; // make a separate copy of the array
  var index = array.indexOf(chip);
  if (index !== -1) {
    array.splice(index, 1);
    this.setState({ instructionsChip: array });
  }
}

////////////////////////////////////////////////////////////////////////////
handleIngredientQuantity(event) {
  console.log(event.target.value);
  this.setState({ currentIngredientQuantity: event.target.value });
}

////////////////////////////////////////////////////////////////////////////
handleIngredientDropdownChange = (event, value) => {
  var array = this.products; 
  var index = array.indexOf(value);
  if (index !== -1) {      
    this.setState({ product_ind: index });  
  }

  if (event.target.value) {
    this.setState({ currentIngredient: event.target.value });
  } else {
    this.setState({ currentIngredient: event.target.innerHTML });
  }
}

///////////////////////////////////////////////////////////////////////////////////////
handleProductName = (event, val) => {

  const searchResult = this.products.map(element=>element.toLowerCase().includes(val.toLowerCase()));
  const flag = searchResult.find(element=>element === true);
  if(flag !== true || flag ===null) {
    this.setState({productImgSetting_flag:true});
    this.setState({ currentIngredient: val });
  }else{
    this.setState({productImgSetting_flag:false});
    this.setState({ currentIngredient: val });
  }
}

///////////////////////////////////////////////////////////////////////////////////////
handleCategoryDropdownChange=(val)=>{
  this.setState({categoryList: val});
}

////////////////////////////////////////////////////////////////////////////
handleIngredientMeasurement(event) {
  if (event.target.value) {
    this.setState({ currentIngredientMeasurement: event.target.value });
  } else {
    this.setState({ currentIngredientMeasurement: event.target.innerHTML });
  }
}

////////////////////////////////////////////////////////////////////////////
onhandleSendData=()=>{
  fetch("./api/send-mealData", {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(this.state.selected),
  }).then(response => {
      console.log(response)
      if(response.status === 200 ){
        return (window.location.href = "/ViewSuggestedMeals");
      }
    });
}

////////////////////////////////////////////////////////////////////////////
addIngredientToMeal(event) {
  event.preventDefault();
  console.log(this.state.currentIngredientMeasurement);
  var properIngredientStringSyntax;

  if (document.getElementById("currentIngredient").value === "") {
    window.alert("Enter an ingredient to add to meal");
    return;
  }

  if (this.state.currentIngredientQuantity === 0) {
    properIngredientStringSyntax = document.getElementById("currentIngredient").value;
  } else if (
    document.getElementById("currentIngredientMeasurement").value === null
  ) {
    properIngredientStringSyntax ="" + this.state.currentIngredientQuantity +" " + document.getElementById("currentIngredient").value;
  } else {
    properIngredientStringSyntax ="" +this.state.currentIngredientQuantity +" " + document.getElementById("currentIngredientMeasurement").value +" of " + document.getElementById("currentIngredient").value;
  }

  var currProductObject = { 
    product: this.state.currentIngredient,  
    quantity: this.state.currentIngredientQuantity,  
    measurement: this.state.currentIngredientMeasurement, 
    productImgData: this.state.productImgSrc,
    productImgPath: null,
    flag: this.state.productImgSetting_flag,
  };

  if(this.state.productImgSetting_flag ){
    currProductObject.productImgPath = this.state.productImg_path;
    currProductObject.flag = true
  }else{
    currProductObject.productImgPath = this.productsImg_path[this.state.product_ind];
    currProductObject.flag = false;
  }
  this.handleAddIngredientChip(properIngredientStringSyntax);

  // if(this.state.productImgSetting_flag ){
  //   const tmp_data = {imgSrc:this.state.productImgSrc, path_flag: true, path:""}
  //   this.setState({ ingredientData: [...this.state.ingredientData, tmp_data] });  
  // }else{
  //   const tmp_data = {imgSrc:[], path_flag: false, path:this.productsImg_path[this.state.product_ind]}
  //   this.setState({ ingredientData: [...this.state.ingredientData, tmp_data] });
  // }

  // this.setState({ formatted_ingredient: [ ...this.state.formatted_ingredient, currIngredientObject, ], 
  //   productImg_path:null,
  //   product_slider: [...this.state.product_slider, null],
  // });

  this.setState({ ingredientGroupList: [ ...this.state.ingredientGroupList,  currProductObject ]});
  this.setState({ productImgSrc: null, productImg_path:"" });
  
}

////////////////////////////////////////////////////////////////////////////
handleChangePage = (event, newPage) => {
  this.setState({page: newPage});
};

////////////////////////////////////////////////////////////////////////////
handleChangeRowsPerPage = (event) => {
  this.setState({page: 0});
  this.setState({rowsPerPage: +event.target.value});
};

////////////////////////////////////////////////////////////////////////////
handleDeleteMealItem = (data) => {
  var url = `./api/removeSeggestItem/${data._id}`;
  fetch(url).then((res) => {
    return res.json();
  })
    .then((response) => {           
      console.log("Delets item");
      return (window.location.href = "/ViewSuggestedMeals");
    })
    .catch((err) => {
      console.log("unDelets item");
      console.log(err);
    });
}

////////////////////////////////////////////////////////////////////////////
handleClickOpen = (data, mealRole) => {

  const instrutionData = data.instructions;
  const tmp_instrutionData = [];

  for(let i= 0; i< instrutionData.length; i++)
  {
    let tmp = {
      step: instrutionData[i].step,
      imgdata: -1,
      image: instrutionData[i].image,
    }
    tmp_instrutionData.push(tmp);
  }

  this.setState({selected_id: data._id, instructionGroupList:tmp_instrutionData, suggestMealRole: mealRole, mealLabel: data.label, intro: data.intro, servings: data.servings, loading_imgSrc:  data.mealImage, formatted_ingredient:data.newer_ingredient_format});
  this.setState({open: true});

  const last_ingredient = data.newer_ingredient_format[data.newer_ingredient_format.length-1];
  this.setState({ currentIngredientMeasurement: last_ingredient.measurement, currentIngredientQuantity: last_ingredient.quantity, currentIngredient: last_ingredient.product });
  this.setState({ imgSrc: data.mealImage, readTime:  data.readTime,  cookTime:  data.cookTime, product_slider:  data.product_slider, productImgSetting_flag: false});

  const last_slider = data.product_slider[data.product_slider.length-1];
  this.setState({productImg_path: last_slider.image});

  let temp = [];
  let tmp_ingredientData = []
  for(let i=0; i<data.newer_ingredient_format.length; i++)
  {
    const last_ingredient = data.newer_ingredient_format[i];
    var properIngredientStringSyntax;

    if (last_ingredient.quantity === 0) properIngredientStringSyntax = last_ingredient.product;
    else if (last_ingredient.measurement === null ) properIngredientStringSyntax ="" + last_ingredient.quantity + " " +  last_ingredient.product;
    else properIngredientStringSyntax ="" + last_ingredient.quantity + " " +  last_ingredient.measurement+" of " + last_ingredient.product;

    temp.push(properIngredientStringSyntax);
    tmp_ingredientData.push(null)
  }
  this.setState({ ingredientStrings: temp });  
  this.setState({ ingredientData: tmp_ingredientData }); 


  // this.setState({open: true});
  // this.setState({ suggestMealRole: mealRole, mealLabel: data.label, intro: data.intro, servings: data.servings, formatted_ingredient:data.newer_ingredient_format   });
  
  // const last_ingredient = data.newer_ingredient_format[data.newer_ingredient_format.length-1];
  // this.setState({ currentIngredientMeasurement: last_ingredient.measurement, currentIngredientQuantity: last_ingredient.quantity, currentIngredient: last_ingredient.product });
  // this.setState({ instructionsChip:  data.instructions, readTime:  data.readTime, cookTime:  data.cookTime, loading_imgSrc:  data.mealImage, product_slider:  data.product_slider});
  // const last_slider = data.product_slider[data.product_slider.length-1];
  // if(!last_slider.flag) {
  //   this.setState({productImg_path: "public/products/"+last_slider.image});
  // }else{
  //   this.setState({productImg_path: last_slider.image});
  // }
  // this.setState({productImgSetting_flag: false});

  // let temp = [];
  // for(let i=0; i<data.newer_ingredient_format.length; i++)
  // {
  //   const last_ingredient = data.newer_ingredient_format[i];
  //   var properIngredientStringSyntax;

  //   if (last_ingredient.quantity === 0) {
  //     properIngredientStringSyntax = last_ingredient.product;
  //   } 
  //   else if (last_ingredient.measurement === null ) 
  //   { 
  //     properIngredientStringSyntax ="" + last_ingredient.quantity + " " +  last_ingredient.product;
  //   } 
  //   else {
  //     properIngredientStringSyntax ="" + last_ingredient.quantity + " " +  last_ingredient.measurement+" of " + last_ingredient.product;
  //   }
  //   temp.push(properIngredientStringSyntax);
  // }
  // this.setState({ ingredientStrings: temp });     
};

////////////////////////////////////////////////////////////////////////////
handleClose = () => { this.setState({open: false});};

////////////////////////////////////////////////////////////////////////////
onTextFieldChange = (e) => {
  this.setState({ [e.target.id]: e.target.value });
};

////////////////////////////////////////////////////////////////////////////
handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelecteds = this.state.mealData_list.map((n) => n._id);
    this.setState({selected:  newSelecteds});
    return;
  }
  this.setState({selected: [] });
};

////////////////////////////////////////////////////////////////////////////
handleClick = (event, id) => {
  const selected = this.state.selected; 
  const selectedIndex = selected.indexOf(id);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1),
    );
  }
  this.setState({selected: newSelected});
};




////////////////////////////////////////////////////////////////////////////
  render() {
    console.log("this.state.instructionGroupList: ",this.state.instructionGroupList)
    var comp_instructions = [];
    var count_index = 1;
    for (let i = 0; i < this.state.instructionGroupList.length ; i++) {
      if(i !==0 ){
        count_index += this.state.instructionGroupList[i-1].step.length;
      }
      
      comp_instructions.push(
        <div key={i}  className="mb-3" style={{margin:"10px", padding:"10px", backgroundColor:"white",  boxShadow: "1px 1px 4px 2px #00000030"}}>
          <Row style={{justifyContent: "flex-end"}}> 
            <i className="fa fa-remove" style={{fontSize:"50%", marginTop: "0px", marginRight: "15px"}} onClick={()=>this.onHandleInstructionItem(i)}></i>
          </Row>                        
          <Row >
            <Col md={4}  className="mb-2" style={{overflowWrap: "break-word"}}>
              <div className="mdc-list">
                {this.state.instructionGroupList[i].step.map((chip, index1) => (
                  <div className="mdc-list-item" key={index1}>
                    <span className="mdc-list-item__text">{index1+count_index}. 
                      <span className="mdc-list-item__text"> {chip}</span>
                    </span>
                  </div>
                ))}
              </div>
            </Col>
            <Col md={4}  className="mb-2" style={{textAlign: "center"}}>
              <img className="mb-2" src={this.state.instructionGroupList[i].imgpath} width="auto" height="150px" alt=""/>
              <input accept="image/*" id="imgSrc1" type="file" className="mb-2, ml-3" onChange={(ev)=>this.onUpdateInstructionImg(ev, i)} />
            </Col>
            <Col md={4}  className="mb-2"></Col>
          </Row>
        </div>
      )
    }

    const { classes } = this.props;
    const {mealData_list, page, rowsPerPage, open, suggestMealRole, loading_imgSrc, categoryList} = this.state;
    const {mealLabel, intro, currentIngredient, currentIngredientQuantity, currentIngredientMeasurement, readTime, cookTime, servings} = this.state;

    const theme = createMuiTheme({
      palette: { primary: green,  },
    });
  
    const numSelected = this.state.selected.length;
    const rowCount = mealData_list? mealData_list.length:0;
  
    return (
      <div className={classes.root} style={{boxShadow:"2px 2px 8px 0px #a0a0a0"}}>
        <Toolbar className={clsx(classes.root, {  [classes.highlight]: numSelected > 0  })} >
          {numSelected > 0 ? 
          ( <Typography  className={classes.title} color="inherit"  variant="subtitle1"component="div" style={{fontSize:"16px", fontWeight:"600", marginRight:"20px", color:"blue"}}> {numSelected} selected</Typography>) 
          : (<Typography  className={classes.title} variant="h6" id="tableTitle"  component="div">None Selected  </Typography>)}

          {numSelected > 0 ? (<Button variant="outlined" color="primary" endIcon={<SendIcon/>} onClick={this.onhandleSendData}>Send</Button>) :null}
        </Toolbar>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={this.handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                  />
                </TableCell>

                {columns.map((column) => (
                  <TableCell 
                    key={column.id} 
                    align={column.align}  
                    style={{ minWidth: column.minWidth, fontSize:'15x', fontWeight:'600',padding: '10px 5px' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              { mealData_list&&
              mealData_list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                const isSelected = (id) => this.state.selected.indexOf(id) !== -1;
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (               
                  <TableRow 
                    hover
                    onClick={(event) => this.handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    
                    {columns.map((column) => {
                      if(column.id === "active"){                     
                        return (
                        <TableCell  key={column.id} style={{ padding: '0px 0px'}}>
                          <LightTooltip title="  View  " placement="top">
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick ={()=>this.handleClickOpen(row, "moreView")}>
                              <VisibilityIcon />
                            </IconButton>
                          </LightTooltip>

                          <LightTooltip title="  Update  " placement="top">
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick ={()=>this.updateSuggestItem(row,"edit")}>
                              <EditIcon style={{ color: 'green'}}/>
                            </IconButton>
                          </LightTooltip>

                          <LightTooltip title="  Delete  " placement="top">
                            <IconButton color="secondary" aria-label="upload picture" component="span"  onClick ={()=>this.handleDeleteMealItem(row)}>
                              <DeleteIcon />
                            </IconButton>
                          </LightTooltip>
                        </TableCell>
                        );
                      }else{ const value = row[column.id]; return (<TableCell key={column.id} style={{ padding: '5px 5px'}}>{value}</TableCell> );}                    
                    })                  
                    }    
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />

      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth = "lg"
        fullWidth
        >
        <DialogTitle id="alert-dialog-title">{suggestMealRole === "moreView" ? "Suggest Meal": "Update Meal"}</DialogTitle>
          <DialogContent>
            <form noValidate autoComplete="off">
              <Row className="mb-3">
                <Col md={4}>
                  <TextField id="mealLabel" fullWidth onChange={this.onTextFieldChange} label="Meal Name" required variant="filled" className="mb-3" value={mealLabel}/>
                  <TextField multiline id="intro" fullWidth onChange={this.onTextFieldChange} label="Intro"  variant="filled" className="mb-3" value={intro} />
                </Col>
                <Col md={4} style={{  marginTop:"20px"}}>
                    <input accept="image/*" id="imgSrc" type="file" className="mb-2 pr-4" onChange={(ev)=>this.onTextFieldClick(ev)} /> 
                </Col>
                <Col md={4} style={{  marginTop:"20px", textAlign:"center"}}>
                  <img src={loading_imgSrc} width="70%" height="auto"  alt=""/>
                </Col>   
              </Row>

              <hr/>             
              <Row className="mb-2">
                  <Col md={12}>
                    <ChipInput
                      label="IngredientsList"
                      value={this.state.ingredientStrings}
                      onAdd={(chip) => this.handleAddIngredientChip(chip)}
                      placeholder="e.g 1 Onion, 2 Cups of Water, etc"
                      onDelete={(chip, index) =>this.handleDeleteIngredientChip(chip, index)}
                      variant="filled"
                      fullWidth 
                      className="mb-2"
                    />
                  </Col>
                </Row>           

                {
                    this.state.ingredientGroupList &&
                    this.state.ingredientGroupList.map((data, index)=>(
                      <div key={index}  className="mb-3" style={{margin:"10px", padding:"10px", backgroundColor:"white",  boxShadow: "1px 1px 4px 2px #00000030"}}>
                        <Row style={{justifyContent: "flex-end"}}> 
                          <i className="fa fa-remove" style={{fontSize:"50%", marginTop: "0px", marginRight: "15px"}} onClick={()=>this.onHandleIngredientItem(index)}></i>
                        </Row>                        
                        <Row >
                          <Col md={5}  className="mb-2" style={{overflowWrap: "break-word"}}>
                            <div className="card-ingredient-content">
                              <div><span style={{fontWeight:"600"}}>1. Product &emsp;&emsp;&nbsp; :</span> {data.product}</div>
                              <div><span style={{fontWeight:"600"}}>2. Quantity&emsp;&emsp; :</span> {data.quantity}</div>
                              <div><span style={{fontWeight:"600"}}>3. Measurement:</span> {data.measurement}</div>
  
                              <input accept="image/*" id="imgSrc1" type="file" className="mb-2 ml-3 mt-3 " onChange={(ev)=>this.onUpdateIngredientImg(ev, index)} />
                            </div>
                          </Col>
                          <Col md={4}  className="mb-2" style={{textAlign: "center"}}>
                            <img className="mb-2" src={ data.productImgPath} width="auto" height="150px" alt=""/>
                            
                          </Col>
                          <Col md={3}  className="mb-2"></Col>
                        </Row>
                      </div>
                    ))
                }

                <Row className="mb-1">
                  <Col md={4}>
                    <Autocomplete
                      id="currentIngredient"
                      options={this.products.map((option) => option)}
                      onChange={(ev, val) => this.handleIngredientDropdownChange(ev, val)}
                      onInputChange={(ev, val) => this.handleProductName(ev, val)}
                      freeSolo
                      renderInput={(params) => ( <TextField {...params} label="Ingredient.." variant="filled"/>)}
                      fullWidth 
                      className="mb-3"
                      value = {currentIngredient}
                    />
                     <TextField fullWidth id="currentIngredientQuantity" type="number"  onChange={this.onTextFieldChange}  label="Quantity" variant="filled" placeholder="1.."  className="mb-3" value={currentIngredientQuantity}/>
                  </Col>

                  <Col md={4}>
                    {
                      this.state.productImgSetting_flag ?  
                      <input accept="image/*" id="imgSrc1" type="file" className="mt-3 mb-4" onChange={(ev)=>this.onhandleProductImg(ev)} />:<div style={{marginTop:"70px"}}/>
                    }

                    <Autocomplete 
                      id="currentIngredientMeasurement" 
                      options={this.measurements.map((option) => option)} 
                      value={currentIngredientMeasurement} 
                      onChange={this.handleIngredientMeasurement}
                      freeSolo
                      renderInput={(params) => ( <TextField {...params} label="Measurement.." variant="filled"/>  )}
                      className="mb-3"
                    />
                  </Col>

                  <Col md={4}  style={{textAlign:"center", margin: "auto"}}> 
                    <Button variant="contained" color="primary" disableRipple onClick={this.addIngredientToMeal} style={{color:"white"}}  className="mb-3" > Add Ingredient</Button>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={4}  style={{textAlign:"center", margin: "auto"}}> 
                  <TextField id="servings" fullWidth type="number" onChange={this.onTextFieldChange} label="Servings"  variant="filled"  className="mb-2" placeholder="1 person, 2, 4 or 10 people" style={{marginTop:"10px"}} value={servings}/>
                  </Col>   
                  <Col md={4}  style={{textAlign:"center", margin: "auto"}}> </Col>   
                  <Col md={4}  style={{textAlign:"center", margin: "auto"}}> </Col>   
                </Row>                
                <hr/>

                 {
                   comp_instructions
                    // this.state.instructionGroupList.length > 0 &&
                    // this.state.instructionGroupList.map((data, index)=>(
                    //   <div key={index}  className="mb-3" style={{margin:"10px", padding:"10px", backgroundColor:"white",  boxShadow: "1px 1px 4px 2px #00000030"}}>
                    //     <Row style={{justifyContent: "flex-end"}}> 
                    //       <i className="fa fa-remove" style={{fontSize:"50%", marginTop: "0px", marginRight: "15px"}} onClick={()=>this.onHandleInstructionItem(index)}></i>
                    //     </Row>                        
                    //     <Row >
                    //       <Col md={4}  className="mb-2" style={{overflowWrap: "break-word"}}>
                    //         <ol className="mdc-list">
                    //           {data.step.map((chip, index1) => (
                    //             <li className="mdc-list-item" tabIndex="0" key={index1}>
                    //               <span className="mdc-list-item__text">{chip}</span>
                    //             </li>
                    //           ))}
                    //         </ol>
                    //       </Col>
                    //       <Col md={4}  className="mb-2" style={{textAlign: "center"}}>
                    //         <img className="mb-2" src={data.image} width="auto" height="150px" alt=""/>
                    //         <input accept="image/*" id="imgSrc1" type="file" className="mb-2, ml-3" onChange={(ev)=>this.onUpdateInstructionImg(ev, index)} />
                    //       </Col>
                    //       <Col md={4}  className="mb-2"></Col>
                    //     </Row>
                    //   </div>
                    // ))
                  }

                  <Row className="mb-3">
                    <Col md={12}>
                      <ChipInput label="Instructions"  className="mb-2" fullWidth  value={this.state.instructionsChip} onAdd={(chip) => this.handleAddInstructionStep(chip)} onDelete={(chip, index) =>this.handleDeleteInstructionsStep(chip, index)}   variant="filled" />
                    </Col>               
                  </Row>
                  <Row className="mb-3">         
                  <Col md={4}  className="mb-2">
                    <input accept="image/*" id="imgSrc1" type="file" className="mb-2" onChange={(ev)=>this.onhandleInstructionImg(ev)} />
                  </Col>       
                  <Col md={4}  style={{textAlign:"center", margin: "auto"}}> 
                    <Button variant="contained" color="primary"  disableRipple style={{color:"white", width:"300px"}}  className="mb-3" onClick={this.addInstructionList}  > ADD NEW INSTRUCTION SET</Button>
                  </Col>
                  <Col md={4}> </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={4}>
                    <TextField id="readTime"  className="mb-2" type="number" fullWidth onChange={this.onTextFieldChange} label="ReadTime (mins)" variant="filled" required value={readTime}/>
                  </Col>   
                  <Col md={4}>
                    <TextField id="cookTime" className="mb-2" type="number" fullWidth onChange={this.onTextFieldChange} label="CookTime (mins)" variant="filled" required value={cookTime}/>
                  </Col>   
                  <Col md={4}>
                    {/* <Autocomplete 
                        multiple 
                        limitTags={5}
                        id="tags-filled" 
                        className="mb-2" 
                        fullWidth 
                        options={this.categories.map((option) => option)} 
                        onChange={(ev,val)=>this.handleCategoryDropdownChange(ev,val)}
                        freeSolo
                        renderInput={(params) => (<TextField {...params} variant="filled" label="Categories" placeholder="Suggest categories for this meal.." fullWidth/>)} 
                        // onDelete={(chip, index) =>this.handleDeleteCategoryChip(chip, index)}
                        value = { categories }
                        /> */}

                    <Autocomplete
                      multiple
                      id="tags-standard"
                      className="mb-2" 
                      freeSolo
                       // filterSelectedOptions
                       options={this.categories.map((option) => option)} 
                       // onChange={(ev,val)=>this.handleCategoryDropdownChange(ev,val)}
                       onChange={(e, newValue) => this.handleCategoryDropdownChange(newValue)}
                       // getOptionLabel={option => option}
                       // renderTags={() => {}}
                       value={categoryList}
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
                {
                  suggestMealRole !== "moreView" &&
                  <Row className="mb-5">
                    <Col md={4} style={{textAlign:"center", margin: "auto"}}>
                      <ThemeProvider theme={theme}>
                        <Button variant="contained" className="mb-2" color="primary" size="small"  style={{color:"white"}} onClick={()=>this.handleUpdateSubmit()}> Update Meal</Button>
                      </ThemeProvider>
                    </Col>       
                  </Row>
                }          
              </form>
          </DialogContent>
      </Dialog>
    </div>
    );
  }
}
export default withStyles(styles)(ViewSuggestedMeals);
