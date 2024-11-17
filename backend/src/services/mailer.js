const nodemailer = require('nodemailer');
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.MAIL_USERNAME,
//     clientId: process.env.OAUTH_CLIENTID,
//     clientSecret: process.env.OAUTH_CLIENT_SECRET,
//     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//     accessToken: process.env.OAUTH_ACCESSTOKEN
//   }
// });

// transporter.verify((error, success) => {
//   if (success) {
//     console.log('Nodemailer is ready to send emails', success);
//   }
//   if (error) {
//     console.error('Error setting up transporter:', error);
//   } else {
//     console.log('Nodemailer transporter is ready to send emails');
//   }
// });

module.exports = transporter;


// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-email-password',
//   },
// });

// module.exports = transporter;
