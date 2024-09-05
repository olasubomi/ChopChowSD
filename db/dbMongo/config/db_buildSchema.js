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

    user_type: { type: String, default: "customer", enum: ['supplier', 'customer', 'admin', 'driver'] },

    // user_type: {
    //   type: Array, default: ['customer'],
    //   // enum: ['supplier', 'customer', 'admin', 'driver'] 
    // },

    profile_picture: { type: String },



    sub_app_admin: { type: Boolean, default: false },

    hasSupplierAffiliation: { type: Boolean, default: false },

    sub_store_admin: { type: Boolean, default: false },

    username: { type: String, required: true },

    email: { type: String, required: true },

    password: { type: String, required: true },

    date_of_birth: { type: String },

    total_rating: { type: Number, required: false, default: 0 },

    average_rating: { type: Number, required: false, default: 0 },

    phone_number: {

      type: String,
      required: false,
    },
    phone_number_verified: {
      type: Boolean,
      default: false,
      required: false,
    },
    email_verified: {

      type: Boolean,
      default: false,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    email_token: {

      type: String,
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
    cart: [{
      type: mongoose.Types.ObjectId,
      ref: "Cart",
    }],

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
      emailValidationToken: { type: String }
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
  let user = this;
  const accessToken = await sign(payload, process.env.SECRET, {
    expiresIn: "2h",
  });
  user.tokens.emailValidationToken = accessToken;

  await user.save();
  return accessToken;
};


userSchema.methods.generateRefreshTokens = async function (payload) {
  const refreshToken = await sign(payload, process.env.SECRET, {
    expiresIn: "7d",
  });

  return refreshToken;
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



exports.products = mongoose.model(
  "Products",
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

exports.StoreClaim = mongoose.model(
  "Store Claim",
  new Schema(
    {
      store: {
        type: Schema.Types.ObjectId,
        ref: "Supplier"
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      business_information: {
        business_name: { type: String, required: true },
        business_address: { type: String, required: true },
        business_reg_number: { type: String, required: true },
        business_ownership_proof: { type: String, required: true },

      },
      status: {
        type: String,
        default: 'UNAPPROVED',
        enum: ['PENDING', 'APPROVED', 'REJECTED', 'UNAPPROVED']
      }

    }
  )
)

exports.Supplier = mongoose.model(
  "Supplier",
  new Schema(
    {
      store_name: { type: String },
      phone_number: { type: String, required: false },

      profile_picture: { type: String },

      background_picture: { type: String },

      total_rating: { type: Number, required: false, default: 0 },

      average_rating: { type: Number, required: false, default: 0 },

      store_admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }],

      currency: {
        name: {
          type: String,
          default: "USD"
        },
        symbol: {
          type: String,
          default: "$"
        }
      },

      supplier_address: {
        phone_number: { type: String },
        username: { type: String },
        street: { type: String },
        city: { type: String },
        zip_code: { type: String },
        country: { type: String },
        lat: { type: String },
        lng: { type: String },
        place_id: { type: String },
        address: { type: String },
        state: { type: String }
      },

      description: { type: String },

      email: { type: String },

      hours: { type: Object },

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
      sub_app_admin: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
      }],
      store_sub_admins: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
      }],
      status: {
        type: String,
        enum: ['PENDING', 'PRIVATE', 'PUBLIC', 'DRAFT', 'REJECTED'],
        default: "PENDING"
      }
    },
    { timestamps: true }
  )
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

      read: {
        type: Boolean,
        default: false
      },

      notifiable: {
        type: mongoose.Types.ObjectId,
        refPath: "notifiableType",
        required: true,
      },

      notifiableType: {
        type: String,
        required: true,
        enum: ["User", "Driver", "Product", "Item", "Comment", "Reply"],
      },
    },

    { timestamps: true }
  )
);


exports.Other = mongoose.model(
  "other",
  new Schema({
    item_name: {
      type: String,
      required: true
    },
    item_image: String,
    item_status: {
      type: String,
      default: "Draft"
    }
  },
    {
      timestamps: true
    })
)

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

exports.blog = mongoose.model(
  "blog",
  new Schema(
    {
      title: { type: String, required: true },
      featured_image: { type: String, required: true },
      tags: { type: Array, default: [] },
      meta_description: { type: String },
      status: { type: String, enum: ["PUBLISHED", 'DRAFT'], default: "PUBLISHED" },
      url_slug: { type: String },
      html_template: { type: String, required: true },
      body_content_text: { type: String, required: true },
      word_count: { type: String, required: true },
      comments: { type: Array, default: [] },
      author: { type: mongoose.Types.ObjectId, ref: "User" },
      category: {
        type: String,
        enum: ["MEAL", "INGREDIENTS", "UTENSILS", "KITCHEN TIPS"]
      }
    },
    {
      timestamps: true
    }
  ),

)

exports.validateItemOther = (other) => {
  const schema = Joi.object({
    item_name: Joi.string().required(),
    item_image: Joi.string().optional(),
    listName: Joi.string().required()
  })
  return schema.validate(other)
}

exports.validateItemDescription = (description) => {
  const schema = Joi.object({
    status: Joi.string().required()
  });

  return schema.validate(description);
}

exports.validateBlog = (payload) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    html_template: Joi.string().required(),
    body_content_text: Joi.string().required(),
    word_count: Joi.string().required(),
    status: Joi.string().optional(),
    featured_image: Joi.string().required(),
    category: Joi.string().required()
  });

  return schema.validate(payload);
}

exports.validateStoreInformation = (values) => {
  const schema = Joi.object({
    business_name: Joi.string().required(),
    business_address: Joi.string().required(),
    business_reg_number: Joi.string().required(),
    business_ownership_proof: Joi.string().required(),
  })
  return schema.validate(values)
}