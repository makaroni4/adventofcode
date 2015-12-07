var fs = require("fs");

var answer = fs.readFile("input", "utf8", function(err, data) {
  var answer = 0;

  data.split("\n").forEach(function(el, index) {
    if(!el) {
      return true;
    }

    var sides = el.split("x").map(function(el) {
      return parseInt(el);
    }).sort(function(a,b) {
      return a - b
    });

    console.log(sides)

    var bowLength = sides[0] *
                    sides[1] *
                    sides[2];

    var wrapRibbon = 2 * sides[0] +
                     2 * sides[1];

    answer += bowLength + wrapRibbon;
  });

  console.log(answer);
});
