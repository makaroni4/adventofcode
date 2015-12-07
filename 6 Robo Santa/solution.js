var fs = require("fs");

Array.prototype.each_slice = function (size, callback){
  for (var i = 0, l = this.length; i < l; i += size){
    callback.call(this, this.slice(i, i + size));
  }
};

Array.prototype.uniq = function() {
  return this.reduce(function(sofar, cur) {
    return sofar.indexOf(cur) < 0 ? sofar.concat([cur]) : sofar;
  }, []);
};

var move = function(curr_coord, sign) {
  switch (sign) {
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

  return curr_coord;
}

var updatePath = function(path, coord) {
  if(path[coord]) {
    path[coord.join("x")]++;
  } else {
    path[coord.join("x")] = 1;
  }
}

fs.readFile("input", "utf8", function(err, data) {
  var santaCoordinates = {
    "0x0": 1
  };

  var roboCoordinates = {
    "0x0": 1
  };

  var currSantaCoord = [0, 0];
  var currRoboCoord = [0, 0];

  data.split("").each_slice(2, function(slice) {
    var santaSign = slice[0];
    var roboSign = slice[1];

    if(santaSign) {
      currSantaCoord = move(currSantaCoord, santaSign);
      updatePath(santaCoordinates, currSantaCoord);
    }

    if(roboSign) {
      currRoboCoord = move(currRoboCoord, roboSign);
      updatePath(santaCoordinates, currRoboCoord);
    }
  });

  var visited_houses = Object.keys(santaCoordinates).concat(
    Object.keys(roboCoordinates)
  );

  var answer = visited_houses.uniq().length;

  console.log(answer);
});
