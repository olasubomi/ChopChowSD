const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Purchase grouping is NOT a delivery/driver batch.
// Currency amounts are stored in integer minor units, never floating-point dollars.
const checkoutGroupSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  idempotency_key: { type: String, required: true, unique: true, immutable: true },
  currency: { type: String, required: true, uppercase: true, match: /^[A-Z]{3}$/ },
  fulfillment_region: {
    type: String, required: true,
    enum: ["SAN_DIEGO_CA", "CHARLOTTE_NC", "DURHAM_NC"]
  },
  status: {
    type: String, required: true, default: "DRAFT",
    enum: ["DRAFT", "PAYMENT_PENDING", "PAYMENT_VERIFIED", "CANCELLED"]
  },
  payment_provider: { type: String },
  payment_reference: { type: String },
  item_subtotal_cents: { type: Number, required: true, min: 0 },
  delivery_cents: { type: Number, default: 0, min: 0 },
  tax_cents: { type: Number, default: 0, min: 0 },
  discount_cents: { type: Number, default: 0, min: 0 },
  total_cents: { type: Number, required: true, min: 0 },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }]
}, { timestamps: true });

checkoutGroupSchema.index({ payment_provider: 1, payment_reference: 1 },
  { unique: true, partialFilterExpression: { payment_reference: { $type: "string" } } });

exports.CheckoutGroup = mongoose.models.CheckoutGroup ||
  mongoose.model("CheckoutGroup", checkoutGroupSchema);
