// api/controllers/UserController.js

var _ = require('lodash');
var _super = require('sails-auth/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.
  profile: function(req, res){
    var id = req.param('id') || req.user.id;
    User.findOne({ id: id }).exec(function(err, user){
      if(err){
        sails.log.error('Error while finding User');
        sails.log.error(err);
        return res.negotiate(err);
      }
      if(!user){
        sails.log.error('User with id '+id+' not found.');
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
