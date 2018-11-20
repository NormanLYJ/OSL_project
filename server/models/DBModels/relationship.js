var _ = require('lodash');
var dbUtils = require('../../dbUtils');
var Relationship = module.exports = function (rel) {
  dbUtils.transform(rel);
  _.extend(this, rel.properties);
  if (this.rel_id) {
    this.rel_id = this.rel_id.toNumber();
  }
  //this will be mapped to the edge in the front end
  this.type='arrow';
  this.label=this.relation;
};