function permutations_with_repetitions (array, length) {
  if(array.length === 0 || length === 0) {
    return [[]];
  }

  var res = [];

  array.forEach(function (el) {
    var subArrays = permutations_with_repetitions(array, length - 1);

    var result = subArrays.forEach(function (subArray) {
      subArray.unshift(el)
      res.push(subArray);
    })
  })

  return res;
}
