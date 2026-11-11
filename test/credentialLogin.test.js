"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { requirePasswordCredentials } = require("../services/credentialLogin");

test("valid password credentials normalize email", () => {
  assert.deepEqual(requirePasswordCredentials({
    email: "  StoreAdmin@Example.com ", password: "correct-password"
  }), { email: "storeadmin@example.com", password: "correct-password" });
});
test("withAuth=false cannot bypass password requirement", () => {
  assert.throws(() => requirePasswordCredentials({
    email: "admin@example.com", withAuth: false
  }), error => error.code === 401);
});
test("email-only and null-password logins are rejected", () => {
  for (const password of [undefined, null, "", false]) {
    assert.throws(() => requirePasswordCredentials({
      email: "admin@example.com", password
    }), error => error.code === 401);
  }
});
test("client flags are ignored when password is present", () => {
  assert.deepEqual(requirePasswordCredentials({
    email: "admin@example.com", password: "abc", withAuth: false
  }), { email: "admin@example.com", password: "abc" });
});
test("invalid email payloads are rejected", () => {
  for (const email of [undefined, null, "", 4, {}]) {
    assert.throws(() => requirePasswordCredentials({ email, password: "abc" }),
      error => error.code === 401);
  }
});
