const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const groupByCity = {
  '$group': {
    '_id': '$city',
    'pop': {
      '$sum': '$pop'
    }
  }
};

const descendingOrder = {
  '$sort': {
    'pop': -1
  }
};

const limitByNumber = limitNumber => ({
  '$limit': limitNumber
});

schema.static('mostPopulous', function(limit) {
  const pipeline = [
    groupByCity, 
    descendingOrder,
    limitByNumber(limit)
  ];

  return this.aggregate(pipeline);
})

module.exports = mongoose.model('zip', schema);