var crypto = require("crypto");
var util = require("./util");

module.exports = util.rand;
var Rand = module.exports.Rand = util.Rand;

Rand.prototype._rand = function _rand(n) {
  return crypto.randomBytes(n);
};
