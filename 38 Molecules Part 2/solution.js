var fs = require("fs");
var input = fs.readFileSync("input").toString().trim().split("\n\n");
    rawReplacements = input[0],
    finalMolecule = input[1];

var rewerseReplacements = {};

rawReplacements.split("\n").forEach(function (replacement) {
  var array = replacement.split(" => "),
      from = array[0],
      to = array[1];

  rewerseReplacements[to] = from;
})

var replacementsIterations = {};

function iterate(startingMolecule, iteration) {
  console.log(replacementsIterations["e"])

  if(startingMolecule === "e") {
    if(replacementsIterations["e"] > iteration) {
      replacementsIterations["e"] = iteration;
    }

    return false;
  }

  if(replacementsIterations[startingMolecule] && replacementsIterations[startingMolecule] >= iteration) {
    return false;
  }

  Object.keys(rewerseReplacements).forEach(function (rewerseReplacement) {
    if(startingMolecule.indexOf(rewerseReplacement) > -1) {
      var prevMolecule = startingMolecule.replace(rewerseReplacement, rewerseReplacements[rewerseReplacement]);

      if(replacementsIterations[prevMolecule]) {
        if(replacementsIterations[prevMolecule] > iteration) {
          return false;
        } else {
          replacementsIterations[prevMolecule] = iteration;

          iterate(prevMolecule, iteration + 1);
        }
      }

      replacementsIterations[prevMolecule] = iteration;

      iterate(prevMolecule, iteration + 1);
    }
  });
}

iterate(finalMolecule, 1);

console.log(replacementsIterations["e"]);
