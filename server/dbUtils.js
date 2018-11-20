"use strict";

// neo4j connectivity helper
var nconf = require('./config');
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver(nconf.get('neo4j-local'), neo4j.auth.basic(nconf.get('USERNAME'), nconf.get('PASSWORD')));

// if (nconf.get('neo4j') == 'remote') {
//   driver = neo4j.driver(nconf.get('neo4j-remote'), neo4j.auth.basic(nconf.get('USERNAME'), nconf.get('PASSWORD')));
// }

exports.getSession = function (context) {
  if(context.neo4jSession) {
    return context.neo4jSession;
  }
  else {
    context.neo4jSession = driver.session();
    return context.neo4jSession;
  }
};

exports.dbWhere = function (name, keys) {
  if (_.isArray(name)) {
    _.map(name, (obj) => {
      return _whereTemplate(obj.name, obj.key, obj.paramKey);
    });
  } else if (keys && keys.length) {
    return 'WHERE ' + _.map(keys, (key) => {
        return _whereTemplate(name, key);
      }).join(' AND ');
  }
};

function whereTemplate(name, key, paramKey) {
  return name + '.' + key + '={' + (paramKey || key) + '}';
}

//this is necessary because Noe4j js driver will change the integer into an object that contains a high and low property
//age: int(50) will become age:{"low":50,"high":0}
function transform(object) {
  for (let property in object) {
    if (object.hasOwnProperty(property)) {
      const propertyValue = object[property];
      if (neo4j.isInt(propertyValue)) {
        object[property] = propertyValue.toString();
      } else if (typeof propertyValue === 'object') {
        transform(propertyValue);
      }
    }
  }
}

exports.transform =transform;