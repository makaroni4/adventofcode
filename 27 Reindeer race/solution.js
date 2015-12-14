var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n");

var reindeers = {};

input.forEach(function(el, i) {
  var array = el.match(/([a-zA-Z]+) can fly (\d+) km\/s for (\d+) seconds\, but then must rest for (\d+) seconds./);

  reindeers[array[1]] = {
    speed: parseInt(array[2]),
    stamina: parseInt(array[3]),
    rest: parseInt(array[4])
  }
})

function calculateDistance(reindeerName, period) {
  var reindeer = reindeers[reindeerName];
  var fullCycles = Math.floor(period / (reindeer.stamina + reindeer.rest));
  var dist = fullCycles * reindeer.speed * reindeer.stamina;

  var lastSeconds = period % (reindeer.stamina + reindeer.rest);

  dist += reindeer.speed * Math.min(lastSeconds, reindeer.stamina);

  return dist;
}

var period = 2503;
var distances = Object.keys(reindeers).map(function(reindeerName) {
  return [reindeerName, calculateDistance(reindeerName, period)];
})

distances = distances.sort(function(a, b) {
  return b[1] - a[1];
})

console.log(distances);
