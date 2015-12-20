var fs = require("fs");
var input = parseInt(fs.readFileSync("input").toString().trim());

function countPresents(houseNumber) {
  var count = 0;

  for(var i = 1; i <= houseNumber; i++) {
    if(houseNumber % i === 0) {
      count += i * 10;
    }
  }

  return count;
}

var houseNumber = 650000;
var presentsCount = countPresents(houseNumber);
while(presentsCount < input) {
  houseNumber++;
  presentsCount = countPresents(houseNumber);
}

console.log(houseNumber);
