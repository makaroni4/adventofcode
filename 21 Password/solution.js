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

  input = input.replaceAt(index, alphabet[input[index].charCodeAt(0) - 96]);

  return input;
}

for (var i = 0; i < 100; i++) {
  input = incrementPassword(input);
  console.log(input);
}
