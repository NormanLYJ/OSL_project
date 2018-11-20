var _ = require('lodash');
var dbUtils = require('../../dbUtils');
var Officer = module.exports = function (node) {
  dbUtils.transform(node);
  _.extend(this, node.properties);

  if (this.node_id) {
    this.node_id = this.node_id.toNumber();
  }
  this.category='Officer';
};