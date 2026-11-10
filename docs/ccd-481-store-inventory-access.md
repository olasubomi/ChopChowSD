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


## Implemented in the CCD-481 draft branch (2026-11-10)

- `services/storeAccess.js` resolves server-authoritative store permissions from the authenticated user and the requested Supplier document. Atlas read-only audit confirms three users currently have `user_type: "admin"`. The legacy `sub_app_admin` boolean does not grant platform access.
- `utils/storeAccessMiddleware.js` resolves the Supplier per request and enforces the action permission; guards return 401/403/404 without mutating data.
- `routes/store.js`: authenticated owner/platform access for add/remove sub-admin and profile update; only platform admin can hard-delete stores; legacy claimstore mutation temporarily platform-admin-only pending proper claim approval workflow. Store-list-by-user is restricted to the authenticated user or platform admin.
- `routes/user.js` and user profile controller: own-user/platform access; sensitive user role, verification, credential and account fields cannot be mass-assigned.
- `controllers/StoreController/store.controller.js`: store creation uses authenticated actor as owner unless an authenticated platform admin explicitly chooses a different owner; store profile updates allowlist ordinary profile fields only.
- `repository/store.js`: new-store creation preserves existing user roles; adding a store sub-admin is restricted to **existing registered accounts** and uses atomic `$addToSet`; removal uses `$pull`. Generated plaintext password invitations have been removed from this path. Secure invitation of unregistered accounts is **not implemented**; registration is required first.
- `controllers/StoreController/inventoryV2.controller.js` adds store-scoped management routes:
  - `GET /api/stores/:storeId/inventory-v2`
  - `POST /api/stores/:storeId/inventory-v2`
  - `PATCH /api/stores/:storeId/inventory-v2/:inventoryId`
  These routes require authenticated platform admin, store owner or assigned store admin; they use only `store_inventories_v2` and do not touch legacy inventory.
- New offerings start **UNAVAILABLE** and **REVIEW**. Platform admin alone may mark a record `VERIFIED`; marking it AVAILABLE requires a verified canonical item, price, ISO currency and confirmed stock policy. An unpriced item may remain a catalog-only suggestion.
- `services/safeManagementUpdates.js` and pure policy tests prevent profile and store update mass assignment. Pure-policy smoke checks were run; GitHub Actions and DB-backed endpoint integration tests must still be verified.

### Outstanding before merge / deployment
- Verify CI and run authenticated HTTP integration tests with a seeded test DB (owner/admin/delegated/unrelated/unauthenticated).
- Review existing sign-in/role-granting endpoints and other sensitive routes beyond the touched store/user-profile paths.
- Test V2 Mongoose validation, unique indexes, concurrency, migration approval and inventory pricing with real test data.
- Implement expiring invitation flow for new store administrators; current endpoint deliberately rejects nonexistent accounts.
- Review the legacy store-claim flow and implement proper pending-claim review, rather than direct record mutation.
- Verify UI compatibility with the new authenticated endpoints and add inventory availability controls to the existing management screen.
- Draft PR only: no production deployment, no live Atlas writes, and no checkout or Stripe payment activation.
