var _ = require('lodash');
var dbUtils = require('../../dbUtils');
var Entity = module.exports = function (node) {
  dbUtils.transform(node)
  _.extend(this, node.properties);
  if (this.node_id) {
    this.node_id = this.node_id.toNumber();
  }
  //needed by front end to distinguish node types
  this.category='Entity';
};