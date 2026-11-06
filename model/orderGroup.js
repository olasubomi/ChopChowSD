const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Preserve the legacy MongoDB collection and public export name.
// This is a delivery grouping, not a payment/checkout group.
const legacyGroupSchema = new Schema({
    pickup_region: { type: String },
    dropoff_regions: { type: String },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    number_of_drivers_currently_visibly_available: { type: String },
    sub_order_groups: [{ type: Schema.Types.ObjectId, ref: "OrderGroup" }]
}, { timestamps: true, collection: "order_groups" });

const OrderGroup = mongoose.models.OrderGroup ||
    mongoose.model("OrderGroup", legacyGroupSchema);

exports.OrderGroup = OrderGroup;
exports.order_groups = OrderGroup; // backward-compatible alias
