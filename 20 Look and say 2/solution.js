var fs = require("fs");
var input = fs.readFileSync("input").toString().trim();

function lookAndSay(input) {
  var groups = input.match(/(.)\1*/g);

  var result = groups.map(function(el) {
    return el.length + el[0];
  })

  return result.join("");
}

var i;
for(i = 0; i < 50; i++) {
  input = lookAndSay(input);
}

console.log(input.length);
