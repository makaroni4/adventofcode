var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n");

var stringChars = 0;
var memoryChars = 0;

input.forEach(function(el, index) {
  stringChars += el.length;
  el = el.substring(1, el.length - 1)

  var countDoubleSlashes = (el.match(/\\\\/g) || []).length;
  var countEscapedQuotes = (el.match(/\\\"/g) || []).length;
  var countHexCharacters = (el.match(/\\x[0-9A-Fa-f]{2}/g) || []).length;

  el = el.replace(/\\\\/g, "");
  el = el.replace(/\\\"/g, "");
  el = el.replace(/\\x[0-9A-Fa-f]{2}/g, "");

  memoryChars += el.length + countDoubleSlashes + countEscapedQuotes + countHexCharacters;
});

console.log(stringChars - memoryChars);
