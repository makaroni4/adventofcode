var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n");

function combinations(elements) {
  var result = [];
  var f = function(prefix, elements) {
    for(var i = 0; i < elements.length; i++) {
      result.push(prefix.concat([elements[i]]));
      f(prefix.concat([elements[i]]), elements.slice(i + 1));
    }
  }
  f([], elements);
  return result;
}

function fillArray(num, size) {
  return Array.apply(null, Array(size)).map(Number.prototype.valueOf, num);
}

function multichoose(k, n) {
  if (k < 0 || n < 0) {
    return false;
  }

  if (k === 0) {
    return [fillArray(0, n)];
  }

  if (n === 0) {
    return [[]];
  }

  if (n === 1) {
    return [[k]];
  }

  var out = [];

  multichoose(k, n - 1).forEach(function(el) {
    el.unshift(0);
    out.push(el);
  });

  multichoose(k - 1, n).forEach(function(el) {
    el[0]++;
    out.push(el);
  });

  return out;
}

function countCalories(mix, ingredients) {
  var calories = 0;

  ingredients.forEach(function(ingredient, index) {
    calories += mix[index] * ingredientProperties[ingredient]["calories"];
  });

  return calories;
}

var ingredientProperties = {};

input.forEach(function (el, i) {
  var array = el.split(/(?:[\:\,]\s)/);

  var ingredient = array.shift();
  ingredientProperties[ingredient] = {};

  array.forEach(function (el) {
    var ingredientParams = el.split(" ");
    ingredientProperties[ingredient][ingredientParams[0]] = parseInt(ingredientParams[1]);
  });
})

function calculateMixScore(mix, ingredients) {
  var mixScore = 1;

  Object.keys(ingredientProperties[ingredients[0]]).forEach(function (property) {
    if (property != "calories") {
      var propertyScore = 0;

      ingredients.forEach(function(ingredient, index) {
        propertyScore += mix[index] * ingredientProperties[ingredient][property]
      });

      if(propertyScore < 0) {
        mixScore = 0;
      } else {
        mixScore *= propertyScore;
      }
    }
  });

  return mixScore;
}

var ingredients = Object.keys(ingredientProperties);
var totalSpoons = 100;

var mixMaxScore = 0;
var mixMaxConfig = []

combinations(ingredients).forEach(function (ingredientsCombination) {
  var possibleMixes = multichoose(totalSpoons, ingredientsCombination.length);

  possibleMixes.forEach(function (possibleMix) {
    if (countCalories(possibleMix, ingredientsCombination) === 500) {
      var mixScore = calculateMixScore(possibleMix, ingredientsCombination);

      if(mixScore > mixMaxScore) {
        mixMaxScore = mixScore;
        mixMaxConfig = [possibleMix, ingredientsCombination];
      }
    }
  })
});

console.log(mixMaxScore)
console.log(mixMaxConfig)
