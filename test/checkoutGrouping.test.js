const test = require("node:test");
const assert = require("node:assert/strict");
const { buildSupplierOrders } = require("../services/checkoutGrouping");

const A = "111111111111111111111111";
const B = "222222222222222222222222";
const C = "333333333333333333333333";
const p1 = "aaaaaaaaaaaaaaaaaaaaaaaa";
const p2 = "bbbbbbbbbbbbbbbbbbbbbbbb";
const p3 = "cccccccccccccccccccccccc";
const p4 = "dddddddddddddddddddddddd";

const quoted = (storeId, itemId, overrides = {}) => ({
  storeId, itemId, itemType: "Product", quantity: 1, unitPriceCents: 200,
  currency: "USD", region: "SAN_DIEGO_CA", ownerType: "THIRD_PARTY", ...overrides
});
const opts = { currency: "USD", region: "SAN_DIEGO_CA" };

test("one checkout containing company and two suppliers produces three isolated supplier orders", () => {
  const groups = buildSupplierOrders([
    quoted(A, p1, { ownerType: "CHOP_CHOW" }),
    quoted(B, p2),
    quoted(C, p3),
    quoted(B, p4, { quantity: 2, unitPriceCents: 125 })
  ], opts);
  assert.equal(groups.length, 3);
  assert.deepEqual(groups.map(g => g.store), [A, B, C]);
  assert.equal(groups.find(g => g.store === B).subtotal_cents, 450);
  assert.equal(groups.find(g => g.store === B).line_items.length, 2);
  assert.equal(groups.find(g => g.store === A).owner_type, "CHOP_CHOW");
  assert.equal(groups.reduce((sum, g) => sum + g.subtotal_cents, 0), 850);
});

test("same store, separate items: one supplier order", () => {
  const groups = buildSupplierOrders([quoted(A, p1), quoted(A, p2)], opts);
  assert.equal(groups.length, 1);
  assert.equal(groups[0].line_items.length, 2);
});

test("rejects mixed USD/NGN in one checkout", () => {
  assert.throws(() => buildSupplierOrders([quoted(A, p1, { currency: "NGN" })], opts), /Mixed currencies/);
});

test("rejects mixed regions rather than promising cross-city delivery", () => {
  assert.throws(() => buildSupplierOrders([quoted(A, p1, { region: "CHARLOTTE_NC" })], opts), /region/);
});

test("rejects invalid quantities, negative prices, untrusted IDs and overflow", () => {
  assert.throws(() => buildSupplierOrders([quoted(A, p1, { quantity: 0 })], opts), /quantity/);
  assert.throws(() => buildSupplierOrders([quoted(A, p1, { unitPriceCents: -1 })], opts), /unitPrice/);
  assert.throws(() => buildSupplierOrders([quoted("bad", p1)], opts), /storeId/);
  assert.throws(() => buildSupplierOrders([quoted(A, p1, { unitPriceCents: Number.MAX_SAFE_INTEGER, quantity: 2 })], opts), /overflow/);
});

test("rejects ambiguous store ownership and duplicate item rows", () => {
  assert.throws(() => buildSupplierOrders([
    quoted(A, p1), quoted(A, p2, { ownerType: "CHOP_CHOW" })
  ], opts), /ownership/);
  assert.throws(() => buildSupplierOrders([
    quoted(A, p1), quoted(A, p1)
  ], opts), /Duplicate product/);
});

test("supports both North Carolina service regions independently", () => {
  for (const region of ["CHARLOTTE_NC", "DURHAM_NC"]) {
    const result = buildSupplierOrders([quoted(A, p1, { region })], { currency: "USD", region });
    assert.equal(result[0].fulfillment_region, region);
  }
});
