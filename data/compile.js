var fs = require('fs');

var scales = JSON.parse(fs.readFileSync('scales.json', 'utf8'));
var codage = JSON.parse(fs.readFileSync('codage.json', 'utf8'));
var combin = JSON.parse(fs.readFileSync('combin.json', 'utf8'));
var data = {};

function writeData() {
  var content = "var data = " + JSON.stringify(data, null, '  ');
  fs.writeFile("data.js", content, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The data.js file is successfully compiled!");
  })
};

writeData();