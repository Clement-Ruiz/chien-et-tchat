// api/controllers/UserController.js

var _ = require('lodash');
var _super = require('sails-auth/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.
  homepage: function(req, res){
    var auth=req.session.authenticated || false;
    var username='';
    if(req.user){
      username = req.user.username;
     }
    return res.view("homepage", {
      auth: auth,
      user: username
    });
  },
  // Return the view of user's profile.
  profile: function(req, res){
    var name = req.param('name') || req.user.username;
    User.findOne({ username: name }).exec(function(err, user){
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
  update: function(req, res){
    var username = req.user.username;
    var data = {};
    if(req.param('firstName')){ data.firstName = req.param('firstName') }
    if(req.param('lastName')){ data.lastName = req.param('lastName') }
    if(!_.isEmpty(data) && username){
      User.update({username: username }, data).exec(function(err, user){
        if(err){
          sails.log.error('Error while updating User');
          sails.log.error(err);
          return res.negotiate(err);
        }
        if(!user){
          sails.log.error('Error while updating User');
          sails.log.error(err);
          return res.redirect('/user');
        }
        else {
          return res.ok(user);
        }
      });
    }
    else{
      res.redirect('/user');
    }
  },
});
