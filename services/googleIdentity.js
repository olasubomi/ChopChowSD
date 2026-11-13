"use strict";

const https = require("node:https");
const { createPublicKey } = require("node:crypto");
const jwt = require("jsonwebtoken");

// Fixed Google JWKS endpoint. Never accept a token-supplied key URL (jku/x5u).
const GOOGLE_JWKS = "https://www.googleapis.com/oauth2/v3/certs";
const ISSUERS = ["accounts.google.com", "https://accounts.google.com"];
let cached = null;

function downloadGoogleKeys() {
  return new Promise((resolve, reject) => {
    const request = https.get(GOOGLE_JWKS, { timeout: 5000 }, response => {
      if (response.statusCode !== 200) {
        response.resume();
        return reject(new Error("Google verification keys unavailable"));
      }
      let body = "";
      response.setEncoding("utf8");
      response.on("data", chunk => {
        body += chunk;
        if (body.length > 128 * 1024) {
          request.destroy(new Error("Google verification keys too large"));
        }
      });
      response.on("error", reject);
      response.on("end", () => {
        try {
          const value = JSON.parse(body);
          if (!Array.isArray(value.keys)) throw new Error("Invalid Google JWKS");
          const cacheControl = String(response.headers["cache-control"] || "");
          const maxAge = Number(cacheControl.match(/(?:^|,)\s*max-age=(\d+)/)?.[1] || 300);
          resolve({ keys: value.keys, ttl: Math.max(60, Math.min(maxAge, 3600)) });
        } catch (error) { reject(error); }
      });
    });
    request.on("timeout", () => request.destroy(new Error("Google JWKS request timed out")));
    request.on("error", reject);
  });
}

async function getGoogleKeys() {
  if (cached && cached.expiresAt > Date.now()) return cached.keys;
  const { keys, ttl } = await downloadGoogleKeys();
  cached = { keys, expiresAt: Date.now() + ttl * 1000 };
  return keys;
}

// This is a verifier only. A verified email must NEVER automatically merge
// with an existing password-based account. Link providers only after the user
// authenticates to their existing Chop Chow account.
async function verifyGoogleIdToken(idToken, { audience = process.env.GOOGLE_CLIENT_ID, loadKeys = getGoogleKeys } = {}) {
  if (!audience || typeof audience !== "string") throw new Error("Google sign-in is not configured");
  if (typeof idToken !== "string" || idToken.length > 8192) throw new Error("Invalid Google identity token");
  const header = jwt.decode(idToken, { complete: true })?.header;
  if (!header || header.alg !== "RS256" || typeof header.kid !== "string" || !header.kid) {
    throw new Error("Unsupported Google identity token");
  }
  const keys = await loadKeys();
  if (!Array.isArray(keys)) throw new Error("Google verification keys unavailable");
  const jwk = keys.find(key => key.kid === header.kid && key.kty === "RSA" &&
    key.use === "sig" && key.alg === "RS256");
  if (!jwk) throw new Error("Unknown Google signing key");
  const publicKey = createPublicKey({ key: jwk, format: "jwk" });
  const payload = jwt.verify(idToken, publicKey, {
    algorithms: ["RS256"],
    audience,
    issuer: ISSUERS,
    clockTolerance: 30,
    maxAge: "1h"
  });
  if (!payload || typeof payload !== "object" || !payload.sub ||
    typeof payload.sub !== "string" || payload.sub.length > 255 ||
    payload.email_verified !== true || typeof payload.email !== "string" ||
    !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email)) {
    throw new Error("Google identity lacks a verified email");
  }
  return Object.freeze({
    provider: "google",
    providerUserId: payload.sub,
    email: payload.email.trim().toLowerCase(),
    emailVerified: true,
    givenName: typeof payload.given_name === "string" ? payload.given_name : "",
    familyName: typeof payload.family_name === "string" ? payload.family_name : ""
  });
}

module.exports = { verifyGoogleIdToken };
