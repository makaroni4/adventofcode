var fs = require("fs");

var answer = fs.readFile("input", "utf8", function(err, data) {
  var stair = 0;

  data.split("").some(function(el, index) {
    if(el === "(") {
      stair++;
    } else if(el === ")") {
      stair--;
    }

    if(stair === -1) {
      console.log(index + 1);
      return true;
    }
  });
});
