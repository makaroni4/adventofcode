var fs = require("fs");

var answer = fs.readFile("input", "utf8", function(err, data) {
  var answer = 0;

  data.split("\n").forEach(function(el, index) {
    if(!el) {
      return true;
    }

    var sides = el.split("x");
    var squares = [
      sides[0] * sides[1],
      sides[1] * sides[2],
      sides[0] * sides[2]
    ]

    var smallestSide = parseInt(Math.min.apply(null, squares));

    var boxPaper = 2 * squares[0] +
                   2 * squares[1] +
                   2 * squares[2];

    answer += smallestSide + boxPaper;
  });

  console.log(answer);
});
