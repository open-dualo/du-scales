var navig = d3.select("#navigation"),
    content = d3.select(".content"),
    svg  =  content.select("svg").select(".gkeyboard"),
    title = content.select("h2");
    
var notes = "usual",
    category = "5 notes",
    currScale = "Chinoise (première forme)";
    
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
    .attr("fill", lighten);

var text = touch
  .append("text")
    .attr("class", "notation")
    .attr("x", function(d) {return d.x})
    .attr("y", function(d,i) {return d.y + 3})
    .text(keys);

var categories = navig
  .selectAll("li")
    .data(d3.entries(data.scales))
  .enter()
    .append("li")
    .text(function(d){return d.key})
    .on("click", function(d){
      d3.select(".current").classed("current", false);
      d3.select(this).classed("current", true);
    })
    .append("ul");

var scales = categories
  .selectAll("li")
    .data(function(d){return d3.keys(d.value)})
  .enter()
    .append("li")
    .text(function (d){return d})
    .on("click", toggleScale);

function toggleScale(d,i) {
  d3.select(".selected").classed("selected",false);
  d3.select(this).classed("selected", true);
  transpo = 1;
  variation = 0;
  category = this.parentNode.parentNode.__data__.key;
  currScale = d;
  update();
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
  var sc = data.scales[category][currScale].variations[variation];
  return (range(i) == 0)
    ? "url(#prime)"
    : (sc.indexOf(range(i)) != -1)
      ? "url(#lighten)"
      : "url(#unlighten)";
};

function keys(d,i) {
  return data.keyboard[notes][i%24];
};

function transpose(d,i) {
  transpo = i%24;
  update();
};

function newTitle() {
  title.text("Gamme "+ currScale +" en "+ keys(null, transpo));
};

function update(){
  text.text(keys);
  hexa.attr("fill", lighten);
  newTitle();
};

newTitle();
