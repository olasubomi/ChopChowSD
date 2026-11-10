"use strict";

// Central allowlists prevent role escalation through arbitrary JSON or
// multipart form fields. Never use request bodies as MongoDB update objects.
const STORE_FIELDS = new Set([
  "store_name", "phone_number", "description", "email",
  "supplier_address", "hours", "currency"
]);
const PROFILE_FIELDS = new Set([
  "first_name", "last_name", "username", "phone_number",
  "profile_picture", "newsletter_subscription", "date_of_birth"
]);
function pickFields(input, fields) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  return Object.fromEntries(Object.entries(input).filter(([key]) => fields.has(key)));
}
const pickSafeStoreUpdate = body => pickFields(body, STORE_FIELDS);
const pickSafeProfileUpdate = body => pickFields(body, PROFILE_FIELDS);
module.exports = { pickSafeStoreUpdate, pickSafeProfileUpdate };
