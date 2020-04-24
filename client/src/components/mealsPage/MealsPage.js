import React, { Component } from "react";
import MyModal from "./Mymodal";
import WithScrollbar from "./product_slider/WithScrollbar";

class MealsPage extends Component {

    // Mongo
    products = [];
    entries;

  constructor(props) {
    super(props);
    this.state = {
      product_fetched : false,
      suggestMealPopOver: false,
      mealsListed: false,
      mealSelected: false,
      IngredientsListed: false,
      recipes: this.meals, //[this.Garri, this.Jollof_Rice],
      selectedMealIngredients: this.meals[0].new_ingredients,
      selectedMeal: this.meals[0],
      valueAllDataLists: [],
      showIngredients: {
        hidden: true
      },
      showProducts: {
        hidden: true
      },
      //open: false,
      mealsLength: this.meals.length,
      topNav_className: "w3-bar w3-dark-grey w3-green topnav"
    };
  }

  componentDidMount() {
    console.log("Comes in meal pages component did mount");
    var url = "https://chopchowdev.herokuapp.com/api/get-meals";
    // var url = "http://localhost:5000/api/get-meals"

    fetch(url)
      .then(res => res.text())
      .then(body => {
        // console.log("should print body");
        // console.log(body);
        var productsList = JSON.parse(body);
        // console.log(productsList);
        if(productsList && productsList.data.length !== 0){
          console.log("shows products does return");
          console.log(productsList.data.length);
          for (var i = 0; i < productsList.data.length; i++) {
            this.products.push(productsList.data[i]);
          }
          console.log(this.products);
          // this.entries = Object.entries(this.products);
          // console.log(entries);
          this.setState({product_fetched:true});
        }
        else{
          console.log("shows products do not return");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  meal_popups = [];

  showIngredient(index) {
    console.log("updating popup boolean");
    this.meal_popups[index] = !this.meal_popups[index];
  }


  render() {
    const items = [];
    console.log("Hello RENDER");
    for (const [index, value] of this.products.entries()) {
      console.log("COMES IN RENDER");
      //console.log();
      // var base_index = 0;
      console.log(value);
      const mealPrep = value.instructions.map(step => (
        <text key={value.label + " - " + step}> {step} <br></br></text>
      ));
      // console.log(mealPrep);

      // const instructionsLength = value.instructions.length;
      //console.log(instructionsLength);

      // var mealIngredient = value.ingredients ;
      // const ingredientsList = value.ingredients.map(step => (
      //   <li key={step}> {step} </li>
      // ));
      this.meal_popups.push(false);
      // console.log(this.meal_popups);
      // console.log(index);
      items.push(
        <div key={value.label + value.id} className="col-sm-12 col-md-4 col-lg-3 mealContainer">
          <div>
            <div style={containerStyle}>
              <img
                src={value.imageSrc}
                className="images"
                style={{ width: "200px", height: "180px" }}
                alt={value.id}
                onClick={() => {
                  this.meal_popups[index] = !this.meal_popups[index];
                  console.log(this.meal_popups);
                  var x = document.getElementById(value.id);
                  var y = document.getElementById(value.id + "products");
                  if (this.meal_popups[index]) {
                    x.style.display = "block";
                    y.style.display = "block";
                  } else {
                    x.style.display = "none";
                    y.style.display = "none";
                  }
                }}
              ></img>
              {/* <img src={value.imageSrc} className="images" style={{width:"100%"}} alt={value.id} onClick={this.showIngredient(index)}></img> */}
              <div>
                {" "}
                {/* <b> */}
                {" "}
                <span style={{ color: "orange" }} >{value.label}</span> <br></br>
                {/* </b> */}
                {" "}

                {" "}
                <span style={{ color: "grey" }}>View Details | {value.cookTime}</span>
                <span
                  style={{ color: "black" }}
                  onClick={() => {
                    this.meal_popups[index] = !this.meal_popups[index];
                    console.log(this.meal_popups);
                    var x = document.getElementById(value.id);
                    var y = document.getElementById(value.id + "products");
                    if (this.meal_popups[index]) {
                      x.style.display = "block";
                      y.style.display = "block";
                    } else {
                      x.style.display = "none";
                      y.style.display = "none";
                    }
                  }}
                >
                </span>
                <div id={value.id} style={{ display: "none" }}>
                  {value.intro}
                  <MyModal
                    value={value}
                    mealPrep={mealPrep}
                    ingredientsList={value.ingredients}
                  />

                </div>
                <br></br>
                <br></br>
                <br></br>
              </div>
              <div id={value.id + "products"} style={{ display: "none" }}>
                {/* Meal Ingredients */}
                <br></br>
                {value.products}
                <WithScrollbar
                  products={value.product_slider}
                // ingredients={[
                //   { name: "sugar", image: "/images/products/sugar.jpeg" },
                //   { name: "onion", image: "/images/products/onion.jpg" },
                //   { name: "tomato", image: "/images/products/tomato.jpg" },
                //   { name: "water", image: "/images/products/water.jpeg" },
                //   {
                //     name: "vegetable oil",
                //     image: "/images/products/vegetable_oil.jpg"
                //   }
                // ]}
                />
                <br />
              </div>
            </div>

          </div>
        </div>
      );
    }
    return (
      <div>
        <div id="title">
          <b>Meals</b>
        </div>
        <div className="container">
          {/* <div className="row"> */}
            {items}
            {/* </div> */}

        </div>
      </div>
    )
  };

  meals = [
    {
      id: 1,
      label: "Garri",
      imageSrc: "/images/meal_pics/Garri.jpg",
      readTime: "2 mins read",
      cookTime: "2 mins",
      intro:
        "Garri (African cereal) is a populous snack-meal in Western African region. " +
        "It is made from cassava and can be drink by soaking in cold water or eaten as meal by soaking in hot water till its solid.",
      ingredients: ["Garri", "Water", "Sugar"],
      new_ingredient: {
        Garri: {
          servings: {
            quantitiy: 1,
            measurements: "Cup(s)"
          }
        },
        Water: {
          servings: {
            quantitiy: 1,
            measurements: "Cup(s)"
          }
        },
        Sugar: {
          servings: {
            quantitiy: 1,
            measurements: "Spoon(s)"
          }
        }
      },
      products: ["Garri ", "Sugar ", "Water "],
      product_slider: [
        { ingredient: "Garri", image: "garri.jpg" },
        { ingredient: "Sugar", image: "sugar.jpeg" },
        { ingredient: "Water", image: "water.jpeg" }
      ],
      quantity: [1, 2, 1],
      measurements: ["Cup(s)", "Cup(s)", "Spoon(s)"],
      instructions: [
        "Mix Garri and Sugar in a bowl",
        "Add ice, water and groundnuts as preffered",
        "Enjoy!"
      ],
      servings: 1,
      display: false
    },
    {
      id: 2,
      label: "Puff Puff",
      imageSrc: "/images/meal_pics/puff_puff1.jpg",
      readTime: "4 mins read",
      cookTime: "80 mins",
      intro:
        " Puff Puff -- A very popular West African street food that's quick and easy to make with different variations." +
        " Dangerously delicious and addicting!",
      ingredients: [
        "Water- 2 Cups",
        "Yeast - 2 and 1/4 teaspoons(1 packet)",
        "Flour- 3 and 1/2 Cups",
        "Sugar- 3/4 Cup"
      ],
      new_ingredient: {
        Garri: {
          servings: {
            quantitiy: 1,
            measurements: "Cup(s)"
          }
        },
        Water: {
          servings: {
            quantitiy: 1,
            measurements: "Cup(s)"
          }
        },
        Sugar: {
          servings: {
            quantitiy: 1,
            measurements: "Spoon(s)"
          }
        }
      },
      products: ["Flour ", "Sugar ", "Yeast ", "Water "],
      product_slider: [
        { ingredient: "Flour", image: "flour.jpg" },
        { ingredient: "Sugar", image: "sugar.jpeg" },
        { ingredient: "Yeast", image: "yeast.jpg" },
        { ingredient: "Water", image: "water.jpeg" }
      ],
      quantity: [1, 2, 1],
      measurements: ["Cup(s)", "Cup(s)", "Spoon(s)"],
      instructions: [
        "Mix salt, sugar, water, and yeast . Set aside for 5 minutes.",
        "Add flour and mix.",
        "Let the mixture rise for approximately 1- 2 hours",
        "In a large,sauce pan pour vegetable oil into a pot, until it is at least 3 inches (or about 5 centimeters) high (too little will result in flatter balls), and place on low heat.",
        "Test to make sure the oil is hot enough by putting a ‘drop’ of batter into the oil. If it is not hot enough, the batter will stay at the bottom of the pot rather than rising to the top.",
        "Using your hands grab a little bit of mixture at time and drop in the oil.",
        "When the oil is hot enough, use a spoon to dish up the batter, and another spoon or spatula to drop it in the oil, sort of in the shape of a ball.",
        "Fry for a few minutes until the bottom side is golden brown.",
        "Turn the ball over and fry for a few more minutes until the other side is golden brown.",
        "Use a large spoon or something like that to take it out of the oil. I usually place them on napkins right away to soak up some of the excess oil.",
        "If desired, you can roll the finished product in table sugar or powdered sugar to make it sweeter"
      ],
      servings: 4,
      display: false
    },
    {
      id: 3,
      label: "Jollof Rice",
      imageSrc: "/images/meal_pics/Jollof.jpg",
      readTime: "4 mins read",
      cookTime: "45 mins",
      intro:
        "Jollof rice is a common delicacy that is enjoyed in the Western Africa region." +
        "Jollof rice a.k.a “One pot”, is a delicious delicacy that can be enjoyed without the need of a side-dish. " +
        " Jollof rice is a good source for carbohydrate, starch, fibers and traces of protein depending on the ingredients. " +
        "Cooking jollof rice is often considered as a work of art due to the many styles and techniques and taste as good as next day left-over. " +
        "Chop-Chow guarantees one of the best methods in Cooking Jollof rice. Chow!",
      ingredients: ["Rice- 3 Cups", "Tomatoes x 6", "Onion x 2"],
      products: ["Rice ", "Tomatoes ", "Onions "],
      product_slider: [
        { ingredient: "Rice", image: "rice.jpeg" },
        { ingredient: "Tomatoes", image: "tomato.jpg" },
        { ingredient: "Onions", image: "onion.jpg" }
      ],
      instructions: [
        "Tomato , Onion Tatashe, Rodo Blended in Blender",
        "Vegetable Oil, Low Heat in Pan",
        "Add onions to Pan",
        "Add Tomato Paste",
        "Add Powdered Ginger, Garlic and Curry",
        "Add Blended Tomatoes mix (If too thick, add water)",
        "Add seasoning, Maggi (Chicken Flavor), Salt",
        "For Jollof Rice, add Bay Leaves."
      ],
      display: true
    },
    {
      id: 4,
      label: "Fried Beans",
      imageSrc: "/images/meal_pics/Fried_beans_w_red_oil_plate.jpg",
      readTime: "4 mins read",
      cookTime: "60 mins",
      intro:
        "Fried beans is a delicious meal rich in protein, vitamins and fiber." +
        " It can serves as alternative for those trying to reduce the intake of meat and animal protein.",
      ingredients: [
        "Black Eyed Beans x 1 bag(350mL)",
        "Onions x 2",
        "Palm Oil- 2 Cups"
      ],
      products: ["Black Eyed Beans ", "Onions ", "Palm Oil "],
      product_slider: [
        { ingredient: "Black Eyed Beans", image: "beans.jpg" },
        { ingredient: "Onions", image: "onion.jpg" },
        { ingredient: "Palm Oil", image: "palm_oil.jpg" }
      ],
      instructions: [
        "Soak beans in water overnight",
        "The next day, chop 1 onion into thin slices, cut the other one into 4 big chunks then pound/grind the pepper.",
        "Rinse the beans and put in a sizeable pot. I rinse it twice.",
        "Pre-cook the sliced onions with a few drops of water to soften them a bit.",
        "When the beans is done, add salt, leave to dry up all the water and transfer the beans to another container.",
        "Now, set a dry clean pot on the stove, pour the palm oil and heat it up till the oil melts (if congealed). Note that you should only heat it up, not bleach the oil. You will know it is hot enough when a piece of onion dropped into the oil sizzles.",
        "Add the precooked onions and stir for a bit.",
        "Add the ground Habanero pepper and stir till everything is heated up very well, at most 2 minutes.",
        "Add the beans and stir for about 2 minutes. Add salt if necessary.",
        "Cover and leave to simmer for about 2 minutes and it's done."
      ],
      display: true
    },
    {
      id: 5,
      label: "Roasted Potatoes",
      imageSrc: "/images/meal_pics/roasted_potatoes.jpg",
      readTime: "3 mins read",
      cookTime: "90 mins",
      intro: "Delicious Red Roasted Potatoes. Popular in European dishes",
      ingredients: [
        "Potatoes - 8",
        "Garlic- 6 cloves",
        "Thyme",
        "Oregano",
        "Basil",
        "Parmesan Cheese",
        "Oil",
        "Butter"
      ],
      products: [
        "Red Potatoes ",
        "Parmesan Cheese ",
        "Thyme ",
        "Oregano ",
        "Basil ",
        "Vegetable Oil ",
        "Butter "
      ],
      product_slider: [
        { ingredient: "Red Potatoes", image: "red_potatoes.jpg" },
        { ingredient: "Parmesan Cheese", image: "parmesan_cheese.jpg" },
        { ingredient: "Thyme", image: "thyme.jpg" },
        { ingredient: "Oregano", image: "oregano.jpg" },
        { ingredient: "Basil", image: "basil.jpg" },
        { ingredient: "Vegetable Oil", image: "vegetable_oil.jpg" },
        { ingredient: "Butter", image: "butter.jpg" }
      ],
      instructions: [
        "Adjust oven rack to lowest position and heat oven to 450 degrees. ",
        "Cut potatoes into quarter chunks",
        "Toss potatoes with oil, salt and pepper chopped garlic, Thyme, Oregano, Basil and then Parmesan Cheese",
        "Arrange, cut side down, on a large lipped cookie sheet or jellyroll pan.",
        "Roast until tender and golden brown, or until desired crispiness about 30-45 minutes",
        "Add butter in between roasting for a savory taste, Transfer to a serving dish when ready."
      ],
      display: true
    },
    {
      id: 6,
      label: "Beans Burger",
      imageSrc: "/images/meal_pics/bean_burger.jpg",
      readTime: "8 mins read",
      cookTime: "40 mins",
      intro:
        "A healthy replacement for beef burgers, Beans burgers is just as filling and can be even more delicious.",
      ingredients: [
        "2 cans black beans",
        "1/2 bell pepper",
        "1 large onion",
        "6 garlic cloves",
        "1 cup breadcrumbs",
        "3 eggs (or more)",
        "Paprika",
        "Cumin",
        "Garlic powder",
        "½ cup cheese",
        "1 tbsp worcestershire sauce",
        "2 tbsp ketchup or bbq sauce"
      ],
      products: [
        "Black Beans",
        "Vegetable Oil",
        "BreadCrumbs",
        "Paprika",
        "Cheese",
        "Worcestershire Sauce",
        "BBQ Sauce",
        "Heinz Ketchup"
      ],
      product_slider: [
        { ingredient: "Black Beans", image: "beans.jpg" },
        { ingredient: "Vegetable Oil", image: "vegetable_oil.jpg" },
        { ingredient: "BreadCrumbs", image: "breadcrumbs.jpg" },
        { ingredient: "Paprika", image: "paprika.jpg" },
        { ingredient: "Cheese", image: "cheese.jpg" },
        {
          ingredient: "Worcestershire Sauce",
          image: "worcestershire_sauce.jpg"
        },
        { ingredient: "BBQ Sauce", image: "bbq_sauce.jpg" },
        { ingredient: "Heinz Ketchup", image: "heinz_ketchup.jpg" }
      ],
      instructions: [
        "Drain and rinse beans and lay out on a baking tray in a single layer. Bake 325F for 15 min, while you set up the rest.",
        "Dice the onion, garlic and pepper as finely as you can. Fry them together with a very small amount of oil, until onions start to go clear.",
        "Blot the onion mix with a paper towel to remove excess oil and moisture. Add to a large mixing bowl with the beans and all other ingredients.",
        "Mix ingredients together and mash with a fork. If the mix does not form solid patties, add more eggs and breadcrumbs until it is more solid. These 2 ingredients are the binding agents.",
        "Form patties with the mix. I typically make them ½ cup size each. For a more tasty version, try adding a layer of cheese in between 2 smaller patties.",
        "Cook by frying around 5 mins on each side, or grill or bake at medium heat for about 10 minutes on each side. Any remaining burgers can be frozen in sandwich bags and cooked another time without any loss of flavour. You don’t need to wait for the burgers to thaw before cooking.",
        "Serve in a bun with toppings and sauces of your choice."
      ],
      display: true
    },
    {
      id: 7,
      label: "Egusi Stew",
      imageSrc: "/images/meal_pics/EgusiSoup.jpg",
      readTime: "5 mins read",
      cookTime: "40 mins",
      intro:
        "A classic west African delicious stew that can be customized to your taste. Egusi can be eaten with varieties of meal like rice, amala and eba.",
      ingredients: [
        "Melon Seeds - 3 Cups",
        "Palm Oil",
        "Chicken/Beef",
        "Spinach - 1",
        "Bell Pepper - 1",
        "Tomatoes - 3",
        "Onion - 1",
        "Maggi",
        "Salt",
        "Stockfish",
        "Crayfish",
        "Assorted meats"
      ],
      products: [
        "Melon Seeds",
        "Palm Oil",
        "Chicken/Beef",
        "Spinach",
        "Bell Pepper",
        "Tomatoes",
        "Onion",
        "Maggi",
        "Salt",
        "Stockfish",
        "Crayfish",
        "Assorted meats"
      ],
      product_slider: [
        { ingredient: "Melon Seeds", image: "melon_seeds.jpg" },
        { ingredient: "Palm Oil", image: "palm_oil.jpg" },
        { ingredient: "Chicken/Beef", image: "chicken_beef.jpg" },
        { ingredient: "Spinach", image: "spinach.jpeg" },
        { ingredient: "Bell Pepper", image: "bell_pepper.jpeg" },
        { ingredient: "Tomatoes", image: "tomato.jpg" },
        { ingredient: "Onion", image: "onion.jpg" },
        { ingredient: "Maggi", image: "maggi.jpg" },
        { ingredient: "Salt", image: "salt.png" },
        { ingredient: "Stockfish", image: "stockfish.jpg" },
        { ingredient: "Crayfish", image: "crayfish.jpg" },
        { ingredient: "Assorted meats", image: "assorted_meats.jpg" }
      ],
      instructions: [
        "Boil chicken/meat and keep aside the liquid broth for later use",
        "Pour 3 cups of powder melon seed into a bowl",
        "Pour 2 cups of water and mix into a thick paste",
        "Pour desired amount of stock fish and crayfish into a bowl and add hot water to soften",
        "Add 1 bell pepper, 3 tomatoes and half onion into blender and blend",
        "Pour a small amount of palm oil and half onion diced into a cooking pot",
        "Let it sizzle for a minute, then add the blended mixture",
        " Cook for 10 minutes, then add chicken or meat broth",
        "Cook for additional 5 minutes ",
        "Add the powdered melon seed in paste form and stir continuously (Reduce the heat to avoid burning)",
        "Add 2 maggi and a sprinkle of salt, then cook for 7 mins",
        "Add a box of chopped spinach and stir",
        "Add the stock fish and crayfish",
        "Add 1 maggi (Taste often for desired level of seasoning)",
        "Cook for additional 10 minutes"
      ],
      display: true
    },
    {
      id: 8,
      label: "Egg Stew",
      imageSrc: "/images/meal_pics/image_coming_soon.png",
      readTime: "5 mins read",
      cookTime: "30 mins",
      intro:
        "Egg stew is a creative modern style of frying eggs and insanely delicious, easy to make. Watch out, you might find this meal addictive.",
      ingredients: [
        "Eggs -3 uncooked",
        "Tomatoes - 3",
        "Onions - 1",
        "Oil",
        "Maggi - 2 cubes",
        "Salt",
        "Shrimp",
        "Sardine"
      ],
      products: [
        "Eggs",
        "Tomatoes",
        "Onions",
        "Oil",
        "Maggi",
        "Salt",
        "Shrimp",
        "Sardine"
      ],
      product_slider: [
        { ingredient: "Eggs", image: "eggs.jpg" },
        { ingredient: "Tomatoes", image: "tomato.jpg" },
        { ingredient: "Onions", image: "onion.jpg" },
        { ingredient: "Oil", image: "oil.jpg" },
        { ingredient: "Maggi", image: "maggi.jpg" },
        { ingredient: "Salt", image: "salt.png" },
        { ingredient: "Shrimp", image: "shrimp.jpeg" },
        { ingredient: "Sardine", image: "sardine.jpg" }
      ],
      instructions: [
        "Add 3 tomatoes and ½ onion into blender and blend",
        "Crack 3 eggs into a bowl, plus 1 maggi and a little sprinkle of salt, then mix well ",
        "Add a small amount of cooking oil into frying pan",
        "Add ½ diced onion and let it fry for about a minute ",
        "Add your choice of secondary ingredients",
        "Let it cook for 5 mins",
        " Add the blended mixture, plus 1 maggi",
        "Let it cook for another 5 mins (Taste often for desired level of seasoning",
        "Pour the egg mixture into the fry pan and stir often ",
        "Let it cook for about 7 mins (stir often)"
      ],
      display: true
    }
  ];
}

export default MealsPage;

const containerStyle = {
  //font: "50px",
  display: "inline-block",
  width: "100%",
  height: "100%"
};

/* <Route
            path="/v1"
            render={props => (
              <div className="container">
                <br></br>
                <div className="row">
                  <div className="col-sm">
                    <b>Meals</b>
                    <ListedMealsSection
                      recipes={this.state.recipes}
                      showIngredients={this.showIngredients}
                      selectedMeal={this.state.selectedMeal}
                    />
                    <span>&#43;</span>
                    <input placeholder="Suggest Meal"></input>
                    &nbsp;
                    <button>
                      Submit{" "}
                      <span
                        id="Popover1"
                        onMouseOver={this.suggestMealToggle}
                        onMouseOut={this.suggestMealToggle}
                      >
                        <img
                          src="/images/info_icon.png"
                          alt="info"
                          style={{ width: "13px", height: "13px" }}
                        />{" "}
                      </span>
                    </button>
                    // onClick={this.suggestMealToggle}
                  </div>
                  <div className="col-sm">
                    <b>Recipe Contents</b>
                    <RecipeContentSection
                      selectedMeal={this.state.selectedMeal}
                    />
                  </div>

                  <div className="col-sm">
                    <b>Ingredients</b>
                    <IngredientSection
                      selectedMealIngredients={
                        this.state.selectedMealIngredients
                      }
                      selectedMeal={this.state.selectedMeal}
                    />
                    // <span>&#43;</span><input placeholder="Suggest Ingredient.."></input>
                  </div>

                  <Popover
                    placement="auto"
                    isOpen={this.state.suggestMealPopOver}
                    target="Popover1"
                    toggle={this.suggestMealToggle}
                  >
                    <PopoverBody>
                      <div className="payback-disclaimer">
                        Suggestions by Guest Users are recorded, but do not
                        change the publicly displayed Meals.
                      </div>
                    </PopoverBody>
                  </Popover>
                </div>
              </div>
            )}
          />

          showIngredients = event => {
    let mealString = event.target.innerText;
    console.log(mealString);

    var meal;
    for (meal in this.meals) {
      //console.log(this.meals[meal].label);
      if (this.meals[meal].label === mealString) {
        //change selected ingredients
        this.setState({
          selectedMealIngredients: this.meals[meal].ingredients
        });
        this.setState({ selectedMeal: this.meals[meal] });
        break;
      }
    }
    //get list of ingredients
  };

         {/* <div className="row">
    <div className="col-sm">
        <b>Meals</b>
        <ListedMealsSection
        recipes={this.state.recipes} showIngredients={this.showIngredients}
        selectedMeal={this.state.selectedMeal}/>

        </div>
    <div className="col-sm">
        <b>Recipe Contents</b>
        <RecipeContentSection selectedMeal= {this.state.selectedMeal}/>

    </div>

    <div className="col-sm">
        <b>Ingredients</b>
        <IngredientSection selectedMealIngredients= {this.state.selectedMealIngredients}
        selectedMeal= {this.state.selectedMeal}/>
    </div>


</div>


*/
