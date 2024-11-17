const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cors = require('cors');
const agenda = require('./services/agenda');
const routes = require('./routes');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.0.155:3000', 'http://localhost:3001', 'http://192.168.0.155:3001'
];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  headers: true,
  skip: (req) =>
    !req.headers.origin ||
    allowedOrigins.includes(req.headers.origin) ||
    req.ip === '127.0.0.1' ||
    req.ip === '::1' ||
    (/^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:\d{1,5}$/.test(req.headers.origin)),
});
app.use(generalLimiter);
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use('/api/v1', routes);

app.use('/agenda/jobs', async (req, res) => {
  const jobs = await agenda.jobs();
  res.json(jobs);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});


module.exports = app;