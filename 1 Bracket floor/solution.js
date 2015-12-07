var fs = require("fs");

var answer = fs.readFile("input", "utf8", function(err, data) {
  var stair = 0;

  data.split("").forEach(function(el, index) {
    if(el === "(") {
      stair++;
    } else if(el === ")") {
      stair--;
    }
  });

  console.log(stair);
});
