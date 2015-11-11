var fs = require('fs');

/* init src data */

var scales = JSON.parse(fs.readFileSync('src/scales.json', 'utf8'));
var codage = JSON.parse(fs.readFileSync('src/codage.json', 'utf8'));
var combin = JSON.parse(fs.readFileSync('src/combin.json', 'utf8'));

/* init data */

var data = {
  scales    : scales,
  intervals : codage.intervals,
  keyboard  : codage.keyboard
};

/* scale interval first codification */

function codeIntervals(scaleArr) {
  return scaleArr.map(function(value) {
    return codage.intervals[value].code;
  });
};

/* scale combination */

function allCombinations(category, scaleCodeArr) {
  return combin[category].variations.map(function(row) {
    return row.map(function(value, index) {
      return (scaleCodeArr[index] || 12) + value * 12;
    });
  });
};

/* get intervals between values */

function getIntervals(arr) {
  var sorted = arr.sort(function(a, b) {a - b});
  var result = [];
  for (var i = 1; i < sorted.length; i++) {
    result.push(sorted[i] - sorted[i-1]);
  };
  return result;
};

/* exclude combinations */

function isToExclude(category, combination) {
  return getIntervals(combination).some(function(el) {
    return combin[category].exclusions.some(function(ex) {
      return el == ex;
    });
  });
};

/* write data file */

function writeData() {
  var content = "var data = " + JSON.stringify(data, null, '  ');
  fs.writeFile("data.js", content, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The data.js file is successfully compiled!");
  })
};

console.log(getIntervals([0,5,10,15,20,25]));
console.log(isToExclude("5 notes", [2,8,10,11]));
console.log(isToExclude("5 notes", [1,7,10,12]));
console.log(isToExclude("5 notes", [1,7,5,12]));
writeData();