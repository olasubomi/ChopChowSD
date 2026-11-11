"use strict";
const mongoose = require("mongoose");

// Separate identities keep one Chop Chow user across multiple login methods.
// Google sub is immutable and unique to the Google account, unlike email.
const authIdentitySchema = new mongoose.Schema({
  provider: { type: String, enum: ["google"], required: true },
  provider_user_id: { type: String, required: true, maxlength: 255 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email_at_link: { type: String, required: true, lowercase: true, trim: true }
}, { timestamps: true, collection: "auth_identities" });

authIdentitySchema.index({ provider: 1, provider_user_id: 1 }, { unique: true });
authIdentitySchema.index({ provider: 1, user: 1 }, { unique: true });

module.exports = {
  AuthIdentity: mongoose.models.AuthIdentity || mongoose.model("AuthIdentity", authIdentitySchema)
};
