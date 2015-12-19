var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n\n");
    rawReplacements = input[0],
    startingMolecule = input[1];

var replacements = {};

rawReplacements.split("\n").forEach(function (replacement) {
  var array = replacement.split(" => "),
      from = array[0],
      to = array[1];

  if(!replacements[from]) {
    replacements[from] = [];
  }

  replacements[from].push(to);
})

var startingMoleculeChars = startingMolecule.split("");
var startingAtoms = []

startingAtoms = startingMolecule.split(/(?=[A-Z])/);

var newMolecules = {};

startingAtoms.forEach(function (atom, i) {
  var possibleReplacements = replacements[atom];

  if(possibleReplacements && possibleReplacements.length > 0) {
    possibleReplacements.forEach(function (newAtom) {
      var newAtoms = startingAtoms.slice();
      newAtoms[i] = newAtom;

      newMolecules[newAtoms.join("")] = true;
    });
  }
});

console.log(Object.keys(newMolecules).length)

