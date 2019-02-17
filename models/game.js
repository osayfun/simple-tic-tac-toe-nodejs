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
    required: false,
  },
  opp1Pattern: {
    type: String,
    required: false,
  },
  opp2Pattern: {
    type: String,
    required: false,
  },
  result: {
    type: Number, // -1, 0, 1
    required: false,
  },
});


module.exports = mongoose.model('game', modelSchema);
