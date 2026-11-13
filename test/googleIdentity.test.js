"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { generateKeyPairSync } = require("node:crypto");
const jwt = require("jsonwebtoken");
const { verifyGoogleIdToken } = require("../services/googleIdentity");

const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const jwk = { ...publicKey.export({ format: "jwk" }), kid: "test-key", alg: "RS256", use: "sig" };
const loadKeys = async () => [jwk];
const audience = "new-client-id.apps.googleusercontent.com";
const claims = {
  sub: "google-stable-subject",
  email: "Admin@Example.com",
  email_verified: true
};
function signed(overrides = {}, opts = {}) {
  return jwt.sign({ ...claims, ...overrides }, privateKey, {
    algorithm: "RS256", keyid: "test-key", issuer: "https://accounts.google.com",
    audience, expiresIn: "30m", ...opts
  });
}
const verify = (token, opts = {}) =>
  verifyGoogleIdToken(token, { audience, loadKeys, ...opts });

test("accepts a signed, audience-bound, verified Google identity", async () => {
  const identity = await verify(signed());
  assert.deepEqual({
    provider: identity.provider, providerUserId: identity.providerUserId,
    email: identity.email, emailVerified: identity.emailVerified
  }, {
    provider: "google", providerUserId: "google-stable-subject",
    email: "admin@example.com", emailVerified: true
  });
});
test("rejects wrong OAuth client audience", async () => {
  await assert.rejects(verify(signed(), { audience: "another-client" }));
});
test("rejects unverified email and missing stable subject", async () => {
  await assert.rejects(verify(signed({ email_verified: false })));
  await assert.rejects(verify(signed({ sub: "" })));
});
test("rejects tokens with untrusted issuer", async () => {
  await assert.rejects(verify(signed({}, { issuer: "https://evil.example" })));
});
test("rejects expired tokens", async () => {
  await assert.rejects(verify(signed({}, { expiresIn: -3600 })));
});
test("rejects unknown Google signing key", async () => {
  await assert.rejects(verify(signed(), { loadKeys: async () => [] }));
});
test("rejects unsigned or unsupported algorithm tokens", async () => {
  await assert.rejects(verify(jwt.sign(claims, "bad-key", { algorithm: "HS256", keyid: "test-key" })));
});
test("rejects unconfigured audience and empty tokens", async () => {
  await assert.rejects(verifyGoogleIdToken(signed(), { audience: "", loadKeys }));
  await assert.rejects(verify(""));
});
