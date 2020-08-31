const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c9e269bbd37269",
      pass: "19c8d71f2d17be"
    }
  })