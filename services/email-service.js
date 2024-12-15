const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'romeoquinones4@gmail.com',
    pass: 'yosg xtsr ijjr uumi'
  }
});

function sendEmail(to, subject, html) {
  const mailOptions = {
    from: 'romeoquinones4@gmail.com',
    to,
    subject,
    html
  }

  return transporter.sendMail(mailOptions);
}

const to = 'miyomercadoquinones21@gmail.com';
const subject = 'Update on Your Complaint Status';
const text = 'Sample text message';

sendEmail(to, subject, text);

module.exports = sendEmail;