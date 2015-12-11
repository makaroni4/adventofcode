var fs = require("fs");
var input = fs.readFileSync("test_input").toString().trim();

var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

String.prototype.replaceAt = function(index, character) {
  return this.substr(0, index) + character + this.substr(index+character.length);
}

function incrementPassword(input) {
  var index = input.length - 1;

  while(input[index] === "z" && index > 0) {
    input = input.replaceAt(index, "a");
    index--;
  }

  var nextChar = alphabet[input[index].charCodeAt(0) - 96];
  if(nextChar === "i" || nextChar === "o" || nextChar === "l") {
    nextChar = alphabet[input[index].charCodeAt(0) - 95];
  }

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

  for(var i = 1; i < charCodes.length; i++) {
    if(charCodes[i] - charCodes[i - 1] === 0) {
      return true;
    }
  }

  return false;
}
