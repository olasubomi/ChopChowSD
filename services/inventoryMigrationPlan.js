"use strict";

// Pure, NON-DESTRUCTIVE inventory migration planning. No database connections or writes.
// Supply inventories, items, suppliers and optional legacy collections from a read-only snapshot.
const OID = /^[a-f0-9]{24}$/i;
const toId = value => {
  if (value && typeof value === "object") value = value.$oid || value.toHexString?.() || value.toString?.();
  const id = String(value ?? "").toLowerCase();
  return OID.test(id) ? id : null;
};
const moneyCents = value => {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const s = String(value).trim();
  if (!/^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(s)) return null;
  const [whole, fraction = ""] = s.split(".");
  const result = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return Number.isSafeInteger(result) ? result : null;
};
const codeFor = currency => {
  if (typeof currency !== "string") return null;
  const code = currency.trim().toUpperCase();
  return /^[A-Z]{3}$/.test(code) ? code : null;
};
const unique = values => [...new Set(values)];

function planInventoryMigration({ inventories, items, suppliers, meals = [], products = [] }) {
  for (const [name, list] of Object.entries({ inventories, items, suppliers, meals, products })) {
    if (!Array.isArray(list)) throw new TypeError(name + " must be an array");
  }
  const itemIds = new Set(items.map(i => toId(i._id)).filter(Boolean));
  const legacyMealIds = new Set(meals.map(i => toId(i._id)).filter(Boolean));
  const legacyProductIds = new Set(products.map(i => toId(i._id)).filter(Boolean));
  const supplierMap = new Map(suppliers.map(s => [toId(s._id), s]).filter(([id]) => id));
  const entries = [];
  const pairMap = new Map();
  const summary = {
    inputInventories: inventories.length, itemStoreAssociations: 0, uniquePairs: 0,
    readyForReview: 0, blocked: 0, missingItemRefs: 0, missingStoreRefs: 0,
    legacyProductRefs: 0, legacyMealRefs: 0, unresolvedItemRefs: 0,
    duplicatePairs: 0, invalidPrice: 0, ambiguousPrice: 0, missingCurrency: 0,
    untrackedQuantity: 0, convertibleQuantity: 0
  };
  for (const inventory of inventories) {
    const inventoryId = toId(inventory._id);
    const itemId = toId(inventory.item);
    const itemStatus = itemIds.has(itemId) ? "ITEM" :
      legacyMealIds.has(itemId) ? "LEGACY_MEAL" :
      legacyProductIds.has(itemId) ? "LEGACY_PRODUCT" : "UNRESOLVED";
    const storeRaw = Array.isArray(inventory.storeId) ? inventory.storeId : [inventory.storeId];
    const stores = unique(storeRaw.map(toId));
    if (itemStatus !== "ITEM") summary.missingItemRefs++;
    if (itemStatus === "LEGACY_PRODUCT") summary.legacyProductRefs++;
    if (itemStatus === "LEGACY_MEAL") summary.legacyMealRefs++;
    if (itemStatus === "UNRESOLVED") summary.unresolvedItemRefs++;
    for (const storeId of stores) {
      summary.itemStoreAssociations++;
      const reasons = [];
      if (!inventoryId) reasons.push("INVALID_INVENTORY_ID");
      if (itemStatus !== "ITEM") reasons.push("ITEM_" + itemStatus);
      const supplier = supplierMap.get(storeId);
      if (!supplier) { reasons.push("MISSING_STORE"); summary.missingStoreRefs++; }
      const key = itemId && storeId ? itemId + ":" + storeId : null;
      if (key) {
        if (pairMap.has(key)) { reasons.push("DUPLICATE_ITEM_STORE"); summary.duplicatePairs++; }
        else pairMap.set(key, inventoryId);
      }
      let price = null;
      let currency = null;
      if (Array.isArray(inventory.meal_price)) {
        const candidates = inventory.meal_price.filter(p => toId(p?.store_id) === storeId);
        if (candidates.length === 1) {
          price = moneyCents(candidates[0].price);
          currency = codeFor(candidates[0].currency) ||
            codeFor(supplier?.currency?.name);
          // Currency symbols such as "$" and "₦" are not ISO codes.
          if (!currency) reasons.push("CURRENCY_NEEDS_VERIFICATION");
        } else reasons.push(candidates.length ? "AMBIGUOUS_STORE_PRICE" : "MISSING_STORE_PRICE");
      } else if (storeRaw.length === 1) {
        price = moneyCents(inventory.meal_price);
        currency = codeFor(supplier?.currency?.name);
        if (!currency) reasons.push("CURRENCY_NEEDS_VERIFICATION");
      } else {
        reasons.push("SHARED_LEGACY_PRICE_NEEDS_REVIEW");
      }
      if (price === null) { reasons.push("INVALID_OR_MISSING_PRICE"); summary.invalidPrice++; }
      if (reasons.some(r => /AMBIGUOUS|SHARED_LEGACY_PRICE/.test(r))) summary.ambiguousPrice++;
      if (!currency) summary.missingCurrency++;
      let quantity = null;
      if (inventory.quantityInStock != null) {
        const n = Number(inventory.quantityInStock);
        if (Number.isSafeInteger(n) && n >= 0 && String(inventory.quantityInStock).trim() !== "") {
          quantity = n;
          if (typeof inventory.quantityInStock === "string") summary.convertibleQuantity++;
        } else reasons.push("INVALID_QUANTITY");
      } else { reasons.push("STOCK_POLICY_REQUIRED"); summary.untrackedQuantity++; }
      // An absent quantity is never silently zero or unlimited.
      if (inventory.in_stock !== true) reasons.push("NOT_MARKED_IN_STOCK");
      const uniqueReasons = unique(reasons);
      const entry = {
        sourceInventoryId: inventoryId, itemId, storeId, itemStatus,
        priceCents: price, currency, quantity, inStock: inventory.in_stock === true,
        status: uniqueReasons.length ? "REVIEW" : "READY_FOR_REVIEW",
        reasons: uniqueReasons
      };
      entries.push(entry);
      if (entry.status === "READY_FOR_REVIEW") summary.readyForReview++; else summary.blocked++;
    }
    if (stores.length === 0) {
      entries.push({ sourceInventoryId: inventoryId, itemId, storeId: null, itemStatus,
        status: "REVIEW", reasons: ["MISSING_STORE"] });
      summary.blocked++;
    }
  }
  summary.uniquePairs = pairMap.size;
  return { summary, entries };
}
module.exports = { planInventoryMigration, moneyCents, toId };
