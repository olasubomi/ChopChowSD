"use strict";

const { User } = require("../../db/dbMongo/config/db_buildSchema");
const { AuthIdentity } = require("../../model/authIdentity");
const { verifyGoogleIdToken } = require("../../services/googleIdentity");

const fail = (res, status, message) => res.status(status).json({ success: false, message });

async function googleSignIn(req, res) {
  try {
    const google = await verifyGoogleIdToken(req.body?.credential);
    const linked = await AuthIdentity.findOne({
      provider: "google", provider_user_id: google.providerUserId
    });
    // Never auto-link or merge accounts by matching an email.
    if (!linked) return fail(res, 409, "Google is not linked to a Chop Chow account. Sign in with your password first and link Google in your account settings.");
    const user = await User.findById(linked.user);
    if (!user) return fail(res, 401, "Linked account is unavailable");
    const payload = { id: user._id, username: user.username, email: user.email };
    const token = await user.generateAccessTokens(payload);
    const refreshToken = await user.generateRefreshTokens(payload);
    return res.status(200).json({
      success: true,
      data: {
        success: true, message: "Authentication successful!",
        token, refreshToken, user, isVerified: user.isVerified
      }
    });
  } catch (error) {
    if (error?.name === "MongoError") {
      console.error("Google sign-in database error");
      return fail(res, 503, "Sign-in temporarily unavailable");
    }
    if (/^Google sign-in is not configured$/.test(error.message)) return fail(res, 503, "Google sign-in is not configured");
    if (/Google verification keys unavailable|Google JWKS request timed out/.test(error.message)) return fail(res, 503, "Google verification temporarily unavailable");
    return fail(res, 401, "Invalid Google sign-in");
  }
}

async function linkGoogle(req, res) {
  if (!req.user?._id) return fail(res, 401, "Sign in before linking Google");
  try {
    const google = await verifyGoogleIdToken(req.body?.credential);
    // Simple, safe MVP: only link a verified Google identity with the same
    // email as the account authenticated by password.
    if (google.email !== String(req.user.email || "").trim().toLowerCase()) {
      return fail(res, 409, "Google email must match your Chop Chow account email");
    }
    const existing = await AuthIdentity.findOne({
      provider: "google", provider_user_id: google.providerUserId
    });
    if (existing) {
      if (String(existing.user) === String(req.user._id))
        return res.status(200).json({ success: true, message: "Google is already linked" });
      return fail(res, 409, "This Google identity is linked to another account");
    }
    const alreadyLinked = await AuthIdentity.exists({
      provider: "google", user: req.user._id
    });
    if (alreadyLinked) return fail(res, 409, "This account already has a Google identity");
    await AuthIdentity.create({
      provider: "google", provider_user_id: google.providerUserId,
      user: req.user._id, email_at_link: google.email
    });
    return res.status(201).json({ success: true, message: "Google sign-in linked" });
  } catch (error) {
    if (error?.code === 11000) return fail(res, 409, "Google identity already linked");
    if (/^Google sign-in is not configured$/.test(error.message)) return fail(res, 503, "Google sign-in is not configured");
    if (/Google verification keys unavailable|Google JWKS request timed out/.test(error.message)) return fail(res, 503, "Google verification temporarily unavailable");
    return fail(res, 401, "Could not verify Google identity");
  }
}

module.exports = { googleSignIn, linkGoogle };
