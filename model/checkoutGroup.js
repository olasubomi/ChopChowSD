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

checkoutGroupSchema.pre("validate", function (next) {
  const monetaryFields = ["item_subtotal_cents", "delivery_cents",
    "tax_cents", "discount_cents", "total_cents"];
  for (const field of monetaryFields) {
    const amount = this[field];
    if (!Number.isSafeInteger(amount) || amount < 0) {
      this.invalidate(field, field + " must be non-negative integer minor units");
    }
  }
  if (monetaryFields.every(field => Number.isSafeInteger(this[field]))) {
    const due = this.item_subtotal_cents + this.delivery_cents +
      this.tax_cents - this.discount_cents;
    if (!Number.isSafeInteger(due) || due < 0 || this.total_cents !== due) {
      this.invalidate("total_cents", "Checkout amounts must reconcile");
    }
  }
  next();
});

checkoutGroupSchema.index({ payment_provider: 1, payment_reference: 1 },
  { unique: true, partialFilterExpression: { payment_reference: { $type: "string" } } });

exports.CheckoutGroup = mongoose.models.CheckoutGroup ||
  mongoose.model("CheckoutGroup", checkoutGroupSchema);
