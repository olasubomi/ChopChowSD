"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { isPurchasableInventory } = require("../services/inventoryAvailability");

const base = {
  item: "aaaaaaaaaaaaaaaaaaaaaaaa", store: "bbbbbbbbbbbbbbbbbbbbbbbb",
  price_cents: 299, currency: "USD", stock_policy: "TRACKED", quantity_in_stock: 4,
  availability: "AVAILABLE", migration_status: "VERIFIED", is_private: false
};
const check = overrides => isPurchasableInventory({ ...base, ...overrides });
test("verified tracked inventory with positive stock is eligible", () => {
  assert.equal(check({}).ok, true);
});
test("verified made-to-order inventory does not require a count", () => {
  assert.equal(check({ stock_policy: "MADE_TO_ORDER", quantity_in_stock: null }).ok, true);
});
test("unconfirmed stock policy cannot be purchased", () => {
  assert.ok(check({ stock_policy: "UNCONFIRMED", quantity_in_stock: null }).reasons.includes("STOCK_POLICY_NOT_CONFIRMED"));
});
test("missing price cannot be purchased even if marked available", () => {
  assert.ok(check({ price_cents: null }).reasons.includes("MISSING_OR_INVALID_PRICE"));
});
test("no currency or unverified migration prohibits purchasing", () => {
  assert.equal(check({ currency: "$" }).ok, false);
  assert.ok(check({ migration_status: "REVIEW" }).reasons.includes("NOT_VERIFIED"));
});
test("tracked zero quantity is out of stock", () => {
  assert.ok(check({ quantity_in_stock: 0 }).reasons.includes("OUT_OF_STOCK"));
});
test("disabled and private inventory is not purchasable", () => {
  assert.equal(check({ availability: "UNAVAILABLE" }).ok, false);
  assert.equal(check({ is_private: true }).ok, false);
});
test("non-integer quantity and price are rejected", () => {
  assert.equal(check({ quantity_in_stock: 1.5 }).ok, false);
  assert.equal(check({ price_cents: 2.99 }).ok, false);
});
