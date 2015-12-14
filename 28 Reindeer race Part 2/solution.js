var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n");

var reindeers = {};

input.forEach(function (el, i) {
  var array = el.match(/([a-zA-Z]+) can fly (\d+) km\/s for (\d+) seconds\, but then must rest for (\d+) seconds./);

  reindeers[array[1]] = {
    speed: parseInt(array[2]),
    stamina: parseInt(array[3]),
    rest: parseInt(array[4]),
    distance: 0,
    points: 0
  }
})

var time = 0;
function iterateSecond() {
  Object.keys(reindeers).forEach(function (reindeerName) {
    var reindeer = reindeers[reindeerName];
    if(time % (reindeer.stamina + reindeer.rest) < reindeer.stamina) {
      reindeer.distance += reindeer.speed;
    }
  })

  console.log(reindeers)
  time++;
}

function checkLeader() {
  var leader = reindeers[Object.keys(reindeers)[0]];
  Object.keys(reindeers).slice(1, Object.keys(reindeers).length).forEach(function(reindeerName) {
    var reindeer = reindeers[reindeerName];
    if(reindeer.distance > leader.distance) {
      leader = reindeer;
    }
  });

  Object.keys(reindeers).forEach(function (reindeerName) {
    var reindeer = reindeers[reindeerName];
    if(reindeer.distance === leader.distance) {
      reindeer.points++;
    }
  })
}

var period = 2503;
for(var i = 0; i < period; i++) {
  iterateSecond();
  checkLeader();
}


var points = Object.keys(reindeers).map(function (reindeerName) {
  return [reindeerName, reindeers[reindeerName].points];
});

points = points.sort(function(a, b) {
  return b[1] - a[1];
});

console.log(points);

