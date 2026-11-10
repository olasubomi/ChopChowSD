"use strict";

// Server-authoritative store access rules. Always load the current User and
// Supplier from MongoDB; never trust role flags or owner IDs in request bodies.
const asId = value => {
  if (value && typeof value === "object") value = value._id || value;
  return value == null ? "" : String(value);
};
const inList = (members, userId) =>
  Array.isArray(members) && members.some(member => asId(member) === userId);
const isPlatformAdmin = user =>
  Boolean(user && Array.isArray(user.user_type) && user.user_type.includes("admin"));
function canManageStore(user, store, action) {
  if (!user || !store || !user._id) return false;
  if (isPlatformAdmin(user)) return true;
  const uid = asId(user._id);
  const owner = asId(store.store_owner) === uid;
  // Only owners and platform admins can change administrator membership.
  if (action === "manage_admins" || action === "update_store") return owner;
  // Deletion is destructive; only platform admins can delete stores.
  if (action === "delete_store") return false;
  if (action === "manage_inventory" || action === "manage_orders") {
    return owner || inList(store.store_admins, uid) ||
      inList(store.store_sub_admins, uid);
  }
  return false;
}
module.exports = { canManageStore, isPlatformAdmin, asId };
