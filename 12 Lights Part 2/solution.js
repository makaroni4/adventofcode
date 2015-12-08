var fs = require("fs");

var input = fs.readFileSync("input").toString().trim();
var lightsState = {}

function execute(coord1, coord2, command) {
  for(var i = parseInt(coord1[0]); i <= parseInt(coord2[0]); i++) {
    for(var j = parseInt(coord1[1]); j <= parseInt(coord2[1]); j++) {
      switch(command) {
        case "turn on":
          if(!lightsState[i + ":" + j]) {
            lightsState[i + ":" + j] = 0;
          }
          lightsState[i + ":" + j]++;
          break;
        case "turn off":
          if(!lightsState[i + ":" + j]) {
            lightsState[i + ":" + j] = 0;
            break;
          }
          lightsState[i + ":" + j]--;
          if(lightsState[i + ":" + j] < 0) {
            lightsState[i + ":" + j] = 0;
          }
          break;
        case "toggle":
          if(!lightsState[i + ":" + j]) {
            lightsState[i + ":" + j] = 0;
          }

          lightsState[i + ":" + j] += 2;
          break;
        default:
          console.log("Wrong command");
      }
    }
  }
}

input.split("\n").forEach(function(command, index) {
  var chunks = command.split(" ");
  var coord2 = chunks.pop().split(",");
  chunks.pop(); // through
  var coord1 = chunks.pop().split(",");
  var command = chunks.join(" ");

  execute(coord1, coord2, command);
})

var result = 0

Object.keys(lightsState).forEach(function(coord, index) {
  result += lightsState[coord];
});

console.log(result);
