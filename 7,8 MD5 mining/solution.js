var fs = require("fs");
var md5 = require('md5');

var input = fs.readFileSync("input").toString().trim();
var index = 0;

var mine = function(input, index) {
  return md5(input + index).substring(0, 6);
}

while(mine(input, index) != "000000") {
  index++;
}

console.log(index);
