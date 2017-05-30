// api/controllers/UserController.js

var _ = require('lodash');
var _super = require('sails-auth/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.
  homepage: function(req, res){
    var auth=req.session.authenticated || false;
    var username='';
    if(req.user){ username = req.user.username }
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
});
