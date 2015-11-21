"use strict";

var fs = require('fs');

/* init src data */

var scales = JSON.parse(fs.readFileSync('scales.json', 'utf8'));
var codage = JSON.parse(fs.readFileSync('codage.json', 'utf8'));

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

/* get balance factor between right and left keyboard */

function balance(code) {
  var length = code.length;
  var odd = 0;
  for (var value of code) {
    if (value > 11) {
      odd += 1;
    };
  };
  return Math.abs(0.5 - (length - odd - 1)/(length-1));
};

/* match depreciated intervals */

function balance2(code) {
  return getIntervals(code).some(function(value){return value===1});
};

/* add combinations to data */

function addCombinationsToData() {
  for (var category in data.scales) {
    for (var scale in data.scales[category]) {
      var arr = data.scales[category][scale].slice(0);
      var code = codeIntervals(arr);
      var magic = [
        [0,13,14,3,4,17,6,7,20,21,10,11,24],
        [0,13,14,3,4,17,18,7,20,21,10,11,24]
      ];
      var nb_result = code.some(function(i){return i === 6}) ? 2 : 1;
      var result = (nb_result === 2) ? [[],[]] : [[]];
      for (var interval of code) {
        result[0].push(magic[0][interval]);
        if (nb_result === 2) {
          result[1].push(magic[1][interval]);
        };
      };
      if (nb_result === 2) {
        var b = [balance(result[0]),  balance(result[1]),
                 balance2(result[0]), balance2(result[1])];
        if (scale==="Hexa-lydien") {console.log(b)};
        if (b[0] > b[1] || (b[0] === b[1] && b[2] && !b[3])) {
          result = [result[1], result[0]];
        };
      };
      console.log(result.length + " combinations for " + scale + " (" + category + ")");
      data.scales[category][scale] = {
        intervals:  arr,
        variations: result
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