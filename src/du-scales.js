"use strict";

var navig = d3.select("#navigation"),
    content = d3.select(".content"),
    svg  =  content.select("svg"),
    title = content.select("h2");
    
var notes = "usual",
    category = "",
    currScale = {};
    
var variation = 0, 
    transpo = 1;


var touch = svg
  .selectAll(".touch")
    .data(data.keyboard.coordinates)
  .enter().append("g")
    .attr("class", "touch")
    .on("click", transpose)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);

var hexa = touch
  .append("polygon")
    .attr("class", "hexagon")
    .attr("points", "0,11.547 10,5.774 10,-5.774 0,-11.547 -10,-5.774 -10.000,5.774")
    .attr("transform", function(d,i) {return "translate("+ d.x +","+ d.y +")";})

var text = touch
  .append("text")
    .attr("class", "notation")
    .attr("x", function(d) {return d.x})
    .attr("y", function(d,i) {return d.y + 3})
    .text(keys);

var categories = navig
  .selectAll("li")
    .data(data.scales)
  .enter()
    .append("li")
    .text(function(d){return d.key + ' (' + d.values.length + ')'})
    .on("click", function(d){
      if (!d3.select(this).classed("current")) {        
        d3.select(".current").classed("current", false);
        d3.select(this).classed("current", true);
      }
    })
    .append("ul");

var scales = categories
  .selectAll("li")
    .data(function(d){return d.values})
  .enter()
    .append("li")
    .text(function(d){return d.name[0]})
    .on("click", toggleScale);

function toggleScale(d,i) {
  if (!d3.select(this).classed("selected")) {    
    window.clearInterval(auto);
    d3.select(".selected").classed("selected",false);
    d3.select(this).classed("selected", true);
    transpo = 1;
    variation = 0;
    category = this.parentNode.parentNode.__data__.key;
    currScale = d;
    currScale.index = i;
    update_choices();
    update();
    newTitle();
  };
};

function update_choices() {
  var sc = currScale.dualo_code;
  var choices_data = (sc.length === 2)
    ? [{text: "dessin équilibré",  active: false},
       {text: "dessin alternatif", active: true }]
    : [{text: "dessin unique",     active: false}];
  var choices = d3.select(".buttons_flex").selectAll("div")
    .data(choices_data);
  choices.enter().append("div");
  choices
    .text(function(d) {return d.text})
    .classed("active", function(d) {return d.active})
    .on("click", toggle_choice);
  choices.exit().remove();
};

function toggle_choice(d,i) {
  if (d.active) {
    variation = i;
    update();
    d3.select(".buttons_flex").selectAll("div")
      .classed("active", function(d,j){
        return i!=j;
      })
      .data(function(d,j){
        return [{active: i!=j}];
      })
      .on("click", toggle_choice);
  };
};

function mouseover(d) {
  var dx = -d.x*(0.9-1),
      dy = -d.y*(0.9-1);
  d3.select(this).transition().duration(100)
    .attr("transform","translate("+dx+","+dy+")scale(0.9)");
};

function mouseout(d) {
  d3.select(this)
    .transition().duration(100)
    .attr("transform","translate(0,0)scale(1)")
};

function range(i) {
  i = (i - transpo)%24;
  return (i >= 0) ? i : i + 24;
};
    
function lighten(d,i) {
  if (category === "") {
    return "touch";
  };
  var sc = currScale.dualo_code[variation];
  return (range(i) === 0)
    ? "touch orange"
    : (sc.indexOf(range(i)) != -1)
      ? "touch green"
      : "touch";
};

function keys(d,i) {
  i = (notes === "interval") ? range(i) : i%24; 
  return data.keyboard[notes][i];
};

function transpose(d,i) {
  transpo = i%24;
  update();
  newTitle();
};

function newTitle() {
  title.text(currScale.name[0] +" en "+ data.keyboard["usual"][transpo]);
};

function update(){
  touch.attr("class", lighten);
  text.text(keys);
};

var ica = 0;
var isc = 0;
category  = data.scales[ica].key;
var auto = setInterval(iupdate, 250);

function iupdate(){
  currScale = data.scales[ica].values[isc];
  update();
  isc = (isc + 1) % data.scales[ica].values.length;
  if (isc === 0) {
    ica = (ica + 1) % data.scales.length;
    category  = data.scales[ica].key;
  };
};