const router = require('express').Router();
const Trade = require('../models/trade-model');

router
  .get('/', (req, res, next) => {
    Trade.find()
      .lean()
      .then(zips => res.json(zips))
      .catch(next);
  })

  .get('/hotHours', (req, res, next) => {
    const limit = parseInt(req.query.limit || 10);

    Trade.hotHours(limit)
      .then(cities => res.json(cities))
      .catch(next);
  })

module.exports = router;