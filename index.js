var r;

module.exports = function rand(len) {
  if (!r)
    r = new Rand(null);

  return r.generate(len);
};

function Rand(randy) {
  this.randy = randy;
}
module.exports.Rand = Rand;

Rand.prototype.generate = function generate(len) {
  return this._rand(len);
};

if (typeof window === 'object') {
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
    // Old junk
    Rand.prototype._rand = function() {
      throw new Error('Not implemented yet');
    };
  }
} else {
  // Node.js or Web worker
  try {
    var crypto = require('cry' + 'pto');
  } catch (e) {
    // Emulate crypto API using randy
    var crypto = {
      randomBytes: function randomBytes(n) {
        var res = new Uint8Array(n);
        for (var i = 0; i < res.length; i++)
          res[i] = this.randy.getRandBits(8);
        return res;
      }
    };
  }
  Rand.prototype._rand = function _rand(n) {
    return crypto.randomBytes(n);
  };
}
