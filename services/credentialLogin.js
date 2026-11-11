"use strict";

// Email/password authentication MUST NOT be optional based on request data.
// Social identity verification has a separate, server-verified entry point.
function requirePasswordCredentials(payload) {
  const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
  const password = payload?.password;
  if (!email || typeof password !== "string" || password.length === 0) {
    const error = new Error("Invalid email or password");
    error.code = 401;
    throw error;
  }
  return { email, password };
}
module.exports = { requirePasswordCredentials };
