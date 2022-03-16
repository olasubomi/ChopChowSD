const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.all_products = mongoose.model(
  "all_products",
  new Schema({
    // id: Number,
    product_name: String,
    product_image: String,
    // product_price: String,
    size: Object,
    // respective_prices: Array,
  })
);

exports.suggested_products = mongoose.model(
  "suggested_products",
  new Schema({
    // id: Number,
    product_name: String,
    product_image: String,
    // product_price: String,
    size: Object,
    // respective_prices: Array,
  })
);

// new meal
exports.meals = mongoose.model(
  "meals",
  new Schema({
    mealName: String,
    intro: String,
    mealImages: Array,
    ingredientMeasurements: Array,
    prepTime: Object,
    cookTime: Object,
    stepSlides: Object,
    productImages: Array,
    productNames: Array,
    productPageUrl: Array,
    url: String,
    chef: String,
    servings: Number,
    instructions: [ { step: Object, image: String }],
    utensilsRequired: Array,
    categories: Array,
    tips: Array,
    calories: Object,
    total_carbs: Object,
    net_carbs: Object,
    fiber: Object,
    fat: Object,
    protein: Object,
  })
);

exports.meal_images = mongoose.model(
  "meal_images",
  new Schema({
  name: String,
  data: Object,
  contentType: String
})
);

exports.suggested_meals = mongoose.model(
  "suggested_meals",
  new Schema({
    mealName: String,
    mealImage: Object, // Using object as expected default to retrieve object from client (Required!)
    mealImageName: String, // Using String to retrieve image by filename in db
    prepTime: String,
    cookTime: String,
    intro: String,
    formatted_ingredient: Array,
    stepSlides : Array,
    chef : String,
    categories: Array,
    utensilsRequired: Array,
    tips: Array,
    servings: Number,
    ImageOrVideoContent1: Object,
    ImageOrVideoContent2: Object,
    ImageOrVideoContent3: Object,
    ImageOrVideoContent4: Object,
    ImageOrVideoContent5: Object,
    ImageOrVideoContent6: Object
  })
);

exports.all_meal_categories = mongoose.model(
  "all_meal_categories",
  new Schema({
    category_name: String,
  })
);

exports.suggested_meal_categories = mongoose.model(
  "suggested_meal_categories",
  new Schema({
    category_name: String,
  })
);

exports.all_utensils = mongoose.model(
  "all_utensils",
  new Schema({
    kitchenUtensil: String
  })
);

exports.suggested_utensils = mongoose.model(
  "suggested_utensils",
  new Schema({
    kitchenUtensil: String
  })
);

exports.all_measurements= mongoose.model(
  "all_measurements",
  new Schema({
    measurement: String
  })
);

exports.suggested_measurements= mongoose.model(
  "suggested_measurements",
  new Schema({
    measurement: String
  })
);

// Below are User schemas÷

exports.store_products = mongoose.model(
  "store_products",
  new Schema({
    id: Number,
    store_name: String,
    store_image: String,
    products: Array,
  })
);

exports.customers = mongoose.model(
  "customers",
  new Schema({
    id: Number,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    phoneNumber: Number,
    street: String,
    city: String,
    zipCode: Number,
    ipsid: Number,
    username: String,
    emailNotification: Boolean,
  })
);

exports.customers_lists = mongoose.model(
  "customers_lists",
  new Schema({
    id: Number,
    customer_id: Number,
    grocery_list_id: Number,
    cart_list_id: Number,
  })
);

exports.customer_cart_list = mongoose.model(
  "customer_cart_list",
  new Schema({
    list_id: Number,
    cart_list: Array,
  })
);

exports.customer_grocery_list = mongoose.model(
  "customer_grocery_list",
  new Schema({
    list_id: Number,
    grocery_list: Array,
  })
);




// //old meals
// exports.meals = mongoose.model(
//   "meals",
//   new Schema({
//     label: String,
//     mealImage: String,
//     readTime: String,
//     cookTime: String,
//     intro: String,
//     product_slider: [{ ingredient: String, image: String, flag:Boolean }],
//     newer_ingredient_format: [
//       { product: String, quantity: Number, measurement: String, image: String },
//     ],
//     servings: Number,
//     categories: Array,
//     instructions: [ { step: Object, image: String }],
//     display: Boolean,
//   })
// );



    // product_slider: [{ ingredient: String, image: String, flag:Boolean }],
    // newer_ingredient_format: [
    //   { product: String, quantity: Number, measurement: String, image: String },
    // ],
    // instructions: [ { step: Object, image: String }],
    // display: Boolean



// exports.admin = mongoose.model('admin', new Schema({
//     id: Schema.Types.ObjectId,
//     name: String,
// }))

// exports.supplier = mongoose.model('supplier', new Schema({
//     id: Schema.Types.ObjectId,
//     storeName: String,
// }))

// exports.lists = mongoose.model('lists', new Schema({
//     id: Number,
//     product_name: String,
//     product_image:String,
//     product_price:Number,
//     sizes:String,
//     price_per_ounce:Number,
// }))

// exports.meals = mongoose.model(
//   "meals",
//   new Schema({
//     id: Number,
//     label: String,
//     mealImage: String,
//     readTime: String,
//     cookTime: String,
//     intro: String,
//     product_slider: [{ ingredient: String, image: String }],
//     newer_ingredient_format: [
//       { product: String, quantity: Number, measurement: String, image: String },
//     ],
//     servings: Number,
//     categories: Array,
//     instructions: Array,
//     display: Boolean,
//   })
// );

// exports.suggested_meals = mongoose.model(
//   "suggested_meals",
//   new Schema({
//     label: String,
//     imageSrc: String,
//     readTime: String,
//     cookTime: String,
//     intro: String,
//     newer_ingredient_format: [
//       { product: String, quantity: Number, measurement: String, image: String },
//     ],
//     servings: Number,
//     categories: Array,
//     instructions: Array,
//   })
// );
