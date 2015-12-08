var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n");

var originalStringChars = 0;
var encodedStringChars = 0;

function encodeString(string) {
  string = string.replace(/\\"/g, '\\\"');
  string = string.replace(/\\/g, '\\\\');
  string = string.replace(/\"/g, '\\\"');
  string = '"' + string + '"';

  return string;
}

input.forEach(function(el, index) {
  var originalString = el;
  var encodedString = encodeString(el);

  originalStringChars += originalString.length;
  encodedStringChars += encodedString.length;
});

console.log(encodedStringChars - originalStringChars);
