var mongoose  = require('mongoose');
var Users     = require('./user');

var Schema = mongoose.Schema;

var modelSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  }

});


module.exports = mongoose.model('login_log', modelSchema);
