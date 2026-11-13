"use strict";

// Domain-only builder. Input MUST be a server-validated price/stock/delivery quote.
// Never accept prices or store ownership from client cart payloads.
const OBJECT_ID = /^[0-9a-fA-F]{24}$/;

function requireId(value, label) {
  const id = String(value || "").trim();
  if (!OBJECT_ID.test(id)) throw new TypeError(label + " must be a Mongo ObjectId");
  return id.toLowerCase();
}

function cents(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(label + " must be non-negative integer minor units");
  }
  return value;
}

function buildSupplierOrders(quotedItems, options = {}) {
  if (!Array.isArray(quotedItems) || quotedItems.length === 0) {
    throw new TypeError("An order requires at least one quoted item");
  }
  const currency = options.currency || "USD";
  if (!/^[A-Z]{3}$/.test(currency)) throw new TypeError("Invalid ISO currency");
  const regions = new Set(["SAN_DIEGO_CA", "CHARLOTTE_NC", "DURHAM_NC"]);
  const region = options.region;
  if (!regions.has(region)) throw new TypeError("Unsupported fulfillment region");

  const grouped = new Map();
  for (const item of quotedItems) {
    if (!item || typeof item !== "object") throw new TypeError("Invalid quoted item");
    const store = requireId(item.storeId, "storeId");
    const product = requireId(item.itemId, "itemId");
    if (!["Meal", "Product", "Utensil"].includes(item.itemType)) {
      throw new TypeError("Invalid itemType");
    }
    if (!Number.isSafeInteger(item.quantity) || item.quantity < 1) {
      throw new TypeError("quantity must be a positive integer");
    }
    const price = cents(item.unitPriceCents, "unitPriceCents");
    const subtotal = price * item.quantity;
    if (!Number.isSafeInteger(subtotal)) throw new TypeError("Line total overflow");
    if (item.currency !== currency) throw new TypeError("Mixed currencies require separate checkouts");
    if (item.region !== region) throw new TypeError("Items must be fulfillable in the selected region");
    if (!["CHOP_CHOW", "THIRD_PARTY"].includes(item.ownerType)) {
      throw new TypeError("Invalid store ownership");
    }
    if (!grouped.has(store)) {
      grouped.set(store, { store, owner_type: item.ownerType, currency,
        fulfillment_region: region, line_items: [], subtotal_cents: 0 });
    }
    const group = grouped.get(store);
    if (group.owner_type !== item.ownerType) {
      throw new TypeError("One store cannot have conflicting ownership types");
    }
    if (group.line_items.some(line => line.item === product && line.item_type === item.itemType)) {
      throw new TypeError("Duplicate product lines must be consolidated by the quote service");
    }
    group.line_items.push({ item: product, item_type: item.itemType,
      quantity: item.quantity, unit_price_cents: price, subtotal_cents: subtotal });
    group.subtotal_cents += subtotal;
    if (!Number.isSafeInteger(group.subtotal_cents)) throw new TypeError("Store subtotal overflow");
  }
  return Array.from(grouped.values()).sort((a, b) => a.store.localeCompare(b.store));
}

module.exports = { buildSupplierOrders };
