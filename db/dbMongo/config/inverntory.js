const mongoose = require("mongoose");


exports.Inventory = mongoose.model(
  "Inventory",
  new mongoose.Schema(
    {
      item_type: { type: String },

      item: {
        type: mongoose.Types.ObjectId,
        refPath: "item_type",
        required: true,
      },

      prepackagedMeal: { type: Boolean, default: false },

      storeId: {
        type: mongoose.Types.ObjectId,
        ref: "Supplier",
        required: true,
      },

      quantity_in_stock: { type: String },

      estimated_restock_time: { type: String },

      estimated_preparation_time: { type: String },

      ingredients: [
        {
          name: { type: String },

          set_price: {
            type: String,
          },

          quantity: { type: String },

          product_available: Boolean,
        },
      ],

      bulk_discounts: { type: String },

      in_stock: { type: Boolean, default: true },
    },

    { timestamps: true }
  )
);
