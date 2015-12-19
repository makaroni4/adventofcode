var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n");
var containers = input.map(function (container) {
  return parseInt(container);
});
var TOTAL_VOLUME = 150;

var combine = function(a, min) {
  var fn = function(n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  }
  var all = [];
  for (var i = min; i < a.length; i++) {
    fn(i, a, [], all);
  }

  all.push(a);

  return all;
}

function isValidCombo(combo) {
  var volume = combo.reduce(function (prev, curr, index, array) {
    return prev + curr;
  });

  return volume === TOTAL_VOLUME;
}

var containersCombos = combine(containers, 0);
var validCombos = containersCombos.filter(function (combo) {
  return isValidCombo(combo);
})

var validCombos = validCombos.sort(function (a, b) {
  return a.length - b.length;
})

var smallestComboSize = validCombos[0].length;

var smallestCombos = validCombos.filter(function (combo) {
  return combo.length === smallestComboSize;
})

console.log(smallestCombos.length);
