"use strict";

// Draft, authenticated store-inventory management API.
// This collection is separate from the legacy inventory and is not used by checkout yet.
const mongoose = require("mongoose");
const { Item } = require("../../model/item");
const { StoreInventoryV2 } = require("../../model/storeInventoryV2");
const { isPlatformAdmin } = require("../../services/storeAccess");

const WRITABLE = new Set([
  "price_cents", "currency", "stock_policy", "quantity_in_stock",
  "availability", "is_private"
]);
const pickFields = value => Object.fromEntries(
  Object.entries(value || {}).filter(([key]) => WRITABLE.has(key))
);
const fail = (res, status, message) => res.status(status).json({ success: false, message });
const handleError = (res, error) => {
  if (error?.code === 11000) return fail(res, 409, "This item already has an inventory record for this store");
  if (error?.name === "ValidationError" || error?.name === "CastError") return fail(res, 400, error.message);
  console.error("Store inventory management failed:", error?.message);
  return fail(res, 500, "Inventory operation failed");
};

const list = async (req, res) => {
  try {
    const records = await StoreInventoryV2.find({ store: req.params.storeId })
      .sort({ updatedAt: -1 }).limit(500).lean();
    return res.json({ success: true, data: records });
  } catch (error) { return handleError(res, error); }
};

const create = async (req, res) => {
  const itemId = req.body?.item;
  if (!mongoose.isValidObjectId(itemId)) return fail(res, 400, "Valid item ID required");
  try {
    const item = await Item.exists({ _id: itemId });
    if (!item) return fail(res, 404, "Canonical item not found");
    const record = await StoreInventoryV2.create({
      ...pickFields(req.body),
      item: itemId,
      store: req.params.storeId,
      migration_status: "REVIEW", // only a platform admin can verify
      source_inventory_ids: [],
      availability: "UNAVAILABLE" // never auto-publish
    });
    return res.status(201).json({ success: true, data: record });
  } catch (error) { return handleError(res, error); }
};

const update = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.inventoryId))
    return fail(res, 400, "Invalid inventory ID");
  try {
    const record = await StoreInventoryV2.findOne({
      _id: req.params.inventoryId, store: req.params.storeId
    });
    if (!record) return fail(res, 404, "Store inventory not found");
    const fields = pickFields(req.body);
    if (Object.prototype.hasOwnProperty.call(req.body || {}, "migration_status")) {
      if (!isPlatformAdmin(req.user)) return fail(res, 403, "Only platform administrators may verify inventory");
      if (!["REVIEW", "VERIFIED"].includes(req.body.migration_status))
        return fail(res, 400, "Invalid verification status");
      fields.migration_status = req.body.migration_status;
    }
    Object.assign(record, fields);
    await record.save();
    return res.json({ success: true, data: record });
  } catch (error) { return handleError(res, error); }
};

module.exports = { list, create, update };
