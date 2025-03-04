"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();
const ejs = require("ejs");
const fe = require("fs")


let { EMAIL_USER: user, EMAIL_PASSWORD: pass } = process.env;
let transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: false,

  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

//var currentURL = `https://${process.env.APP_HOST}`
var currentURL = "https://chopchow.app/"
function signUpEmail(generatedToken, newUser) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport

  // send mail with defined transport object
  return transporter.sendMail({
    from: user, // sender address
    to: newUser.email, // list of receivers
    subject: "Sign Up successful!, Verify your Chop Chow Account", // Subject line
    html: `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #f47900;text-decoration:none;font-weight:600">Chop Chow</a>
          </div>
          <p style="font-size:1.1em; color: #000000">Hello ${newUser.first_name},</p>
          <p style="color: #000000">Thank you for signing up. Verify your email address to complete your signup so as to login successfully.</p>
          <h2 style="background: #f47900;margin: 0 auto;width: max-content;padding: 0 10px;color: #000000;border-radius: 4px;">${generatedToken}</h2>
          <p style="font-size:0.9em;">Regards,<br />ChopChow</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>ChopChow Inc</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>California</p>
          </div>
        </div>
      </div>
    `
  });

}

async function sendNewLetterSubscriptionEmail({ email, name, blogs }) {
  try {
    ejs.renderFile(__dirname + "/templates/email-subscription.ejs", { name, blogs }, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const mailOptions = {
          from: user,
          to: email,
          subject: 'ChopChow Newsletter',
          html: data
        };

        return transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log("Error: ", err);
            throw new Error(err)
          } else {
            console.log('Message sent: ' + info.response);
            return info
          }
        });
      }
    });
  } catch (e) {
    console.log(e, "Error")
  }
}


async function sendUserNewsLetterSubscription({ email, name, blogs, password }) {
  try {
    ejs.renderFile(__dirname + "/templates/news-letter-subscription.ejs", { name, blogs, password }, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const mailOptions = {
          from: user,
          to: email,
          subject: 'ChopChow Newsletter',
          html: data
        };

        return transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log("Error: ", err);
            throw new Error(err)
          } else {
            console.log('Message sent: ' + info.response);
            return info
          }
        });
      }
    });
  } catch (e) {
    console.log(e, "Error")
  }
}

function createUserEmail(newUser) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport

  // send mail with defined transport object
  return transporter.sendMail({
    from: user, // sender address
    to: newUser.email, // list of receivers
    subject: "Onboarding Successful", // Subject line
    html: `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">ChopChow</a>
          </div>
          <p style="font-size:1.1em">Hello ${newUser.first_name},</p>
          <p>An account has been created for you, use this temporal password - ${newUser.password} to access the dashboard.</p>
          <p style="font-size:0.9em;">Regards,<br />ChopChow</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>ChopChow Inc</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>California</p>
          </div>
        </div>
      </div>
    `
  });

}



function passwordResetEmail(toEmail) {
  let info = transporter.sendMail({
    from: user, // sender address
    to: toEmail, // list of receivers
    subject: "Chop Chow password reset successfully.", // Subject line
    text: "Your password is reset.", // plain text body
    html: "<b>Your password has been reset reset. </b>", // html body
  });
}

function forgotPasswordEmail(toEmail, resetLink) {
  console.log("Comes in forgot password func");
  let info = transporter.sendMail({
    from: user, // sender address
    to: toEmail, // list of receivers
    subject: "Please reset your password.", // Subject line
    text: "Use link below to reset your password. " + resetLink, // plain text body
    html: "<b>Use link below to reset your password. </b>" + resetLink, // html body

  }).then((data) => { }).catch(error => { console.log({ error }) })
}


//signUpEmail().catch(console.error);
module.exports = { signUpEmail, forgotPasswordEmail, passwordResetEmail, createUserEmail, sendNewLetterSubscriptionEmail, sendUserNewsLetterSubscription };
