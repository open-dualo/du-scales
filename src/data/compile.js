"use strict";

var fs = require('fs');

/* init src data */

var scales = JSON.parse(fs.readFileSync('scales.json', 'utf8'));
var codage = JSON.parse(fs.readFileSync('codage.json', 'utf8'));
var combin = JSON.parse(fs.readFileSync('combin.json', 'utf8'));

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

function allCombinations(category, scaleArr) {
  var code = codeIntervals(scaleArr);
  return combin[category].variations.map(function(row) {
    return row.map(function(value, index) {
      return code[index] + value * 12;
    });
  });
};

/* get intervals between values */

function getIntervals(arr) {
  var sorted = arr.slice(0).sort(function(a, b) {return a - b});
  sorted.push(24);
  var result = [];
  for (var i = 1; i < sorted.length; i++) {
    result.push(sorted[i] - sorted[i-1]);
  };
  return result;
};

/* match exclusions */

function isToExclude(category, combination) {
  return getIntervals(combination).some(function(el) {
    return combin[category].exclusions.some(function(ex) {
      return el == ex;
    });
  });
};

/* apply exclusions */

function applyExclusions(category, combinations) {
  var result = [];
  for (var e of combinations) {
    if (!isToExclude(category, e) /*&& !e.some(function(value){return value == 13})*/) {
      result.push(e);
    };
  };
  return result;
};

/* try exclusion for a specific interval */

function tryExclusion(combinations, interval) {
  var result = [];
  for (var e of combinations) {
    if (!getIntervals(e).some(function(value){return value == interval})) {
      result.push(e);
    };
  };
  return result.length > 0 ? result : combinations;
};

/* get final combinations */

function getCombinations(category, scaleArr) {
  var result = allCombinations(category, scaleArr);
  result = applyExclusions(category, result);
  result = tryExclusion(result, 6);
  result = tryExclusion(result, 5);
  result = tryExclusion(result, 2);
  /*result = tryExclusion(result, 1);*/
  return result;
};

/* add combinations to data */

function addCombinationsToData() {
  for (var category in data.scales) {
    for (var scale in data.scales[category]) {
      var arr = data.scales[category][scale].slice(0);
      var combinations = getCombinations(category, arr);
      console.log(combinations.length + " combinations for " + scale + " (" + category + ")");
      data.scales[category][scale] = {
        intervals:  arr,
        variations: combinations
      };
    };
  };
};

/* write data file */

function writeData() {
  var content = "var data = " + JSON.stringify(data, null, 2) + ";";
  fs.writeFile("data.js", content, function(err) {
    if(err) {
      return console.log(err);
    };
    console.log("The data.js file is successfully compiled!");
  });
};

/* compilation */

addCombinationsToData();
writeData();