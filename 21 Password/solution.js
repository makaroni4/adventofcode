var fs = require("fs");
var input = fs.readFileSync("input").toString().trim();

var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

String.prototype.replaceAt = function(index, character) {
  return this.substr(0, index) + character + this.substr(index+character.length);
}

Array.prototype.findIndex = function(callback) {
  for(var i = 0; i < this.length; i++) {
    if(callback(this[i])) {
      return i;
    }
  }

  return -1;
}

function removeBlackListLetters(input) {
  var firstBlacklistLetterIndex = input.split("").findIndex(function(el) {
    return el === "i" || el === "o" || el === "l";
  })

  if(firstBlacklistLetterIndex + 1) {
    var newLetter = alphabet[input[firstBlacklistLetterIndex].charCodeAt(0) - 96];
    input = input.replaceAt(firstBlacklistLetterIndex, newLetter);

    for(i = firstBlacklistLetterIndex + 1; i < input.length; i++) {
      input = input.replaceAt(i, "a");
    }
  }

  return input;
}

function incrementPassword(input) {
  var index = input.length - 1;

  while(input[index] === "z" && index > 0) {
    input = input.replaceAt(index, "a");
    index--;
  }

  var nextChar = alphabet[input[index].charCodeAt(0) - 96];

  return input.replaceAt(index, nextChar);
}

function hasThreeIncreasingLetters(input) {
  var charCodes = input.split("").map(function(el) {
    return el.charCodeAt(0) - 97;
  });

  for(var i = 2; i < charCodes.length; i++) {
    if(charCodes[i] - charCodes[i - 1] === 1 && charCodes[i] - charCodes[i - 2] === 2) {
      return true;
    }
  }

  return false;
}

function hasTwoSameLetters(input) {
  var charCodes = input.split("").map(function(el) {
    return el.charCodeAt(0) - 97;
  });

  var charDifferences = charCodes.slice(1, charCodes.length).map(function(el, index) {
    return el - charCodes[index];
  });

  var seenZeroIndex = null;
  var result = false;

  charDifferences.forEach(function(el, index) {
    if(seenZeroIndex !== null && el === 0 && index > seenZeroIndex + 1) {
      result = true;
      return;
    } else if(el === 0) {
      seenZeroIndex = index;
    }
  })

  return result;
}

function isValidPassword(input) {
  return hasTwoSameLetters(input) && hasThreeIncreasingLetters(input);
}

input = removeBlackListLetters(input);

while(!isValidPassword(input)) {
  input = incrementPassword(input);
}

console.log(input)
