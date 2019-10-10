const sgMail = require("@sendgrid/mail");

const sendgridAPIKey = "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";
sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ttijerina@wirediq.com",
    subject: "Thanks for joining!",
    text: `Welcome to the app, ${name}. Let me know how you like this!`
  });
};
const sendByeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ttijerina@wirediq.com",
    subject: "Before you go...",
    text: `Hello ${name}, I'm sorry it didn't work out. What could we have done better?`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendByeEmail
};