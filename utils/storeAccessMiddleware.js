"use strict";

const mongoose = require("mongoose");
const { Supplier } = require("../db/dbMongo/config/db_buildSchema");
const { canManageStore, isPlatformAdmin, asId } = require("../services/storeAccess");

// Must be mounted AFTER protect (which resolves req.user from a verified token)
// and BEFORE multipart file processing or any mutation.
const requireStoreAccess = action => async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }
  const storeId = req.params.storeId;
  if (!mongoose.isValidObjectId(storeId)) {
    return res.status(400).json({ success: false, message: "Invalid store ID" });
  }
  try {
    const store = await Supplier.findById(storeId).select(
      "_id store_owner store_admins store_sub_admins"
    );
    if (!store) return res.status(404).json({ success: false, message: "Store not found" });
    if (!canManageStore(req.user, store, action)) {
      return res.status(403).json({ success: false, message: "Insufficient store permissions" });
    }
    req.authorizedStore = store;
    next();
  } catch (error) {
    next(error);
  }
};

const requireOwnUserOrPlatformAdmin = (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }
  if (isPlatformAdmin(req.user) || asId(req.user._id) === String(req.params.userId)) return next();
  return res.status(403).json({ success: false, message: "Insufficient permissions" });
};

const requirePlatformAdmin = (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }
  if (!isPlatformAdmin(req.user)) {
    return res.status(403).json({ success: false, message: "Platform administrator required" });
  }
  next();
};

module.exports = { requireStoreAccess, requireOwnUserOrPlatformAdmin, requirePlatformAdmin };
