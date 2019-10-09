
const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();


schema.static('avgScores', function () {
  const pipeline = [{
    $unwind: {
      path: '$scores'
    }
  }, {
    $project: {
      class: '$class_id',
      type: '$scores.type',
      score: '$scores.score',
    }
  }, {
    $group: {
      _id:
      {
        class: '$class',
        type: '$type'
      },
      avgScore: {
        $avg: '$score'
      }
    }
  }, {
    $sort: {
      '_id.class': 1
    }
  }, {
    $project: {
      _id: 0,
      class: '$_id.class',
      type: '$_id.type',
      avgScore: '$avgScore'
    }
  }];
  return this.aggregate(pipeline);
});

module.exports = mongoose.model('Grade', schema);