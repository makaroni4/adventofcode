var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n");

var registers = {
  a: 0,
  b: 0
};

var instructions = input.map(function (row) {
  return row.split(/(?:\s|(?:\,\s))/);
})

var index = 0;
while(instructions[index]) {
  console.log(index)
  var instruction = instructions[index];

  console.log(instruction[0])

  switch(instruction[0]) {
    case "hlf":
      registers[instruction[1]] /= 2;
      index++;
      break;
    case "tpl":
      registers[instruction[1]] *= 3;
      index++;
      break;
    case "inc":
    registers[instruction[1]]++;
      index++;
      break;
    case "jmp":
      index += parseInt(instruction[1]);
      break;
    case "jie":
      if(registers[instruction[1]] > 0 && registers[instruction[1]] % 2 === 0) {
        index += parseInt(instruction[2]);
      } else {
        index++;
      }
      break;
    case "jio":
      if(registers[instruction[1]] === 1) {
        index += parseInt(instruction[2]);
      } else {
        index++;
      }
      break;
  }
}

console.log(registers)
