var fs = require("fs");

var isNiceString = function(input) {
  var doubleDoublePattern = /((?:.){2}).{0,}\1/g;
  var doublePattern = /(.).{1}\1/g;

  var m1 = doubleDoublePattern.exec(input) || [];
  var m2 = doublePattern.exec(input) || [];

  if(m1.length > 1 && m2.length > 1) {

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
