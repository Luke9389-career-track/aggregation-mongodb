const router = require('express').Router();
const Zip = require('../models/zip-model');

router
  .get('/', (req, res, next) => {
    Zip.find()
      .lean()
      .then(zips => res.json(zips))
      .catch(next);
  })

  .get('/mostPopulous', (req, res, next) => {
    const limit = parseInt(req.query.limit || 10);

    Zip.mostPopulous(limit)
      .then(cities => res.json(cities))
      .catch(next);
  })

module.exports = router;