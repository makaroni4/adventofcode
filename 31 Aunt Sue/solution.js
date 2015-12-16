var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n");
var tickerTape = fs.readFileSync("ticker_tape").toString().trim().split("\n");

Array.prototype.each_slice = function (size, callback){
  for (var i = 0, l = this.length; i < l; i += size){
    callback.call(this, this.slice(i, i + size));
  }
};

var combine = function(a, min) {
    var fn = function(n, src, got, all) {
        if (n == 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }
    var all = [];
    for (var i = min; i < a.length; i++) {
        fn(i, a, [], all);
    }
    all.push(a);
    return all;
}

var auntsParams = {};
var auntsFingerprints = {};

input.forEach(function (el) {
  var array = el.split(/[\:\,]/);

  var auntName = array.shift().trim();
  auntsParams[auntName] = {};

  array.each_slice(2, function(slice) {
    var param = slice[0].trim();
    var value = parseInt(slice[1].trim());

    auntsParams[auntName][param] = value;
  });

  var auntFingerprint = Object.keys(auntsParams[auntName]).sort().map(function(param) {
    return param + ": " + auntsParams[auntName][param];
  }).join(":");

  auntsFingerprints[auntFingerprint] = auntName;
})

var tickerTapeFingerprints = combine(tickerTape, 3).filter(function (combo) {
  return combo.length === 3;
})

var possibleAunts = tickerTapeFingerprints.map(function (combo) {
  var fingerprint = combo.sort().join(":");

  return auntsFingerprints[fingerprint];
})

console.log(possibleAunts.filter(function(aunt) {
  return !!aunt
}))
