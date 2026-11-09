"use strict";

// READ-ONLY audit against a protected Atlas connection. No inserts, updates,
// deletes, migrations, or exports of user/customer documents.
// Usage: MONGO_URI_AUDIT_RO='mongodb+srv://...' node scripts/auditInventoryReadOnly.js
// Use an Atlas database user with read role scoped to Product_Supply.
const mongoose = require("mongoose");
const { planInventoryMigration } = require("../services/inventoryMigrationPlan");

async function main() {
  const uri = process.env.MONGO_URI_AUDIT_RO;
  if (!uri) throw new Error("Set MONGO_URI_AUDIT_RO (read-only credentials), not production app credentials");
  const database = "Product_Supply";
  await mongoose.connect(uri, { dbName: database, autoIndex: false });
  try {
    const db = mongoose.connection.db;
    // These projections exclude names, addresses, user information and secrets.
    const [inventories, items, suppliers, meals, products] = await Promise.all([
      db.collection("inventories").find({}, { projection: {
        _id: 1, item: 1, storeId: 1, meal_price: 1, quantityInStock: 1, in_stock: 1
      }}).toArray(),
      db.collection("items").find({}, { projection: { _id: 1 } }).toArray(),
      db.collection("suppliers").find({}, { projection: { _id: 1, currency: 1 } }).toArray(),
      db.collection("meals").find({}, { projection: { _id: 1 } }).toArray(),
      db.collection("products").find({}, { projection: { _id: 1 } }).toArray()
    ]);
    const audit = planInventoryMigration({ inventories, items, suppliers, meals, products });
    const reasonCounts = {};
    const statusCounts = {};
    for (const entry of audit.entries) {
      statusCounts[entry.status] = (statusCounts[entry.status] || 0) + 1;
      for (const reason of entry.reasons) reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
    }
    // Intentionally output only aggregated counts. No data is written anywhere.
    process.stdout.write(JSON.stringify({
      database, sourceCollectionCounts: {
        inventories: inventories.length, items: items.length, suppliers: suppliers.length,
        meals: meals.length, products: products.length
      }, summary: audit.summary, statusCounts, reasonCounts
    }, null, 2) + "\n");
  } finally {
    await mongoose.disconnect();
  }
}

main().catch(error => {
  console.error("Read-only audit failed:", error.message);
  process.exitCode = 1;
});