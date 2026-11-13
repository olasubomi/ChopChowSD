"use strict";

// Pure gating for checkout availability; do not trust client-controlled fields.
// Operational checks (approved store, delivery region/hours, authentication and
// reservation-safe stock decrement) must ALSO pass before accepting payment.
function isPurchasableInventory(value) {
  const reasons = [];
  if (!value || typeof value !== "object") return { ok: false, reasons: ["INVALID_INVENTORY"] };
  if (value.availability !== "AVAILABLE") reasons.push("NOT_AVAILABLE");
  if (!value.item || !value.store) reasons.push("MISSING_ITEM_OR_STORE");
  if (!Number.isSafeInteger(value.price_cents) || value.price_cents < 0)
    reasons.push("MISSING_OR_INVALID_PRICE");
  if (typeof value.currency !== "string" || !/^[A-Z]{3}$/.test(value.currency))
    reasons.push("MISSING_OR_INVALID_CURRENCY");
  if (value.stock_policy === "TRACKED") {
    if (!Number.isSafeInteger(value.quantity_in_stock) || value.quantity_in_stock < 1)
      reasons.push("OUT_OF_STOCK");
  } else if (value.stock_policy !== "MADE_TO_ORDER") {
    reasons.push("STOCK_POLICY_NOT_CONFIRMED");
  }
  if (value.is_private === true) reasons.push("PRIVATE_INVENTORY");
  if (value.migration_status !== "VERIFIED") reasons.push("NOT_VERIFIED");
  return { ok: reasons.length === 0, reasons };
}
module.exports = { isPurchasableInventory };
