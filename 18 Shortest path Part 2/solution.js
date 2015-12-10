var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n");

var distances = {};
var cities = {};

input.forEach(function(el, i) {
  var array = el.split(/(?:\sto\s|\s\=\s)/),
    from = array[0], to = array[1], distance = parseInt(array[2]);

  distances[from + ":" + to] = distance;
  distances[to + ":" + from] = distance;
  cities[from] = 1;
  cities[to] = 1;
})

var permArr = [],
    usedChars = [];

function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }

  return permArr;
};

function calculateLength(array) {
  var results = 0;

  for(i = 1; i < array.length; i++) {
    var stepDistance = distances[array[i] + ":" + array[i - 1]];

    if(stepDistance) {
      results += distances[array[i] + ":" + array[i - 1]];
    } else {
      return -1;
    }
  }

  return results;
};

var possibleRoutes = permute(Object.keys(cities));

var lengths = possibleRoutes.map(function(route) {
  return calculateLength(route);
})

lengths = lengths.sort(function(a, b) {
  return b - a;
}).filter(function(el) {
  return el > 0;
})

console.log(lengths[0])
