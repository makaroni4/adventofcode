var fs = require("fs");

var allMatches = function(input, pattern) {
  var result = [];

  do {
    m = pattern.exec(input);
    if (m) {
      result.push(m[0])
    }
  } while (m);

  return result.length;
};

var isNiceString = function(input) {
  var vowelPattern = /[aeiou]/g;
  var doublePattern = /(.)\1/g;
  var prohibitedPattern = /(ab|cd|pq|xy)/g;

  if(allMatches(input, vowelPattern) > 2 &&
    allMatches(input, doublePattern) > 0 &&
    allMatches(input, prohibitedPattern) === 0) {

    return true;
  }
};

var input = fs.readFileSync("input").toString().trim();
var result = 0;

input.split("\n").forEach(function(el, index) {
  if(isNiceString(el)) {
    result++;
  }
})

console.log(result);
