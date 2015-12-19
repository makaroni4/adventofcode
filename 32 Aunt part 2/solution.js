Array.prototype.each_slice = function (size, callback){
  for (var i = 0, l = this.length; i < l; i += size){
    callback.call(this, this.slice(i, i + size));
  }
};

var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n");
var tickerTape = fs.readFileSync("ticker_tape").toString().trim().split("\n");

var tickerTapeResults = {};
tickerTape.forEach(function (result) {
  var array = result.split(": "),
      param = array[0],
      value = parseInt(array[1]);

  tickerTapeResults[param] = value;
})

var auntsParams = {};

input.forEach(function (el) {
  var array = el.split(/[\:\,]/);

  var auntName = array.shift().trim();
  auntsParams[auntName] = {};

  array.each_slice(2, function(slice) {
    var param = slice[0].trim();
    var value = parseInt(slice[1].trim());

    auntsParams[auntName][param] = value;
  });
})

function isValidAunt(auntName) {
  var auntParams = auntsParams[auntName];
  var result = true;

  Object.keys(auntParams).forEach(function (param) {
    var value = auntParams[param];

    switch(param) {
      case "cats":
        if(value <= tickerTapeResults.cats) {
          result = false;
        };
        break;
      case "trees":
        if(value <= tickerTapeResults.cats) {
          result = false;
        };
        break;
      case "pomeranians":
        if(value >= tickerTapeResults.pomeranians) {
          result = false;
        };
        break;
      case "goldfish":
        if(value >= tickerTapeResults.goldfish) {
          result = false;
        };
        break;
      default:
        if(value !== tickerTapeResults[param]) {
          result = false;
        };
        break;
    }
  })

  return result;
}

var possibleAunts = Object.keys(auntsParams).forEach(function (auntName) {
  if(isValidAunt(auntName)) {
    console.log(auntName)
  }
})
