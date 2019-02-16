var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users         = require('../models/user');
var LoginLog      = require('../models/loginLog');

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(id, done) {
	Users.findById(id, function(err, user) {
		if(err) done(err);
		if(user){
			done(err, user);
		}
	});
});

passport.use('user', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, (req, username, password, done) => {
  Users.findOne({
      'username': username
    },
    (err, user) => {
      if( err ){

        return done(err);
      }else{

        if( !user ){

          var newUser = new Users({
            name: req.body.name,
            username: username,
            password: password
          });
          newUser.save((err) => {
            if( err ){

              return done(err);
            }else{
              var newLoginLog = new LoginLog({
                user: newUser._id,
              });
              newLoginLog.save((err) => {
                if( err ){

                  return done(err);
                }else{
                  return done(null, newUser);
                }
              })
            }
          })
        }else{
          if( !user.validPassword(password) ) {
            console.log("Password not true");
            return done(null, false, {
              message: 'error'
            });
          }else{
            user.name = req.body.name;
            user.save((err) => {
              if( err ){

                return done(err);
              }else{
                var newLoginLog = new LoginLog({
                  user: user._id,
                });
                newLoginLog.save((err) => {
                  if( err ){

                    return done(err);
                  }else{
                    return done(null, user);
                  }
                })
              }
            })
          }
        }
      }
    });
}));



module.exports = passport;
