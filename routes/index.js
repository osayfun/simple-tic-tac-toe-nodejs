var express   = require('express');
var LoginLog  = require('../models/loginLog');
var Games     = require('../models/game');

var passportAuth = require('../utils/passport');

var router = express.Router();

function isLoggedin(req, res, next){
  if ( req.isAuthenticated() )
		return next();
  else {
    res.redirect('/login');
	}
}

router.get('/', isLoggedin, (req, res, next) => {
  res.redirect('/stats');
})

router.post('/login', passportAuth.authenticate('user', {
  successRedirect: '/stats',
  failureRedirect: '/login',
  failureFlash: false
}));

module.exports = (io) => {

  router.get('/login', (req, res, next) => {
    if( req.isAuthenticated() ){

      res.redirect('/stats');
    }else{
      res.render('login.hbs');
    }
  })

  router.get('/stats', isLoggedin, (req, res, next) => {
    var user        = req.session.passport.user;
    var name        = user.name;
    var username    = user.username;
    var lastlogin   = "No Data";
    var totalgames  = "No Data";
    var wongames    = "No Data";
    var lostgames   = "No Data";
    LoginLog.findOne({'user': user._id}, {'date': 1}, {sort: {date: -1}}, (err, lastLogin) => {
      if( !err && lastLogin ){

        var date = new Date(lastLogin.date);
        lastlogin = date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' });
      }
      Games.countDocuments({$or: [
         {opp1: user._id},
         {opp2: user._id}
       ]}, (err, totalGames) => {
         if( !err ){

           totalgames = totalGames;
         }
         Games.countDocuments({$or: [
           {opp1: user._id, result: -1},
           {opp2: user._id, result: 1},
         ]}, (err, wonGames) => {
           if( !err ){

             wongames = wonGames;
           }
           Games.countDocuments({$or: [
             {opp1: user._id, result: 1},
             {opp2: user._id, result: -1},
           ]}, (err, lostGames) => {
             if( !err ){

               lostgames = lostGames;
             }

             res.render('stats.hbs', {name: name, username: username, lastlogin: lastlogin, totalgames: totalgames, wongames: wongames, lostgames});
           })
         })
       })
    })
  })


  router.get('/logout', isLoggedin, (req, res, next)=> {
  	req.logout();
  	res.redirect('/login');
  });

  return router;
}
