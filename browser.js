var util = require("./util");

module.exports = util.rand;
var Rand = module.exports.Rand = util.Rand;

if (window.crypto && window.crypto.getRandomValues) {
  // Modern browsers
  Rand.prototype._rand = function _rand(n) {
    var arr = new Uint8Array(n);
    window.crypto.getRandomValues(arr);
    return arr;
  };
} else if (window.msCrypto && window.msCrypto.getRandomValues) {
  // IE
  Rand.prototype._rand = function _rand(n) {
    var arr = new Uint8Array(n);
    window.msCrypto.getRandomValues(arr);
    return arr;
  };
} else {
  // Emulate crypto API using randy
  Rand.prototype._rand = function _rand(n) {
    var res = new Uint8Array(n);
    for (var i = 0; i < res.length; i++)
      res[i] = this.rand.getByte();
    return res;
  };
}
