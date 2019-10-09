const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const separateCategories = {
  '$unwind': {
    'path': '$scores'
  }
};

const numberData = {
  '$group': {
    '_id': '$scores.type',
    'avg': {
      '$avg': '$scores.score'
    },
    'stDev': {
      '$stdDevPop': '$scores.score'
    },
    'max': {
      '$max': '$scores.score'
    },
    'min': {
      '$min': '$scores.score'
    }
  }
};

schema.static('gradeDist', function() {
  const pipeline = [
    separateCategories,
    numberData
  ];
  console.log(this);

  return this.aggregate(pipeline);
})

module.exports = mongoose.model('student', schema);