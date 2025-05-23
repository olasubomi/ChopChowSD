const mongoose = require("mongoose");

exports.Inventory = mongoose.model(
  "Inventory",
  new mongoose.Schema(
    {
      item_type: { type: String },

      item: {
        type: mongoose.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
      },

      prepackagedMeal: { type: Boolean, default: false },

      storeId: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Supplier",
          required: true,
        }
      ],

      quantityInStock: { type: String },

      estimatedRestockTime: { type: String },

      estimatedPreparationTime: { type: String },

      // meal_price: { type: String },
      meal_price: [
        {
          store_id: { type: mongoose.Types.ObjectId, ref: "Supplier" },
          currency: { type: String },
          price: { type: Number },
        }
      ],

      ingredients: [
        {
          item_name: { type: String },

          // set_price: {
          //   type: String,
          // },
          set_prices: [
            {
              store_id: { type: mongoose.Types.ObjectId, ref: "Supplier" },
              currency: { type: String },
              price: { type: Number },
            }
          ],
          item_quantity: { type: String },

          product_available: Boolean,
        },
      ],

      bulk_discounts: { type: String },

      in_stock: { type: Boolean, default: true },
    },

    { timestamps: true }
  )
);
