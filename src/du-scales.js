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
    .append("li");

categories
  .append("div").text(function(d){return d.key + ' (' + d.values.length + ')'})
  .on("click", toggleCategory)

var scales = categories
  .append("ul")
  .selectAll("li")
    .data(function(d){return d.values})
  .enter()
    .append("li")
    .text(function(d){return d.name[0]})
    .on("click", toggleScale);

var openCategory = false;

function toggleCategory(d,i) {
  var li = d3.select(this.parentNode);
  if (!li.classed("current"))
  {        
    d3.select(".current").classed("current", false);
    li.classed("current", true);
    openCategory = true;
  }
  else if (d3.mouse(this.parentNode.childNodes[1])[1] < 0)
  {
    li.classed("current", false);
    openCategory = false;
  }
  deviceEscape();
}

function deviceEscape() {
  content.classed("escape", openCategory);
}

content.on("click", function(){
  var w = Math.min.apply(null, [window.innerWidth, screen.width]);
  if (content.classed("escape") && w <= 800) {
    d3.select(".current").classed("current", false)
    content.classed("escape", false);
  };
});

function toggleScale(d,i) {
  if (!d3.select(this).classed("selected")) {
    /*window.clearInterval(auto);*/
    svg.classed("active", true);
    d3.select(".selected").classed("selected",false);
    d3.select(this).classed("selected", true);
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

function range(i, r) {
  r = r || 24;
  i = (i - transpo) % r;
  return (i >= 0) ? i : i + r;
};

function range2(i) {
  i = (i - transpo)%48;
  return (i >= 0) ? i : i + 48;
};

function headache(i) {
  var res = (i > 13 && i < 38)
    ? (range(i) <= 11)
    : (range(i) > 11)
  res = (transpo > 13) ? !res : res;
  return res;
}
    
function lighten(d,i) {
  var st = (headache(i)) ? "touch odd " : "touch ";
  var sc = currScale.dualo_code[variation];
  return (range(i) === 0)
    ? st + "orange"
    : (sc.indexOf(range(i)) != -1)
      ? st + "green"
      : st;
};

function keys(d,i) {
  i = (notes === "interval") ? range(i) : i%24; 
  return data.keyboard[notes][i];
};

function transpose(d,i) {
  if (category != "") {
    transpo = i%24;
    update();
    newTitle();
  };
};

function newTitle() {
  title.text(currScale.name[0] +" en "+ data.keyboard["usual"][transpo]);
};

function update(){
  touch.attr("class", lighten);
  text.text(keys);
};

/*var ica = 0;
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
};*/