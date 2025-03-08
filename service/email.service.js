const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: '',
    pass: '',
  },
});

const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: '',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error in sending mail', error);
    throw new Error(error.message);
  }
};

module.exports = { sendMail };