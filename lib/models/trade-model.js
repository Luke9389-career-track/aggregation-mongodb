const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const findTicker = {
  $match: {
    ticker: 'abcd'
  }
};

const projectTime = {
  $project: {
    hour: { $hour: '$time' },
    shares: '$shares'
  }
};

const groupShares = {
  $group: {
    _id: '$hour',
    sharesTraded: {
      $sum: '$shares'
    }
  }
}

schema.static('hotHours', function () {
  const pipeline = [
    findTicker,
    projectTime,
    groupShares];

  return this.aggregate(pipeline);
});

module.exports = mongoose.model('Trade', schema);