var initialCode = 20151125;
var multiplicator = 252533;
var remainderDivider = 33554393;

var grid = [[initialCode]];
var prevCode = initialCode;
var i = 0;
var j = 1;

var codeRow = 2978;
var codeColumn = 3083;
var codeFound = false;

function nextCode(i, j, prevCode) {
  return prevCode * multiplicator % remainderDivider;
}

while(!codeFound) {
  var ii = 0, jj = j;

  if(!grid[jj]) {
      grid[jj] = []
    }

  var newCode = nextCode(ii, jj, prevCode)
  grid[jj][ii] = newCode;
  prevCode = newCode;

  while(jj > 0) {
    jj--;
    ii++;

    var newCode = nextCode(ii, jj, prevCode)
    grid[jj][ii] = newCode;
    prevCode = newCode;

    if(jj === codeRow - 1 && ii === codeColumn - 1) {
      console.log("Code: " + newCode);
      codeFound = true;
      break;
    }
  }

  j++;
}
