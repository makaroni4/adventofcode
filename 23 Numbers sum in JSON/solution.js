var fs = require("fs");
var input = fs.readFileSync("input").toString().trim();

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isPlainObject(o) {
   return ((o === null) || Array.isArray(o) || typeof o == 'function') ?
           false
          :(typeof o == 'object');
}

function readJSON(json) {
  if(isNumeric(json)) {
    result += parseInt(json);
    return;
  }

  if(Array.isArray(json)) {
    json.forEach(function(el) {
      readJSON(el);
    })
  }

  if(isPlainObject(json)) {
    Object.keys(json).forEach(function(key) {
      readJSON(json[key]);
    })
  }

  return;
}

var result = 0;

input = JSON.parse(input);

readJSON(input);

console.log(result);
