// api/controllers/UserController.js

var _ = require('lodash');
var _super = require('sails-auth/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.

  // Return the view of user's profile.
  profile: function(req, res){
    var id = req.param('id') || req.user.id;
    User.findOne({ id: id }).exec(function(err, user){
      if(err){
        sails.log.error('Error while finding User');
        sails.log.error(err);
        return res.negotiate(err);
      }
      if(!user){
        return res.view("404");
      }
      else {
        return res.view("restricted/user", {
          layout: "layout",
          user: user
        });
      }
    });
  },

  // Signup function
  signup: function(req, res){
    var username = req.param('username');
    if (!username){
      return res.send(500, "Username is required");
    }
    var email = req.param('email');
    var password = req.param('password');
    var confirm = req.param('confirm');
    var firstName = req.param('firstName') || 'Huille';
    var lastName = req.param('lastName') || 'Smisse';
    if (password != confirm){
      return res.send(500, "Passwords don't match");
    }
    User.create({
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    }).exec(function(err, user){
      if(err){
        sails.log.error(err);
        return res.negotiate(err);
      }
      if(!user){
        sails.log.error('Signup - No user returned after User.create()');
        return res.send(500, 'User creation failed');
      }
      else{
        sails.log.info('Signup - New user created !');
        sails.log.info(user);
        return res.ok(user);
      }
    });

  },
});
