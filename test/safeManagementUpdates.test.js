"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { pickSafeStoreUpdate, pickSafeProfileUpdate } = require("../services/safeManagementUpdates");

test("store profile update cannot change ownership, admins, status or inventory", () => {
  const actual = pickSafeStoreUpdate({
    store_name: "Sample Store", hours: { monday: "9-5" },
    store_owner: "attacker", store_admins: ["attacker"],
    store_sub_admins: ["attacker"], status: "PUBLIC",
    inventory: ["attacker"], $set: { store_owner: "attacker" }
  });
  assert.deepEqual(actual, { store_name: "Sample Store", hours: { monday: "9-5" } });
});
test("user profile update cannot grant admin or override verification or credentials", () => {
  const actual = pickSafeProfileUpdate({
    first_name: "Sample", user_type: ["admin"], sub_app_admin: true,
    sub_store_admin: true, email_verified: true, password: "attacker",
    email: "other@example.com", first_name_extra: "no"
  });
  assert.deepEqual(actual, { first_name: "Sample" });
});
test("invalid update payloads fail closed", () => {
  assert.deepEqual(pickSafeStoreUpdate(null), {});
  assert.deepEqual(pickSafeProfileUpdate(["user_type"]), {});
});
