// config/passport.js

var _ = require('lodash');
var _super = require('sails-auth/config/passport');

_.merge(exports, _super);
_.merge(exports, {
  // passport:{
  //   facebook: {
  //     name: 'Facebook',
  //     protocol: 'oauth2',
  //     strategy: require('passport-facebook').Strategy,
  //     options: {
  //       clientID: 'your-client-id',
  //       clientSecret: 'your-client-secret'
  //     }
  //   }
  // },
  // Extend with custom logic here by adding additional fields, methods, etc.

});
