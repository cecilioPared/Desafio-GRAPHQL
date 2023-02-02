import nodemailer from 'nodemailer'
import logger from './loggerHandler.js'

const email =  process.env.EMAIL_TO

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (subject, html) => {
  const opts = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: html,
  };

  try {
    const info = await transporter.sendMail(opts);
    logger.info(`Email enviado a ${email} - info: ${ JSON.stringify(info,2,null) }`)
  } catch (error) {
    logger.error('error', error)
  }
};
export default sendMail;
