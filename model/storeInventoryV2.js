"use strict";

// Target V2 inventory model; additive and NOT wired into legacy routes or production.
// Single canonical Item + one Supplier per row. Catalog-only suggestions need no inventory.
const mongoose = require("mongoose");
const { isPurchasableInventory } = require("../services/inventoryAvailability");

const schema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true, immutable: true },
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true, immutable: true },
  currency: { type: String, uppercase: true, trim: true, match: /^[A-Z]{3}$/ },
  price_cents: { type: Number, min: 0, validate: Number.isSafeInteger },
  stock_policy: {
    type: String, enum: ["UNCONFIRMED", "TRACKED", "MADE_TO_ORDER"],
    default: "UNCONFIRMED", required: true
  },
  quantity_in_stock: {
    type: Number, min: 0, validate: Number.isSafeInteger, default: null
  },
  availability: {
    type: String, enum: ["AVAILABLE", "UNAVAILABLE"],
    default: "UNAVAILABLE", required: true
  },
  is_private: { type: Boolean, default: false },
  source_inventory_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Inventory" }],
  source_item_id: { type: mongoose.Schema.Types.ObjectId },
  migration_status: {
    type: String, enum: ["REVIEW", "VERIFIED"], default: "REVIEW"
  }
}, { timestamps: true, collection: "store_inventories_v2" });

// Only one authoritative inventory offering per item and store.
schema.index({ item: 1, store: 1 }, { unique: true });

schema.pre("validate", function (next) {
  // An item without a valid store price MUST NOT become available.
  if (this.availability === "AVAILABLE") {
    const verdict = isPurchasableInventory(this.toObject());
    if (!verdict.ok) {
      this.invalidate("availability", "Cannot publish store inventory: " + verdict.reasons.join(", "));
    }
  }
  if (this.stock_policy !== "TRACKED" && this.quantity_in_stock != null) {
    this.invalidate("quantity_in_stock", "A quantity requires TRACKED stock policy");
  }
  if (this.stock_policy === "TRACKED" && !Number.isSafeInteger(this.quantity_in_stock)) {
    this.invalidate("quantity_in_stock", "TRACKED stock requires a nonnegative integer quantity");
  }
  next();
});

module.exports = {
  StoreInventoryV2: mongoose.models.StoreInventoryV2 ||
    mongoose.model("StoreInventoryV2", schema)
};
