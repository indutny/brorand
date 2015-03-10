var r;

exports.rand = function rand(len) {
  if (!r)
    r = new Rand(null);

  return r.generate(len);
};

function Rand(rand) {
  this.rand = rand;
}

Rand.prototype.generate = function generate(len) {
  return this._rand(len);
};

exports.Rand = Rand;
