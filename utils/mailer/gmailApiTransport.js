"use strict";

/**
 * Gmail API transport for Chop Chow transactional email.
 * The Gmail API uses HTTPS rather than SMTP, which avoids outbound SMTP
 * connectivity restrictions on hosted platforms such as Render.
 *
 * Required server-side secrets:
 *   GMAIL_OAUTH_CLIENT_ID
 *   GMAIL_OAUTH_CLIENT_SECRET
 *   GMAIL_OAUTH_REFRESH_TOKEN
 *   GMAIL_SENDER_EMAIL (chopchowsd@gmail.com)
 *
 * OAuth grant: https://www.googleapis.com/auth/gmail.send
 * The refresh token must belong to GMAIL_SENDER_EMAIL.
 * Never log tokens, message bodies, or full API responses.
 */
const nodemailer = require("nodemailer");

const mimeTransport = nodemailer.createTransport({
  streamTransport: true,
  buffer: true,
  newline: "unix",
});

let cachedAccessToken = null;
let accessTokenExpiresAt = 0;
let refreshInFlight = null;

function requiredEnv(name) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Gmail API configuration missing: ${name}`);
  }
  return value.trim();
}

async function requestAccessToken() {
  const clientId = requiredEnv("GMAIL_OAUTH_CLIENT_ID");
  const clientSecret = requiredEnv("GMAIL_OAUTH_CLIENT_SECRET");
  const refreshToken = requiredEnv("GMAIL_OAUTH_REFRESH_TOKEN");

  let response;
  try {
    response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    throw new Error("Gmail API token request failed or timed out");
  }

  if (!response.ok) {
    const error = new Error(`Gmail API token request failed (HTTP ${response.status})`);
    error.status = response.status;
    throw error;
  }

  const tokenResponse = await response.json();
  if (!tokenResponse.access_token || !Number.isFinite(Number(tokenResponse.expires_in))) {
    throw new Error("Gmail API token response was incomplete");
  }

  cachedAccessToken = tokenResponse.access_token;
  accessTokenExpiresAt = Date.now() + Number(tokenResponse.expires_in) * 1000;
  return cachedAccessToken;
}

async function getAccessToken() {
  if (cachedAccessToken && Date.now() < accessTokenExpiresAt - 60000) {
    return cachedAccessToken;
  }
  if (!refreshInFlight) {
    refreshInFlight = requestAccessToken().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

async function sendViaGmailApi(options) {
  // This branch is only for isolated staging. Never send to real customers.
  const allowed = requiredEnv("STAGING_ALLOWED_EMAIL").toLowerCase();
  const recipients = [options.to, options.cc, options.bcc].filter(Boolean);
  if (
    recipients.length !== 1 ||
    typeof options.to !== "string" ||
    options.to.trim().toLowerCase() !== allowed
  ) {
    throw new Error("Staging mail blocked: recipient is not allowlisted");
  }
  const sender = requiredEnv("GMAIL_SENDER_EMAIL");
  // Never allow a caller to substitute an unverified From address.
  const mail = await mimeTransport.sendMail({
    ...options,
    from: `Chop Chow <${sender}>`,
  });

  const accessToken = await getAccessToken();
  let response;
  try {
    response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: mail.message.toString("base64url") }),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    // A timeout does not prove the message was not accepted. Avoid blind retries.
    throw new Error("Gmail API send request failed or timed out; delivery status unknown");
  }

  if (!response.ok) {
    if (response.status === 401) {
      cachedAccessToken = null;
      accessTokenExpiresAt = 0;
    }
    const error = new Error(`Gmail API send failed (HTTP ${response.status})`);
    error.status = response.status;
    throw error;
  }

  const result = await response.json();
  if (!result.id) {
    throw new Error("Gmail API send response missing message ID");
  }
  // Gmail accepted the message; this is not proof of inbox delivery.
  return { messageId: result.id, response: "Gmail API accepted message" };
}

function sendMail(options, callback) {
  const promise = sendViaGmailApi(options);
  if (typeof callback === "function") {
    promise.then((info) => callback(null, info), (error) => callback(error));
    return;
  }
  return promise;
}

module.exports = { sendMail };
