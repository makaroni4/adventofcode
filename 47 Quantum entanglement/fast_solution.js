// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});



function deepClone(source) {
  return JSON.parse(JSON.stringify(source));
}


var fs = require("fs");

var totalWeight = 0;
var weights = fs.readFileSync("input").toString().trim().split("\n").map(function (weight) {
  totalWeight += parseInt(weight);
  return parseInt(weight);
}).sort(function(a, b) {
  return b - a;
});

var lengthGroupWeights = {}
var oneGroupCombinations = []
var oneGroupCombinationsKeys = {};

function populateSubset(data, fromIndex, stack, stacklen, target) {
    if (target == 0) {
      // exact match of our target. Success!
      // console.log(Arrays.copyOf(stack, stacklen));
      var combo = stack.slice(0, stacklen).sort(function(a, b) { return a - b; });
      oneGroupCombinations.push(combo);
      if(!lengthGroupWeights[combo.length]) {
        lengthGroupWeights[combo.length] = [];
      }
      lengthGroupWeights[combo.length].push(combo);

      var comboKey = combo.join(":");
      oneGroupCombinationsKeys[comboKey] = true;
      return;
    }

    while (fromIndex < data.length && data[fromIndex] > target) {
        // take advantage of sorted data.
        // we can skip all values that are too large.
        fromIndex++;
    }

    while (fromIndex < data.length && data[fromIndex] <= target) {
        // stop looping when we run out of data, or when we overflow our target.
        stack[stacklen] = data[fromIndex];
        populateSubset(data, fromIndex + 1, stack, stacklen + 1, target - data[fromIndex]);
        fromIndex++;
    }
}

populateSubset(weights, 0, [], 0, totalWeight / 3);

function quantumEntanglement(combo) {
  return combo.reduce(function(pv, cv) { return pv * cv; }, 1);
}

function findGroupsForCombo(combo1) {
  var i = 0;
  while(!oneGroupCombinations[i].equals(combo1)) {
    i++;
  }

  var j = 0;
  var combo1Works = false;

  while(j < oneGroupCombinations.length && !combo1Works) {
    if(i === j) {
      j++;
    }

    var combo2 = oneGroupCombinations[j];

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

    // console.log("Combo2 for " + combo1 + " : " + combo2fits);

    if(combo2fits) {
      var restKeys = [];

      weights.forEach(function(weight) {
        if(combo1.indexOf(weight) === -1 && combo2.indexOf(weight) === -1) {
          restKeys.push(weight);
        }
      })

      var restComboKey = restKeys.sort(function(a, b) { return a - b; }).join(":");

      if(oneGroupCombinationsKeys[restComboKey]) {
        console.log(combo1)
        console.log(combo2)
        console.log(restKeys.sort(function(a, b) { return a - b; }))

        combo1Works = true;

        return true;
      }
    }

    j++;
  }

  return combo1Works;
}

var combosLenghts = Object.keys(lengthGroupWeights);

combosLenghts = combosLenghts.sort(function(a, b) {
  return a - b;
})

var winnerFound = false;
combosLenghts.forEach(function(comboLength) {
  if(winnerFound) {
    return false;
  }
  // console.log(comboLength);
  // console.log("Combos: " + lengthGroupWeights[comboLength].length);

  var sortedCombos = lengthGroupWeights[comboLength].sort(function(a, b) {
    return quantumEntanglement(a) - quantumEntanglement(b);
  })

  sortedCombos.forEach(function(combo1) {
    if(winnerFound) {
      return false;
    }

    // console.log(combo1)
    // console.log(findGroupsForCombo(combo1))
    if(findGroupsForCombo(combo1)) {
      winnerFound = true;
      console.log("WINNER: " + combo1 + ", quantumEnt: " + quantumEntanglement(combo1));
      return false;
    }
  })

  // console.log(sortedCombos[0]);
})

