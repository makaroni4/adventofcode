var fs = require("fs");
var input = parseInt(fs.readFileSync("input").toString().trim());

function countPresents(houseNumber) {
  var count = 0;

  for(var i = 1; i <= houseNumber; i++) {
    if(houseNumber % i === 0 && (houseNumber - 50 * i) <= 0) {
      count += i * 11;
    }
  }

  return count;
}

var houseNumber = 500000;
var presentsCount = countPresents(houseNumber);
while(presentsCount < input) {
  houseNumber++;
  presentsCount = countPresents(houseNumber);
}

console.log(houseNumber);
