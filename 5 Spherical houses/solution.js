var fs = require("fs");

fs.readFile("input", "utf8", function(err, data) {
  var coordinates = {
    "0x0": 1
  };

  var curr_coord = [0, 0];

  console.log(data.length)

  data.split("").forEach(function(el) {
    if(!el) {
      return true;
    }

    switch (el) {
      case "^":
        curr_coord[1]++;
        break;
      case ">":
        curr_coord[0]++;
        break;
      case "v":
        curr_coord[1]--;
        break;
      case "<":
        curr_coord[0]--;
        break;
    }

    if(coordinates[curr_coord]) {
      coordinates[curr_coord.join("x")]++;
    } else {
      coordinates[curr_coord.join("x")] = 1;
    }
  });

  var answer = Object.keys(coordinates).length;

  console.log(answer);
});
