# CCD-481 — Store inventory availability and existing administration flows

Status: **opt-in development model only**. This change does not alter `inventories`, expose new routes, or publish products.

## Confirmed decisions
- Canonical catalog is `Item` (`item_type` differentiates meal/product/utensil/other). Suggested catalog items require **no** inventory record or price.
- Each store-specific offering has a single `item` and `store` ObjectId. `price_cents` and ISO `currency` are authoritative on store inventory, not `items.item_price`.
- `stock_policy`: `UNCONFIRMED` (default), `TRACKED` (numeric `quantity_in_stock`), `MADE_TO_ORDER` (no stock count).
- `availability`: `UNAVAILABLE` (default) or `AVAILABLE`. No store item without a verified price can be made available. Unpriced suggestions remain in `items`.
- `migration_status`: `REVIEW` (default) until validated, then `VERIFIED`. The pure `isPurchasableInventory()` helper checks price, ISO currency, availability, stock policy, count and verified migration status; real purchase must **also** verify store approval, fulfillment region/hours, auth, and concurrency-safe stock reservation.
- No availability or currency guesses for the 97 legacy inventory rows with missing quantities. Real-data audit documented in `docs/ccd-481-live-inventory-audit.md`.

## Implementation
- `model/storeInventoryV2.js`: new, additive `store_inventories_v2` model with unique (item,store) index and strict validation. **Not wired to active routes**.
- `services/inventoryAvailability.js`: pure eligibility rule; its result alone is not a secure checkout quote.
- `test/inventoryAvailability.test.js`: offline policy tests.
- Keep legacy inventory model in `db/dbMongo/config/inverntory.js` unchanged until staged migration and read compatibility are validated.

## Existing store-management implementation already in the codebase
Frontend `CCNext`:
- `pages/dashboard/manage-store/index.jsx` — store selection.
- `pages/dashboard/management.js` — store management dashboard.
- `src/components/management/subadmins.jsx` — sub-administrator controls.
- `pages/dashboard/userprofile.js` — store management entry.
Backend `ChopChowSD`:
- `routes/store.js` exposes creation, listing, editing, deletion and sub-admin add/remove.
- `repository/store.js` uses `Supplier.store_owner`, `store_admins` and `store_sub_admins`; `User` contains legacy `super_store_admin`/`sub_store_admin` fields.

### Security blockers (must fix before production)
1. `POST /stores/add-user/:storeId` and `DELETE /stores/removeuser/:userId/:storeId` currently lack auth middleware. **Do not expose these as privileged production actions**.
2. `PUT /stores/updatestore/:storeId` and `DELETE /stores/deletestore/:storeId` authenticate but lack a clearly enforced **per-store** authorization check in the controller/repository.
3. `repository/store.js` currently creates a new account with a generated password and emails that password. Replace with a secure invitation and password setup flow; never email plaintext passwords.
4. Multiple overlapping role fields (`store_admins`, `store_sub_admins`, `User.sub_store_admin`) need a single permission resolver. A platform admin should manage all stores and access; a store owner manages their own store; delegated admins operate only on explicitly assigned stores and granted capabilities.
5. Secure server-side authorization is essential; frontend dashboard controls alone do not protect routes. Do not infer permissions simply from `user_type` or an untrusted `userId` param.

## Access model for MVP
- PLATFORM_ADMIN: list/review/update stores, assign/revoke owners and store admins (audited).
- STORE_OWNER: manage own store profile/inventory and optionally invite/revoke delegated managers; cannot grant platform admin.
- STORE_ADMIN: manage only their assigned store's authorized inventory/orders; manage other admins only if separately granted.
- CUSTOMER/DRIVER: no implicit store administration.
- User may own or administer multiple stores; permissions are per store.

## Next steps
1. Add read-only store-role review/report and map legacy fields to canonical per-store memberships.
2. Implement authenticated authorization guard before enabling admin writes, and refactor insecure routes to use it.
3. Add safe invitation workflow instead of passwords by email.
4. Stage migrations on isolated DB and validate supplier/owner records; migrate pricing and stock policies only after explicit verification.
5. Wire validated V2 offering into checkout quote service and Stripe test mode, then end-to-end tests.
