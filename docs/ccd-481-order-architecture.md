# CCD-481 — Multi-supplier order architecture (foundation)

Status: development branch; NOT production checkout activation.

## Business behavior
- One CheckoutGroup groups one customer's purchase and payment.
- Each Order corresponds to exactly one fulfillment store, including the Chop Chow-owned store, so two different suppliers can prepare and track orders independently.
- DeliveryBatch is a *different* concept. It may later group orders from different purchases and customers under one driver.
- Launch regions are SAN_DIEGO_CA, CHARLOTTE_NC and DURHAM_NC. Regions must map to configured service zones before checkout accepts a delivery.
- Each checkout uses one ISO currency, USD initially. Existing currency display/conversion code is not payment authorization.

## Domain builder
The pure function services/checkoutGrouping.js accepts **trusted, backend-quoted** items:
{ storeId, itemId, itemType, quantity, unitPriceCents, currency, region, ownerType }

It returns a deterministic list of one group per store with immutable line-price snapshots and integer cents subtotals. It rejects malformed IDs, mixed currencies, mixed regions, inconsistent ownership, duplicates and arithmetic overflow.

Never pass raw frontend cart lines to this function without independent server-side product, price, stock, location and authorization validation.

## Data models
- model/checkoutGroup.js: checkout identity, payment metadata, minor-unit totals, linked Order IDs.
- model/order.js: legacy fields remain; new checkout_group, store, owner_type, fulfillment_region, currency, line_items, subtotal_cents and total_cents are additive.
- model/orderGroup.js: repairs legacy model registration while explicitly keeping the existing order_groups collection.

## Not yet enabled
- Verified Stripe Checkout and webhooks (CCD-482).
- Quote service to check vendor ownership, inventory quantity, shipping zones, tax and delivery fees (CCD-482).
- Atomic MongoDB session persistence + idempotent replay between group, child orders and payment events (CCD-481 follow-up).
- Customer order write routes, supplier notifications, migration of historical orders (CCD-481/CCD-458).
- Dispatch batching and delivery stops (CCD-483).

Do not connect the existing unauthenticated /order/createOrder directly to the new builder or release its orders as paid.

## Tests
Run: node --test test/checkoutGrouping.test.js

No database credentials are required for these domain-only tests. Database integration tests must be added before activating persistence.

## Design
https://www.figma.com/design/bWGU6KlCczYxIhhY66ycN7?node-id=13-2
