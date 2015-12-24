var fs = require("fs");

var totalWeight = 0;
var weights = fs.readFileSync("input").toString().trim().split("\n").map(function (weight) {
  totalWeight += parseInt(weight);
  return parseInt(weight);
});

var totalSum = weights.reduce(function(pv, cv) { return pv + cv; }, 0);
var groupSum = totalSum / 3;

var combine = function(a, min, max) {
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
  for (var i = min; i <= max; i++) {
    fn(i, a, [], all);
  }

  return all;
}

// var oneGroupCombinations = combine(weights, 1, weights.length - 2);
var oneGroupCombinations = combine(weights, 7, 8);
console.log("combos done")

oneGroupCombinations = oneGroupCombinations.filter(function (combo) {
  var sum = combo.reduce(function(pv, cv) { return pv + cv; }, 0);
  return sum === groupSum;
}).map(function (combo) {
  return combo.sort(function (a, b) {
    return a - b;
  })
});

// console.log(oneGroupCombinations)
// console.log(oneGroupCombinations.length)
var possibleGroups = [];

oneGroupCombinations.forEach(function (combo1, i) {
  possibleGroups[i] = [];

  oneGroupCombinations.forEach(function (combo2, j) {
    if(i === j) {
      return;
    }

    // if(combo1[combo1.length - 1] < combo2[0] || combo2[combo2.length - 1] < combo1[0]) {
    //   possibleGroups[i].push(j);
    //   return;
    // }

    if(combo1[0] === combo2[0]) {
      return;
    }

    var combo2fits = true;

    var ii = 0;
    while(combo2fits && ii < combo1.length) {
      var el = combo1[ii];
      var jj = 0;
      // console.log("ii " + ii)

      while(combo2fits && jj < combo2.length) {
        // console.log("jj " + jj)
        if(combo2[jj] === el) {
          combo2fits = false;
          break;
        }
        jj++;
      }
      ii++;
    }

    if(combo2fits) {
      possibleGroups[i].push(j);
    }
  });
});

console.log("possible minGroupSize done")
// console.log(possibleGroups);

var resultGroups = [];
var resultCombos = {};

function quantumEnt(combo) {
  return combo.reduce(function(pv, cv) { return pv * cv; }, 1);
}

oneGroupCombinations.forEach(function (combo1, i) {
  possibleGroups[i].forEach(function(j) {
    if(possibleGroups[j].indexOf(i) === -1) {
      return;
    }

    possibleGroups[j].forEach(function(k) {
      if(possibleGroups[i].indexOf(k) === -1 ||
          possibleGroups[k].indexOf(i) === -1 ||
          possibleGroups[k].indexOf(j) === -1) {
        return;
      }

      resultCombos[i] = true;
      resultCombos[j] = true;
      resultCombos[k] = true;

      console.log(quantumEnt(oneGroupCombinations[i]))
      console.log(quantumEnt(oneGroupCombinations[j]))
      console.log(quantumEnt(oneGroupCombinations[k]))

      resultGroups.push([i, j, k]);

      // console.log([
      //   combo1.join(" "),
      //   oneGroupCombinations[j].join(" "),
      //   oneGroupCombinations[k].join(" ")
      // ].join(", "))
    })
  })
});

// console.log(resultCombos)

var sortCombos = Object.keys(resultCombos).sort(function (a, b) {
  return oneGroupCombinations[a].length - oneGroupCombinations[b].length;
});

var minGroupSize = oneGroupCombinations[sortCombos[0]].length;
var minCombos = sortCombos.filter(function(combo) {
  return oneGroupCombinations[combo].length === minGroupSize;
})

var sortedMinCombos = minCombos.map(function(comboId) {
  return quantumEnt(oneGroupCombinations[comboId]);
}).sort(function(a, b) {
  return a - b;
});

console.log(sortedMinCombos)

// console.log(weights)
// console.log(resultGroups)




