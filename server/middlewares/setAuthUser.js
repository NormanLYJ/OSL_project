var writeError = require('../helpers/response').writeError;
var User = require('../models/user');
var dbUtils = require('../dbUtils');

module.exports = function setAuthUser(req, res, next) {
  var authHeader = req.headers['authorization'];
  if (!authHeader) {
    req.user = {id: null};
    next();
  }
  else {
    var match = authHeader.match(/^Token (\S+)/);
    if (!match || !match[1]) {
      return writeError(res, {detail: 'invalid authorization format. Follow `Token <token>`'}, 401);
    }
    var token = match[1];

    User.me(dbUtils.getSession(req), token)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(next);
  }
};

