const Agenda = require('agenda');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME, // Your Gmail address
    pass: process.env.APP_PASSWORD, // App-specific password
  },
});

transporter.verify((error, success) => {
  if (success) {
    console.log('Nodemailer is ready to send emails', success);
  } else if (error) {
    console.error('Error setting up transporter:', error);
  } else {
    console.log('Nodemailer transporter is ready to send emails');
  }
});

const agenda = new Agenda({
  db: {
    address: process.env.MONGODB_URI,
    options: { useNewUrlParser: true }
  },
  processEvery: '5 minute'
});

agenda.define('sendEmail', async (job) => {
  const { to = 'v3p51435@gmail.com', subject, body } = job.attrs.data;

  console.log(`Executing job to send email to ${to} with subject "${subject}"`);

  try {
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to,
      subject,
      text: body,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} with message ID ${info.messageId}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
  }
});

agenda.define('sendEmailReport', async () => {
  await agenda.schedule('in 30 seconds', 'sendEmail', { to: 'v3p51435@gmail.com', subject: 'Report', body: 'Report' });
});

agenda.define('Stay alive', async (job) => {
  console.log('job executed:', new Date());
});

(async () => {
  await agenda.start();
  await agenda.cancel({});

  agenda.every('1 hour', 'Stay alive');
  // await agenda.now('sendEmailReport');
  // await agenda.now('sendEmail', {
  //   to: 'v3p51435@gmail.com',
  //   subject: 'Email Triggered Manually',
  //   body: 'This is a test email.',
  // });
})();

agenda.on('ready', () => {
  console.log('Success: Agenda connected');
});

agenda.on('error', (err) => {
  console.error('Agenda error:', err);
});

agenda.on('start', (job) => {
  console.log(`Job ${job.attrs.name} starting...`);
});

agenda.on('complete', (job) => {
  console.log(`Job ${job.attrs.name} completed.`);
});

agenda.on('fail', (err, job) => {
  console.error(`Job ${job.attrs.name} failed with error: ${err.message}`);
});

module.exports = agenda;

