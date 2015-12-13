var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n");

var gains = {};
var guests = {};

input.forEach(function(el, i) {
  var array = el.split(/(?:\shappiness\sunits\sby\ssitting\snext\sto\s|\swould\s)/),
    from = array[0], rawGain = array[1], to = array[2].replace(".", "");

  var array = rawGain.split(/\s/),
    gainSign = array[0], gainValue = parseInt(array[1]);

  var gain = (gainSign === "gain" ? 1 : -1) * gainValue;

  gains[from + ":" + to] = gain;
  gains[from + ":" + "Me"] = 0;
  guests[from] = 1;
  guests[to] = 1;
})

Object.keys(guests).forEach(function(guest) {
  gains["Me:" + guest] = 0
})
guests["Me"] = 1;

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

function calculateHappiness(array) {
  var results = 0;

  for(i = 0; i < array.length; i++) {
    var j = i === 0 ? array.length - 1 : i - 1;
    var k = i === array.length - 1 ? 0 : i + 1;

    var stepDistance = gains[array[i] + ":" + array[j]] + gains[array[i] + ":" + array[k]];

    results += stepDistance;
  }

  return results;
};

var possibleArrangements = permute(Object.keys(guests));

var lengths = possibleArrangements.map(function(arrangement) {
  return calculateHappiness(arrangement);
})

flengths = lengths.sort(function(a, b) {
  return b - a;
}).filter(function(el) {
  return el > 0;
})

console.log(lengths[0])
