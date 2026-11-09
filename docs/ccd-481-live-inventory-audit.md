# CCD-481 — Product_Supply live-data inventory dry-run baseline

**Date:** 2026-11-09. **Scope:** read-only MongoDB Atlas MCP queries against the Chop Chow `Cluster0`, `Product_Supply` database. These statistics are a point-in-time baseline, NOT a completed migration and NOT an indication that all stock or prices are safe to sell.

## Observed collection counts
- `items`: 428; `meals`: 62; `products`: 132 (legacy collections, not authoritative for new catalog).
- `suppliers`: 29; `inventories`: 101; `orders`: 4, confirmed by project owner to be development tests.
- The 101 inventory documents reference 135 item–store associations but only 119 distinct item–store pairs.
- Two item–store pairs are duplicated: one appears twice and another appears 16 times. Preserve both sources for review, not last-write-wins.
- `inventories.storeId`: 45 ObjectId, 56 arrays. Array lengths: 40×1, 3×2, 11×3, 1×4, 1×7.
- Of the 101 inventory documents, 67 item references resolve to `items`; 34 do not. The 34 unresolved associations involve 17 unique IDs. Exactly one ID is found in `products`; none in `meals`; the other 16 unique IDs are missing from all three catalog collections. The legacy `products` match has `product_name: "undefined"` and must NOT be automatically published.
- 98 of the 135 item–store associations resolve to a current `suppliers` document; 37 do not.
- `meal_price`: 71 strings, 21 arrays, 9 missing; 32 array price elements use "$" and 3 use "₦" as currency symbols (NOT ISO codes).
- `suppliers.currency.name`: 26 USD, 2 `Nigeria`, 1 absent. The `Nigeria` value must be reviewed rather than automatically inferred as NGN.
- `quantityInStock`: 97 missing, 4 numeric strings (4,2,2,2), 0 numbers.
- All 101 inventory records have `in_stock` Boolean; in-stock is NOT a substitute for tracked stock / made-to-order policy.
- `items`: 366 catalog items have no matching inventory document, 62 have at least one matching inventory. Suggested/catalog-only items require no price.
- Existing four orders remain in the legacy development-test category; no live payments or order migrations implied.

## Approved target boundaries
- Canonical `Item` catalog: optional meal-specific details, `item_type` differentiates meal/product/utensil/other; suggestion does not require inventory or price.
- `Supplier` represents store, with `store_owner` / `store_admins` relationships to `User`. A user can own/manage multiple stores. Current inventory's `user` field is NOT the source of truth for ownership.
- Proposed store-specific `Inventory`: exactly one canonical item and one supplier per row; money expressed as integer minor units + ISO currency; numeric tracked quantity or explicit untracked/made-to-order availability policy.
- Checkout MUST quote actual store inventory and verify availability/price on the server. Do not use `items.item_price` as an authoritative checkout price.
- Keep the four historical development-test orders out of the new paid-order flow. Preserve records.

## Migration safety and blockers
- **DO NOT auto-fix broken references.** Inventory records without a canonical item or a valid supplier remain in review; no fictitious catalog entries.
- **DO NOT blindly assign shared prices** where a legacy row with multiple stores has only one string price. Require explicit per-store price verification.
- **DO NOT guess currency from `$`, `₦`, or `Nigeria`.** Require an ISO currency per store/price before marking the candidate ready.
- **DO NOT treat missing stock quantity as zero or unlimited.** Require a real stock count or confirmed made-to-order policy.
- **DO NOT merge duplicate (item,store) inventory without reconciliation.** Preserve provenance and check differing prices/stock.
- No writes to live Atlas, no implicit creation of new catalog records, no remapping by item name alone, and no auto-deletion of legacy collections.
- Use a separate development/test database, explicit approvals, backup and rollback plan before actual writes or schema cutover.

## Repeatable code and tests
- `services/inventoryMigrationPlan.js` is a pure migration planner: accepts read-only records, produces per-store candidates and review reasons, does **not** mutate inputs.
- `test/inventoryMigrationPlan.test.js` covers store-price selection, legacy shared-price ambiguity, missing items, missing stock, duplicates, strict currency and exact-cent calculations.
- `scripts/auditInventoryReadOnly.js` is an optional self-hosted runner using `MONGO_URI_AUDIT_RO` with an Atlas **read-only** database user; it queries only necessary inventory/catalog/supplier fields, then prints aggregate counts only. Run `node scripts/auditInventoryReadOnly.js` with the variable set securely. **Do not commit credentials, raw production snapshots or stdout dumps containing customer data.**
- The live-data baseline above was measured through the connected Atlas read-only integration; the self-hosted runner has **not** been run with credentials in this environment.
- GitHub Actions runs the pure offline tests. A successful run does **not** certify the actual Atlas snapshot as migrated or checkout safe to activate.

## Next implementation gate
1. Resolve item-store reference gaps and duplicate pairs; confirm current sellable stores/regions, stock policy, and authoritative ISO currency/price.
2. Provision isolated dev/test database and verified read-only snapshot, reconcile dry-run counts.
3. Write a separately reviewed, idempotent actual migration (not included here), integration tests, server-validated quote and transactional checkout persistence.
4. Stripe sandbox Checkout + webhook verification (CCD-482), then manual supplier acceptance and delivery before production activation.
