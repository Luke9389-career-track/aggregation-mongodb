const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

schema.static('pageCount', function () {
  const pipeline = [{
    $unwind: {
      path: '$authors',
    }
  }, {
    $group: {
      _id: '$authors',
      avgPageCount: {
        $avg: '$pageCount'
      }
    }
  }, {
    $sort: {
      avgPageCount: -1
    }
  }];

  return this.aggregate(pipeline);
});

module.exports = mongoose.model('Book', schema);