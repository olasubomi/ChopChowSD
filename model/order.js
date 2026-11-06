const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Legacy Order documents remain readable. New checkout-linked orders carry
// supplier-specific fulfillment information and immutable quoted line snapshots.
const quotedLineSchema = new Schema({
    item: { type: Schema.Types.ObjectId, required: true },
    item_type: { type: String, enum: ["Meal", "Product", "Utensil"], required: true },
    quantity: { type: Number, required: true, min: 1 },
    unit_price_cents: { type: Number, required: true, min: 0 },
    subtotal_cents: { type: Number, required: true, min: 0 }
}, { _id: false });

const orderSchema = new Schema(
    {
        total_order_price: { type: String }, // legacy
        order_items: [{ type: Schema.Types.ObjectId, ref: "Order_items" }],
        user: { type: Schema.Types.ObjectId, ref: "User" },

        // CCD-481: optional for existing Orders, required together for new checkout-linked orders
        checkout_group: { type: Schema.Types.ObjectId, ref: "CheckoutGroup", index: true },
        store: { type: Schema.Types.ObjectId, ref: "Supplier", index: true },
        owner_type: { type: String, enum: ["CHOP_CHOW", "THIRD_PARTY"] },
        fulfillment_region: {
            type: String,
            enum: ["SAN_DIEGO_CA", "CHARLOTTE_NC", "DURHAM_NC"]
        },
        currency: { type: String, uppercase: true, match: /^[A-Z]{3}$/ },
        line_items: { type: [quotedLineSchema], default: undefined },
        subtotal_cents: { type: Number, min: 0 },
        total_cents: { type: Number, min: 0 },

        payment_transaction_id: { type: String },
        customer_id: { type: String },
        pickup_details: { type: String },
        intermediaries_details: { type: String },
        delivery_details: { type: {} },
        payment_details: { type: {} },
        drivers_id: { type: Schema.Types.ObjectId, ref: "User" },
        total: { type: Number, required: true, min: 0 },

        // Legacy delivery grouping (NOT the checkout grouping).
        order_group: { type: Schema.Types.ObjectId, ref: "OrderGroup" },
        pickup_or_delivery: { type: String },
        Notification_status: { type: Schema.Types.ObjectId, ref: "Notification_status" },
        status: {
            type: String,
            required: true,
            default: "PENDING",
            enum: ["DELIVERED", "PENDING", "PROCESSED", "PICKEDUP"]
        },
        frequency_to_deliver: { type: String },
        supplier_confirmation_picture: { type: String },
        driver_confirmation_picture: { type: String },
        customer_confirmation_picture: { type: String },
        subtotal: { type: Number, required: true, min: 0 }
    },
    { timestamps: true }
);

orderSchema.pre("validate", function (next) {
    if (!this.checkout_group) return next();
    const fields = ["store", "owner_type", "fulfillment_region", "currency",
        "line_items", "subtotal_cents", "total_cents"];
    for (const field of fields) {
        if (this[field] === undefined || this[field] === null ||
            (field === "line_items" && this.line_items.length === 0)) {
            this.invalidate(field, field + " is required for checkout-linked orders");
        }
    }
    if (Array.isArray(this.line_items) &&
        this.line_items.some(line =>
            !Number.isSafeInteger(line.quantity) || line.quantity < 1 ||
            !Number.isSafeInteger(line.unit_price_cents) ||
            !Number.isSafeInteger(line.subtotal_cents) ||
            line.subtotal_cents !== line.quantity * line.unit_price_cents)) {
        this.invalidate("line_items", "Quoted lines must have consistent integer minor-unit amounts");
    }
    if (this.subtotal_cents !== undefined && this.total_cents !== undefined &&
        (!Number.isSafeInteger(this.subtotal_cents) ||
         !Number.isSafeInteger(this.total_cents) ||
         this.subtotal_cents < 0 || this.total_cents < 0)) {
        this.invalidate("total_cents", "Amounts must be non-negative integer minor units");
    }
    if (Array.isArray(this.line_items) && this.subtotal_cents !== undefined) {
        const sum = this.line_items.reduce((n, line) => n + (line.subtotal_cents || 0), 0);
        if (sum !== this.subtotal_cents) {
            this.invalidate("subtotal_cents", "Line totals must reconcile to subtotal");
        }
    }
    next();
});

exports.Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

// Validator is retained for existing service imports. New checkout creation
// must use its separate server-verified quote and payment paths.
function validateOrder(order) {
    return Joi.object({
        user: Joi.string().hex().length(24),
        userId: Joi.string().hex().length(24),
        order_items: Joi.array().items(Joi.string().hex().length(24)),
        total: Joi.number().min(0).required(),
        subtotal: Joi.number().min(0).required(),
        status: Joi.string().valid("DELIVERED", "PENDING", "PROCESSED", "PICKEDUP"),
        checkout_group: Joi.string().hex().length(24),
        store: Joi.string().hex().length(24),
        currency: Joi.string().length(3)
    }).unknown(true).validate(order);
}
exports.validateOrder = validateOrder;
