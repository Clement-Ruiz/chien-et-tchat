// config/permissions.js

var _ = require('lodash');
var _super = require('sails-permissions/config/permissions');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.
  adminEmail: process.env.ADMIN_EMAIL || 'admin@tchat.com',
  adminUsername: process.env.ADMIN_USERNAME || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'adminpass'
});
