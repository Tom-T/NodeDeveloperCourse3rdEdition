const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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