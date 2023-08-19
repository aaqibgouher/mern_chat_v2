const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const mongoose = require("mongoose");

// email validation
const isEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return pattern.test(email);
};

// hash password
const hashPassword = async (password) => {
  // Hash the password
  const saltRounds = 10;

  const hashed = await bcrypt.hash(password, saltRounds);

  return hashed;
};

// decode password
const decodePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

const getEmailSubject = async () => {
  return `Welcome to Chatiyaoo!`;
};

const getEmailContent = async (code) => {
  if (!code) throw "Code is required while register user";

  return `
        <h1>Welcome to Our Team!</h1>
        <p>We are extremely happy to have you in our team!</p>
        <p>Below is the code for Email Verification: <strong>${code}</strong></p>
    `;
};

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Example: 'smtp.gmail.com'
      port: 587, // SMTP port (587 for TLS, 465 for SSL)
      secure: false, // Use TLS
      auth: {
        user: "ajayniranjanaaqib@gmail.com",
        pass: "eksttaajpgcdvybq",
      },
    });

    const mailOptions = {
      from: "ajayniranjanaaqib@gmail.com",
      to: to,
      subject: subject,
      html: text,
    };

    const info = await transporter.sendMail(mailOptions);

    return info.response;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const generateOTP = async () => {
  const buffer = crypto.randomBytes(6);
  const OTP = buffer.toString("hex");
  return OTP;
};

const isObjectIdValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
  isEmail,
  hashPassword,
  decodePassword,
  sendEmail,
  generateOTP,
  getEmailSubject,
  getEmailContent,
  isObjectIdValid,
};
