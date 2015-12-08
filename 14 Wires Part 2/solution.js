var fs = require("fs");
var operations = fs.readFileSync("input").toString().trim().split("\n");

var inputs = {}
var signals = {}

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

  inputs[output] = {
    operands: operands,
    command: command
  };
});

function getOperandValue(operand) {
  if(operand.match(/^\d+$/)) {
    return parseInt(operand);
  } else if(operand.match(/^[a-z]+$/)) {
    return signals[operand];
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function calculateSignals() {
  Object.keys(inputs).forEach(function(key, index) {
    var inputData = inputs[key];
    var operands = inputData.operands.map(function(el, index) {
      return getOperandValue(el);
    });

    if(operands.every(function(n) { return isNumeric(n); })) {
      switch(inputData.command) {
        case null:
          signals[key] = operands[0];
          break;
        case "AND":
          signals[key] = operands[0] & operands[1];
          break;
        case "OR":
          signals[key] = operands[0] | operands[1]
          break;
        case "LSHIFT":
          signals[key] = operands[0] << operands[1]
          break;
        case "RSHIFT":
          signals[key] = operands[0] >> operands[1]
          break;
        case "NOT":
          signals[key] = ~operands[0]
          break;
      }
    }
  });
}

while(Object.keys(signals).length < Object.keys(inputs).length) {
  calculateSignals();
}

console.log(signals["a"]);
