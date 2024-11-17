const express = require('express');
const { body, validationResult } = require('express-validator');
const { scheduleWorkflow } = require('../controllers/agendaControllers');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, World!');
});

router.post(
  '/submit-workflow',
  [
    body('nodes').isArray().withMessage('Nodes must be an array'),
    body('edges').isArray().withMessage('Edges must be an array'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  scheduleWorkflow
);

module.exports = router;
