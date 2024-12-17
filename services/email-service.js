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
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;