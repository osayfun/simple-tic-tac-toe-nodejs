var mongoose  = require('mongoose');
var Users     = require('./user');

var Schema = mongoose.Schema;

var modelSchema = Schema({
  opp1: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  opp2: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number,
    required: true,
  },
  opp1Pattern: {
    type: Number,
    required: true,
  },
  opp2Pattern: {
    type: Number,
    required: true,
  },
  result: {
    type: Number, // -1, 0, 1
    required: true,
  },
});


module.exports = mongoose.model('game', modelSchema);
