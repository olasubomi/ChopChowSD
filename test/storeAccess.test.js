"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { canManageStore, isPlatformAdmin } = require("../services/storeAccess");
const ids = {
  platform: "111111111111111111111111",
  owner: "222222222222222222222222",
  manager: "333333333333333333333333",
  customer: "444444444444444444444444"
};
const actor = (id, user_type = ["customer"]) => ({ _id: id, user_type });
const store = {
  store_owner: ids.owner,
  store_admins: [ids.manager],
  store_sub_admins: [ids.manager]
};
test("platform administrator can manage all store actions", () => {
  for (const action of ["manage_admins", "update_store", "delete_store", "manage_inventory", "manage_orders"]) {
    assert.equal(canManageStore(actor(ids.platform, ["admin"]), store, action), true);
  }
});
test("store owner can manage own store and administrators but cannot delete", () => {
  for (const action of ["manage_admins", "update_store", "manage_inventory", "manage_orders"]) {
    assert.equal(canManageStore(actor(ids.owner), store, action), true);
  }
  assert.equal(canManageStore(actor(ids.owner), store, "delete_store"), false);
});
test("delegated admin can manage inventory and orders but not other admins or profile", () => {
  for (const action of ["manage_inventory", "manage_orders"]) {
    assert.equal(canManageStore(actor(ids.manager), store, action), true);
  }
  for (const action of ["manage_admins", "update_store", "delete_store"]) {
    assert.equal(canManageStore(actor(ids.manager), store, action), false);
  }
});
test("unrelated customer and missing actor cannot manage a store", () => {
  for (const action of ["manage_admins", "update_store", "delete_store", "manage_inventory"]) {
    assert.equal(canManageStore(actor(ids.customer), store, action), false);
    assert.equal(canManageStore(null, store, action), false);
  }
});
test("legacy sub_app_admin boolean alone does not grant platform access", () => {
  const legacy = { ...actor(ids.customer), sub_app_admin: true };
  assert.equal(isPlatformAdmin(legacy), false);
  assert.equal(canManageStore(legacy, store, "manage_admins"), false);
});
test("unrecognized action fails closed", () => {
  assert.equal(canManageStore(actor(ids.owner), store, "grant_platform_admin"), false);
});
test("populated owner/admin references match ObjectId values", () => {
  const populated = { store_owner: { _id: ids.owner }, store_admins: [{ _id: ids.manager }] };
  assert.equal(canManageStore(actor(ids.owner), populated, "manage_admins"), true);
  assert.equal(canManageStore(actor(ids.manager), populated, "manage_inventory"), true);
});
