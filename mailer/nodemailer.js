"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

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

function signUpEmail(to) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: user, // sender address
    to: to, // list of receivers
    subject: "Sign Up successful!, ChopChow", // Subject line
    text: "Thanks for signing up. You can login now.", // plain text body
    html:
      "<b>Thanks for signing up. You can login now.</b>" +
      "<p>Subomi A.<br></br>" +
      "Customer Satisfaction Specialist,<br></br>" +
      "ChopChow", // html body
  });

  /*     console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou... */
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

function passwordResetEmail(toEmail) {
  let info = transporter.sendMail({
    from: user, // sender address
    to: toEmail, // list of receivers
    subject: "ChopChow password reset successfully.", // Subject line
    text: "Your password is reset.", // plain text body
    html: "<b>Your password is reset. </b>", // html body
  });
}

//signUpEmail().catch(console.error);
module.exports = { signUpEmail, forgotPasswordEmail, passwordResetEmail };
