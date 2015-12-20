// Works only for test cases, infinitely long :)

var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n\n");
    rawReplacements = input[0],
    finalMolecule = input[1];

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

function getPossibleMolecules(startingMolecule) {
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

  return Object.keys(newMolecules);
}

var moleculeFound = false;
var startingMolecules = {e: true};
var iteration = 0;
var seenMolecules = {}

while(!moleculeFound) {
  iteration++;
  console.log("ITERATION: " + iteration)
  var iterationMolecules = {};

  Object.keys(startingMolecules).forEach(function (startingMolecule) {
    if(!seenMolecules[startingMolecule]) {
      seenMolecules[startingMolecule] = true;

      var newMolecules = getPossibleMolecules(startingMolecule);
      newMolecules.forEach(function (molecule) {
        iterationMolecules[molecule] = true
      })
    }
  });

  Object.keys(iterationMolecules).forEach(function (molecule) {
    if(molecule === finalMolecule) {
      moleculeFound = true;
    }
  })

  startingMolecules = iterationMolecules;
}
