var fs = require("fs");
var operations = fs.readFileSync("input").toString().trim().split("\n");

var inputs = {}

operations.forEach(function(operation) {
  var operation = operation.split(" -> ");
  var output = operation.pop();
  var command = operation[0].match(/[A-Z]+/);

  if(command) {
    command = command[0];
  } else {
    command = null;
    // lx -> a
    // 0 -> c
    // 1674 -> b
  }

  var operands = operation[0].split(command).map(function(el) {
    return el.trim();
  }).filter(function(el) {
    return el !== "";
  })

  console.log(operands)
  console.log(command)
  console.log(output)
});
