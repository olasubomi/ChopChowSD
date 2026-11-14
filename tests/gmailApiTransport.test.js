"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const modulePath = require.resolve("../utils/mailer/gmailApiTransport");

function loadFreshTransport() {
  delete require.cache[modulePath];
  return require(modulePath);
}

function withEnv() {
  process.env.GMAIL_OAUTH_CLIENT_ID = "test-client";
  process.env.GMAIL_OAUTH_CLIENT_SECRET = "test-secret";
  process.env.GMAIL_OAUTH_REFRESH_TOKEN = "test-refresh";
  process.env.GMAIL_SENDER_EMAIL = "chopchowsd@gmail.com";
}

test("sends RFC822 email using Gmail API and OAuth refresh token", async () => {
  withEnv();
  const previousFetch = global.fetch;
  const calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    if (url.includes("oauth2.googleapis.com")) {
      assert.equal(options.method, "POST");
      assert.equal(new URLSearchParams(options.body).get("grant_type"), "refresh_token");
      return { ok: true, json: async () => ({ access_token: "test-access", expires_in: 3600 }) };
    }
    assert.equal(url, "https://gmail.googleapis.com/gmail/v1/users/me/messages/send");
    assert.equal(options.headers.Authorization, "Bearer test-access");
    const raw = JSON.parse(options.body).raw;
    const mime = Buffer.from(raw, "base64url").toString("utf8");
    assert.match(mime, /From: Chop Chow <chopchowsd@gmail.com>/i);
    assert.match(mime, /To: recipient@example.com/i);
    return { ok: true, json: async () => ({ id: "gmail-message-id" }) };
  };
  try {
    const { sendMail } = loadFreshTransport();
    const result = await sendMail({
      from: "attacker@example.com",
      to: "recipient@example.com",
      subject: "Password reset test",
      text: "This is a test",
    });
    assert.equal(result.messageId, "gmail-message-id");
    assert.equal(calls.length, 2);
  } finally {
    global.fetch = previousFetch;
  }
});

test("does not report success when Gmail rejects the message", async () => {
  withEnv();
  const previousFetch = global.fetch;
  global.fetch = async (url) => url.includes("oauth2.googleapis.com")
    ? { ok: true, json: async () => ({ access_token: "test-access", expires_in: 3600 }) }
    : { ok: false, status: 403 };
  try {
    const { sendMail } = loadFreshTransport();
    await assert.rejects(
      sendMail({ to: "recipient@example.com", subject: "Test", text: "Test" }),
      /Gmail API send failed \(HTTP 403\)/
    );
  } finally {
    global.fetch = previousFetch;
  }
});
