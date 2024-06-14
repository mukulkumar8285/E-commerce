const nodemailer = require("nodemailer");

const sendMail = async (Options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVER,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOption = {
    from: process.env.SMPT_MAIL,
    to:Options.email,
    subject: Options.subject,
    text: Options.message,
  }

  await transporter.sendMail(mailOption);
};

module.exports = sendMail;
