var _ = require('lodash');
var dbUtils = require('../../dbUtils');
var Intermediary = module.exports = function (node) {
  dbUtils.transform(node);
  _.extend(this, node.properties);

  if (this.node_id) {
    this.node_id = this.node_id.toNumber();
  }
  this.category='Intermediary';
};