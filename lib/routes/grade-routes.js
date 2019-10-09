const router = require('express').Router();
const Grade = require('../models/grade-model');

router
  .get('/avgScores', (req, res, next) => {
    Grade.avgScores()
      .then(grades => res.json(grades))
      .catch(next);
  });

module.exports = router;