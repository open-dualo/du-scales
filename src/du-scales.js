var content = d3.select(".content");

var svg  =  content.select("svg"),
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
    .on("click", function(d,i) {transpose(i);});

var hexa = touch
  .append("polygon")
    .attr("class", "hexagon")
    .attr("points", "0,11.547 10,5.774 10,-5.774 0,-11.547 -10,-5.774 -10.000,5.774")
    .attr("transform", function(d,i) {return "translate("+ d.x +","+ d.y +")";})
    .style("fill", function(d,i){return lighten(i)});

var text = touch
  .append("text")
    .attr("class", "notation")
    .attr("x", function(d) {return d.x})
    .attr("y", function(d,i) {return d.y + 3})
    .text(function(d,i) {return keys(i)});
    
function range(i) {
  i = (i - transpo)%24;
  return (i >= 0) ? i : i + 24;
};
    
function lighten(i) {
  var sc = data.scales[category][currScale].variations[variation];
  return (range(i) == 0)
    ? "#FFC057"
    : (sc.indexOf(range(i)) != -1)
      ? "#80EF80"
      : "#F3F3F3";
};

function keys(i) {
  return data.keyboard[notes][i%24];
};

function transpose(i) {
  transpo = i%24;
  update();
};

function newTitle() {
  title.text("Gamme "+ currScale +" en "+ keys(transpo));
};

function update(){
  text.text(function(d,i){return keys(i)});
  hexa.style("fill", function(d,i){return lighten(i)});
  newTitle();
};

newTitle()