var mongoose  = require('mongoose');
var bcrypt    = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    default: Date.now,
  }
});

// Methods
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

// Hooks
userSchema.pre('save', function(next){
  const user = this;// Use user insted of this in otder to prevent conflict

  if( user.isModified('password') ){

    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);// Hash Password
  }
  next();
})

module.exports = mongoose.model('user', userSchema);
