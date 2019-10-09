const router = require('express').Router();
const Student = require('../models/student-model');

router
  .get('/', (req, res, next) => {
    Student.find()
      .lean()
      .then(students => res.json(students))
      .catch(next);
  })

  .get('/gradeDist', (req, res, next) => {
    Student.gradeDist()
      .then(data => res.json(data))
      .catch(next);
  })

module.exports = router;