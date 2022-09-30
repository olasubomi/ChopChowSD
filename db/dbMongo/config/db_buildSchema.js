const { boolean } = require("joi");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { mixed } = require("yup");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");


exports.suppliers = mongoose.model(
  "suppliers",
  new Schema({
    store_name: String,
    profile_picture: String,
    background_picture: String,
    supplier_address: ObjectId,
    phone_number: Number,
    email: String,
    hours: Array,
    date_created: Date,
    sugggested_meals_and_products: Array,
    inventory: ObjectId,
    comments: ObjectId,
    inventory_notification_settings: Array,
    store_account_users: Array,
    orders_list: Array,
    drivers: Array
  })
);

exports.products = mongoose.model(
  "products",
  new Schema({
    product_name: String,
    product_image: String,
    product_size: Object,
    stores_available: Array,
    product_categories: Array,
    product_alternatives: Array,
    product_type: String,
    meals_including_product: Array,
    comments: ObjectId,
    ingredients_in_product: Array,
    hidden_ingredients_in_product: Array,
    product_details: String,
    publicly_available: String,
    calories: Array,
    total_carbs: Array,
    net_carbs: Array,
    fiber: Array,
    fat: Array,
    protein: Array
  })
);

// new meal
exports.meals = mongoose.model(
  "meals",
  new Schema({
    meal_name: String,
    meal_images: Array,
    meal_image_names: Array,
    prep_time: Number,
    cook_time: Number,
    intro: String,
    chef: String,
    servings: Number,
    meal_categories: Array,
    kitchen_utensils: Array,
    tips: Array,
    image_or_video_content_1: String,
    image_or_video_content_2: String,
    image_or_video_content_3: String,
    image_or_video_content_4: String,
    image_or_video_content_5: String,
    image_or_video_content_6: String,
    publicly_available: String,
    stores_available: Array,
    similar_meals: Array,
    comments: ObjectId,
    date_created: Date,
    formatted_ingredients: ObjectId,
    formatted_instructions: ObjectId,
    calories: Array,
    total_carbs: Array,
    net_carbs: Array,
    fiber: Array,
    fat: Array,
    protein: Array
  })
);

exports.order_groups= mongoose.model(
  "order_groups",
  new Schema({
    pickup_region: String,
    dropoff_regions: String,
    orders: Array,
    number_of_drivers_currently_visibly_available: Number,
    sub_order_groups: ObjectId
  })
);

exports.orders= mongoose.model(
  "orders",
  new Schema({
    total_order_price: ObjectId,
    order_items:  ObjectId,
    customer_id: Number,
    pickup_details: String,
    intermediaries_details: ObjectId,
    delivery_details: ObjectId,
    payment_details: ObjectId,
    drivers_id: Array,
    order_group: Array,
    pickup_or_delivery: String,
    status: Array
  })
);

exports.order_items= mongoose.model(
  "order_items",
  new Schema({
    item_id: Number,
    item_price: ObjectId,
    store_of_item: Number,
    quantity_of_item: Number,
    estimated_time_of_arrival: Date
  })
);

exports.regions= mongoose.model(
  "regions",
  new Schema({
    region_name: String
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

exports.categories = mongoose.model(
  "categories",
  new Schema({
    category_name: String,
    publicly_available: String
  })
);

exports.utensils = mongoose.model(
  "utensils",
  new Schema({
    name: String,
    type:"",
    publicly_available: String
  })
);

exports.measurements= mongoose.model(
  "measurements",
  new Schema({
    measurement_name: String,
    publicly_available: String
  })
);

exports.addresses= mongoose.model(
  "addresses",
  new Schema({
    phone_number: Number,
    username: String,
    street: String, 
    city: String,
    zip_code: String,
    country: String
  })
);

exports.payment_details= mongoose.model(
  "payment_details",
  new Schema({
    card_number: Number,
    account_number: Number,
    routing_number: Number,
    cvv: Number,
    zip_code: String
  })
);

exports.comments= mongoose.model(
  "comments",
  new Schema({
    title: String,
    message: String,
    rating: Number,
    up_votes: Number,
    down_voted: Number,
    date_time: Date
  })
);

exports.replies= mongoose.model(
  "replies",
  new Schema({
    message: String,
    up_votes: Number,
    down_voted: Number,
    date_time: Date,
    replies: Array
  })
);

exports.notifications= mongoose.model(
  "notifications",
  new Schema({
    message: String,
    read: Boolean,
    date_time: Date,
    redirect_link: String
  })
);

exports.currencies= mongoose.model(
  "currencies",
  new Schema({
    currency: String
  })
);


const groceryListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  products: [{ type: mongoose.Types.ObjectId, ref: "product" }],
});

exports.grocery_list = mongoose.model("grocery_list", groceryListSchema);


const userSchema = new Schema({
  first_name: String,
  last_name: String,
  user_type: String,
  date_joined: Date,
  profile_picture: String,
  super_app_admin: Boolean,
  sub_app_admin: Boolean,
  super_store_admin: Boolean,
  optional_store_ids: Array,
  sub_store_admin: Boolean,
  username: String,
  email: String,
  password: String,
  date_of_birth: Date,
  phone_number: Number,
  food_preferences: Array,
  payment_details: ObjectId,
  delivery_addresses: Array,
  grocery_list: Array,
  cart_list: Array,
  suggested_meals_from_groceries_list: Array,
  suggested_products_for_balanced_diet: Array,
  ordered_list: Array,
  suggested_meals_by_user: Array,
  email_notifications: String,
  database_searches_allowed: Schema.Types.Mixed,
  subscription_member: Boolean,
  subscription_orders: Array,
  notifications: Array,
  ip_ids: Array,
  driver_mode_on: Boolean,
  driver_hours: Array,
  driver_reviews: ObjectId,
  driver_store_affiliations: Schema.Types.Mixed,
  location_compatible_device: Schema.Types.Mixed,
  driver_address: ObjectId,
  driver_orders_picked_up: Array,
  driver_order_regions: Array,
  driver_car_type: String,
  driver_car_color: String,
  driver_car_plate_number: String,
  driver_car_picture: String,
  driver_car_make: String,
  driver_car_model: String,
  driver_car_year: Number,
  tokens: {
    passwordResetToken: {type: String}
  },
})


userSchema.pre("save", async function (next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  if (!user.password) return;
    // hash and update the password using our new salt
  const hash =  await  bcrypt.hash(user.password, 10);
  user.password= hash
  next()
});

userSchema.pre("findOneAndUpdate",{ document: true, query: false }, async function(next) {
  let update = {...this.getUpdate()}
  if(update.$set.password){
    const hash =  await  bcrypt.hash(update.$set.password, 10);
    update.$set.password = hash
    next()
  }
  next()
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
};

userSchema.methods.generateAccessTokens = async function (payload) {

  const accessToken  = await sign(payload, process.env.SECRET, {
    expiresIn: "1h",
  });

  return accessToken;
};

userSchema.methods.generatePasswordResetToken = async function (payload) {
  let user = this

  const passwordResetToken  = await sign(payload, process.env.SECRET, {
    expiresIn: "8h",
  });

  user.tokens.passwordResetToken = passwordResetToken;

  await user.save();

  return passwordResetToken;
};

userSchema.set('toJSON', {
  transform: function(doc, ret, opt) {
      delete ret["token"]
      delete ret['password']
      return ret
  }
})


exports.users = mongoose.model(
  "users",userSchema
);


exports.suggested_meals = mongoose.model(
  "suggested_meals",
  new Schema({
    label: String,
    mealImage: String,
    readTime: String,
    cookTime: String,
    intro: String,
    product_slider: [{ ingredient: String, image: String, flag:Boolean }],
    newer_ingredient_format: [
      { product: String, quantity: Number, measurement: String, image: String },
    ],
    servings: Number,
    categories: Array,
    instructions: [ { step: Object, image: String }],
    display: Boolean
  })
);
