var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n");

var lightsState = {};

input.forEach(function (row, i) {
  var rowLights = row.split("");
  rowLights.forEach(function (light, j) {
    lightsState[i + ":" + j] = light === "#" ? 1 : 0;
  });
})

function nextState(i, j) {
  var currentState = lightsState[i + ":" + j];
  var adjacentOns = 0;
  var adjacentOffs = 0;

  for(var x = i - 1; x <= i + 1; x++) {
    for(var y = j - 1; y <= j + 1; y++) {
      if(!(x === i && y === j)) {
        var state = lightsState[x + ":" + y];
        if(state === undefined || state === 0) {
          adjacentOffs++;
        } else if (state === 1) {
          adjacentOns++;
        } else {
          console.log("ERROR");
        }
      }
    }
  }

  if(currentState === 1) {
    if(adjacentOns === 2 || adjacentOns === 3) {
      return 1;
    } else {
      return 0;
    }
  } else {
    if(currentState === 0 && adjacentOns === 3) {
      return 1;
    } else {
      return 0;
    }
  }
}

function iterate() {
  var newState = {}

  Object.keys(lightsState).forEach(function (lightCoordinates) {
    var array = lightCoordinates.split(":"),
        i = parseInt(array[0]),
        j = parseInt(array[1]);

    newState[lightCoordinates] = nextState(i, j);
  });

  lightsState = newState;
}

for(i = 0; i < 100; i++) {
  iterate();
}

var lightsOn = Object.keys(lightsState).filter(function (lightCoordinates) {
  return lightsState[lightCoordinates] === 1;
})

console.log(lightsOn.length);
