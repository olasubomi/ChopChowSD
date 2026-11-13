"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { planInventoryMigration, moneyCents } = require("../services/inventoryMigrationPlan");
const ID = {
  item: "aaaaaaaaaaaaaaaaaaaaaaaa", store1: "111111111111111111111111",
  store2: "222222222222222222222222", inventory: "bbbbbbbbbbbbbbbbbbbbbbbb",
  legacy: "cccccccccccccccccccccccc", unknown: "dddddddddddddddddddddddd"
};
const suppliers = [
  { _id: ID.store1, currency: { name: "USD" } },
  { _id: ID.store2, currency: { name: "USD" } }
];
const inventory = (overrides = {}) => ({
  _id: ID.inventory, item: ID.item, storeId: ID.store1,
  meal_price: "2.99", quantityInStock: "4", in_stock: true, ...overrides
});
const plan = (inventories, extras = {}) =>
  planInventoryMigration({ inventories, items: [{ _id: ID.item }], suppliers, ...extras });

test("turns one legacy inventory into a per-store candidate with exact integer minor units", () => {
  const { summary, entries } = plan([inventory()]);
  assert.equal(summary.itemStoreAssociations, 1);
  assert.equal(entries[0].priceCents, 299);
  assert.equal(entries[0].quantity, 4);
  assert.equal(entries[0].currency, "USD");
  assert.equal(entries[0].status, "READY_FOR_REVIEW");
  assert.equal(summary.convertibleQuantity, 1);
});
test("splits shared inventory only when each store has an explicit matching price", () => {
  const { entries, summary } = plan([inventory({
    storeId: [ID.store1, ID.store2],
    meal_price: [
      { store_id: ID.store1, currency: "USD", price: 2.99 },
      { store_id: ID.store2, currency: "USD", price: 4.50 }
    ]
  })]);
  assert.equal(summary.itemStoreAssociations, 2);
  assert.deepEqual(entries.map(e => e.priceCents), [299, 450]);
  assert.equal(summary.readyForReview, 2);
});
test("does not copy a single shared string price to multiple stores", () => {
  const { entries } = plan([inventory({ storeId: [ID.store1, ID.store2] })]);
  for (const e of entries) {
    assert.equal(e.priceCents, null);
    assert.ok(e.reasons.includes("SHARED_LEGACY_PRICE_NEEDS_REVIEW"));
  }
});
test("preserves catalog-only items by producing zero inventory rows", () => {
  const { entries } = plan([]);
  assert.equal(entries.length, 0);
});
test("flags a missing item and separately recognizes a legacy product", () => {
  const { entries } = plan([
    inventory({ item: ID.legacy }),
    inventory({ _id: ID.unknown, item: ID.unknown })
  ], { products: [{ _id: ID.legacy }] });
  assert.equal(entries[0].itemStatus, "LEGACY_PRODUCT");
  assert.equal(entries[1].itemStatus, "UNRESOLVED");
  assert.equal(entries[0].status, "REVIEW");
});
test("does not treat missing quantities as zero or unlimited", () => {
  const { entries } = plan([inventory({ quantityInStock: undefined })]);
  assert.equal(entries[0].quantity, null);
  assert.ok(entries[0].reasons.includes("STOCK_POLICY_REQUIRED"));
});
test("flags duplicate item-store pairs without overwriting a record", () => {
  const { summary, entries } = plan([
    inventory(),
    inventory({ _id: ID.unknown })
  ]);
  assert.equal(summary.duplicatePairs, 1);
  assert.ok(entries[1].reasons.includes("DUPLICATE_ITEM_STORE"));
});
test("requires known store, currency and valid prices", () => {
  const { entries } = plan([inventory({
    storeId: ID.unknown, meal_price: "free",
    quantityInStock: "-1"
  })]);
  assert.ok(entries[0].reasons.includes("MISSING_STORE"));
  assert.ok(entries[0].reasons.includes("INVALID_OR_MISSING_PRICE"));
  assert.ok(entries[0].reasons.includes("INVALID_QUANTITY"));
});
test("rejects unsafe monetary values rather than floating-point rounding", () => {
  assert.equal(moneyCents("2.99"), 299);
  assert.equal(moneyCents(1.25), 125);
  assert.equal(moneyCents("2.999"), null);
  assert.equal(moneyCents("-2"), null);
  assert.equal(moneyCents("NaN"), null);
  assert.equal(moneyCents(Number.MAX_SAFE_INTEGER), null);
});
test("read-only planner does not change source inventories", () => {
  const source = inventory({ storeId: [ID.store1], meal_price: "2.99" });
  const before = JSON.stringify(source);
  plan([source]);
  assert.equal(JSON.stringify(source), before);
});