const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const Joi = require('joi')

const userSchema = new Schema(
  {
    first_name: { type: String, required: true },

    last_name: { type: String, required: true },

    user_type: { type: String, default: "customer", enum: ['supplier', 'customer'] },

    profile_picture: { type: String },

    super_app_admin: { type: Boolean, default: false },

    sub_app_admin: { type: Boolean, default: false },

    super_store_admin: { type: Boolean, default: false },

    sub_store_admin: { type: Boolean, default: false },

    username: { type: String, required: true },

    email: { type: String, required: true },

    password: { type: String, required: true },

    date_of_birth: { type: String },

    phone_number: {
      // country_code: { type: String, required: true },
      type: String,
      required: true,
    },

    food_preferences: [
      {
        type: mongoose.Types.ObjectId,
        ref: "meal",
      },
    ],

    payment_details: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Payment_details",
      },
    ],

    delivery_addresses: {
      phone_number: { type: String },
      username: { type: String },
      street: { type: String },
      city: { type: String },
      zip_code: { type: String },
      country: { type: String },
    },
    grocery_list: {
      type: mongoose.Types.ObjectId,
      ref: "Grocery_list",
    },
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
    },

    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
      },
    ],

    suggested_meals: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Suggested_meals",
      },
    ],

    email_notifications: { type: Boolean, default: true },

    database_searches_allowed: { type: Boolean, default: true },

    subscription_member: { type: Boolean },

    subscription_orders: [{}],

    notifications: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Notification",
      },
    ],

    ip_ids: [
      {
        type: String,
      },
    ],

    driver_mode: Boolean,

    driver_hours: Array,

    driver_reviews: ObjectId,

    driver_store_affiliations: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Supplier",
      },
    ],

    location_compatible_device: { type: Boolean },

    address: {
      street: { type: String },

      city: { type: String },

      zip_code: { type: String },

      country: { type: String },
    },

    driver_address: [
      {
        street: { type: String },

        street: { type: String },

        city: { type: String },

        zip_code: { type: String },

        country: { type: String },
      },
    ],

    driver_orders_picked_up: Array,

    driver_order_regions: [{ type: String }],

    driver_car_type: { type: String },

    driver_car_color: { type: String },

    driver_car_plate_number: { type: String },

    driver_car_picture: { type: String },

    driver_car_make: { type: String },

    driver_car_model: { type: String },

    driver_car_year: { type: String },

    tokens: {
      passwordResetToken: { type: String },
    },
  },

  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  if (!user.password) return;
  // hash and update the password using our new salt
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

userSchema.pre(
  "findOneAndUpdate",

  { document: true, query: false },

  async function (next) {
    let update = { ...this.getUpdate() };

    if (update.$set.password) {
      const hash = await bcrypt.hash(update.$set.password, 10);

      update.$set.password = hash;

      next();
    }
    next();
  }
);

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAccessTokens = async function (payload) {
  const accessToken = await sign(payload, process.env.SECRET, {
    expiresIn: "1h",
  });

  return accessToken;
};

userSchema.methods.generatePasswordResetToken = async function (payload) {
  let user = this;

  const passwordResetToken = await sign(payload, process.env.SECRET, {
    expiresIn: "8h",
  });

  user.tokens.passwordResetToken = passwordResetToken;

  await user.save();

  return passwordResetToken;
};

userSchema.methods.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["token"];
    delete ret["password"];
    return ret;
  },
});

exports.User = mongoose.model("User", userSchema);

const groceryListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },

  { timestamps: true }
);

exports.grocery_list = mongoose.model("Grocery_list", groceryListSchema);

exports.cart = mongoose.model(
  "Cart",
  new Schema(
    {
      total: { type: String },

      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      cart_items: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Order_items",
        },
      ],
    },
    { timestamps: true }
  )
);

exports.products = mongoose.model(
  "Product",
  new Schema(
    {
      product_name: { type: String, required: true },

      product_images: { type: [{ type: String }] },

      product_size: [{ type: String }],

      stores_available: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Supplier",
        },
      ],

      product_categories: [{ type: String }],

      product_alternatives: [{ type: String }],

      product_type: { type: String },

      meals_including_product: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Meal",
        },
      ],
      user: [
        {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      ],

      comments: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Comment",
        },
      ],

      ingredients_in_product: [{ type: String }],

      hidden_ingredients_in_product: [{ type: String }],

      product_details: [{}],

      product_descriptions: [{ type: String }],

      status: { type: String, default: "PENDING" },

      calories: { type: String },

      total_carbs: { type: String },

      net_carbs: { type: String },

      fiber: { type: String },

      fat: { type: String },

      protein: { type: String },
    },
    { timestamps: true }
  )
);

// new meal
exports.meals = mongoose.model(
  "Meal",
  new Schema(
    {
      meal_name: { type: String, required: true },

      meal_images: [{ type: String }],
      instructions: [{ type: String }],
      instructionTitles: [{ type: String }],
      instruction_images: [
        {
          type: String,
        },
      ],

      image_or_video_content: { type: String },

      image_or_video_content_1: { type: String },

      image_or_video_content_2: { type: String },

      image_or_video_content_3: { type: String },

      image_or_video_content_4: { type: String },

      image_or_video_content_5: { type: String },

      image_or_video_content_6: { type: String },

      prep_time: { type: String, required: true },

      cook_time: { type: String, required: true },

      intro: { type: String },

      chef: { type: String, required: true },

      servings: { type: String },

      meal_categories: [
        {
          type: String,
        },
      ],

      kitchen_utensils: [{}],

      tips: [{ type: String }],

      image_or_video_content: [{ type: String }],

      status: {
        type: String,
        required: true,
        default: "Draft",
        enum: ["Draft", "Pending", "Public", "Rejected"],
      },

      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },

      stores_available: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Supplier",
        },
      ],

      similar_meals: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Meal",
        },
      ],
      formatted_ingredients: [{ type: String }],

      formatted_instructions: [{ type: String }],

      calories: { type: String },

      total_carbs: { type: String },

      net_carbs: { type: String },

      fiber: { type: String },

      fat: { type: String },

      protein: { type: String },
    },

    { timestamps: true }
  )
);

exports.Supplier = mongoose.model(
  "Supplier",
  new Schema(
    {
      store_name: { type: String },
      phone_number: { type: String, required: false },

      profile_picture: { type: String },

      background_picture: { type: String },

      supplier_address: {
        phone_number: { type: String },
        username: { type: String },
        street: { type: String },
        city: { type: String },
        zip_code: { type: String },
        country: { type: String },
      },

      email: { type: String },

      hours: [{ type: String }],

      suggested_meals_and_products: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Meal",
        },
      ], //more clarification on these
      store_owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      inventory: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Inventory",
        },
      ],
      comments: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Comment",
        },
      ],
      inventory_notification_settings: Array,
      store_account_users: [
        {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      ],
      orders_list: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Order_items",
        },
      ],
      drivers: [
        {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    { timestamps: true }
  )
);

exports.order_groups = mongoose.model(
  "order_groups",
  new Schema(
    {
      pickup_region: { type: String },

      dropoff_regions: { type: String },

      orders: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Order",
        },
      ],

      number_of_drivers_currently_visibly_available: { type: String },

      sub_order_groups: ObjectId, //need more explanation on this
    },

    { timestamps: true }
  )
);

exports.Order = mongoose.model(
  "Order",
  new Schema(
    {
      total_order_price: { type: String },

      order_items: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Order_items",
        },
      ],

      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      pickup_details: { type: {} },

      intermediaries_details: ObjectId, //need more clarifiaction on these

      delivery_details: { type: {} },

      payment_details: { type: {} },

      drivers_id: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },

      order_group: Array,

      status: {
        type: String,
        required: true,
        default: "PENDING",
        enum: ["DELIVERED", "PENDING", "PROCESSED", "PICKEDUP"],
      },
    },

    { timestamps: true }
  )
);

exports.order_items = mongoose.model(
  "Order_items",
  new Schema({
    item: {
      type: mongoose.Types.ObjectId,
      refPath: "item_type",
      required: true,
    },

    item_type: {
      type: String,
      required: true,
      enum: ["Meal", "Product"],
    },

    store: {
      type: [mongoose.Types.ObjectId],
      ref: "Supplier",
    },

    quantity_of_item: { type: String },

    estimated_time_of_arrival: Date,
  })
);

exports.regions = mongoose.model(
  "regions",
  new Schema({
    region_name: String,
  })
);

exports.categories = mongoose.model(
  "Category",
  new Schema(
    {
      category_name: { type: String, unique: true },
      status: {
        type: String,
        required: true,
        default: "PENDING",
        enum: ["DRAFT", "PENDING", "PUBLIC", "REJECTED"],
      },
      affiliated_objects: {
        type: String,
        required: true,
        enum: ["MEAL", "INGREDIENT", "UTENSIL", "PRODUCT", "ANY"],
      },
    },

    { timestamps: true }
  )
);

exports.descriptions = mongoose.model(
  "Description",
  new Schema({
    description_name: { type: String },

    status: {
      type: String,
      required: true,
      default: "PENDING",
      enum: ["DRAFT", "PENDING", "PUBLIC", "REJECTED"],
    },
  })
);

exports.Utensil = mongoose.model(
  "Utensil",
  new Schema(
    {
      name: { type: String, unique: true },
      status: {
        type: String,
        required: true,
        default: "PENDING",
        enum: ["DRAFT", "PENDING", "PUBLIC", "REJECTED"],
      },
    },

    { timestamps: true }
  )
);

//exports.Measurement = mongoose.model(
//  "Measurement",
//  new Schema({
//    measurement_name: { type: String },

//    publicly_available: { type: Boolean, default: true },
//  })
//);

exports.addresses = mongoose.model(
  "addresses",
  new Schema({
    phone_number: { type: String },

    username: { type: String },

    street: { type: String },

    city: { type: String },

    zip_code: { type: String },

    country: { type: String },
  })
);

exports.Payment_details = mongoose.model(
  "Payment_details",
  new Schema(
    {
      card_number: { type: String },

      account_number: { type: String },

      routing_number: { type: String },

      cvv: { type: String },

      zip_code: { type: String },

      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },

    { timestamps: true }
  )
);

exports.Reply = mongoose.model(
  "Reply",
  new Schema(
    {
      message: { type: String },

      up_votes: { type: String },

      down_votes: { type: String },

      owner: {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        required: true,
      },

      replies: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Reply",
          required: true,
        },
      ],
    },
    { timestamps: true }
  )
);

exports.notifications = mongoose.model(
  "Notification",
  new Schema(
    {
      message: { type: String },

      read: Boolean,

      notifiable: {
        type: mongoose.Types.ObjectId,
        refPath: "notifiableType",
        required: true,
      },

      notifiableType: {
        type: String,
        required: true,
        enum: ["User", "Driver", "Product"],
      },
    },

    { timestamps: true }
  )
);


exports.item_description = mongoose.model(
  "item_description",
  new Schema({
    description_key: {
      type: String,
      required: true
    },
    object_quantity: {
      type: Number
    },
    object_measurement: {
      type: mongoose.Schema.Types.Mixed
    },
    formatted_string: {
      type: String
    },
    description_values: {
      type: Object
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
      enum: ["Draft", "Pending", "Public", "Rejected"],
    },
  }, { timestamps: true })
)

exports.currencies = mongoose.model(
  "currencies",
  new Schema(
    {
      currency: { type: String },
    },

    { timestamps: true }
  )
);

exports.validateItemDescription = (description) => {
  const schema = Joi.object({
    status: Joi.string().required()
  });

  return schema.validate(description);
}

