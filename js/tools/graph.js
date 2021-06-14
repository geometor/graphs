var graph
var nodes
var links
var labels


var simulation
var margin = {top: 10, right: 30, bottom: 30, left: 40},
  width = 400 - margin.left - margin.right,
  height = 200 - margin.top - margin.bottom;

function setGraph() {
  // set the dimensions and margins of the graph

  // append the svg object to the body of the page
  graph = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
} 

function renderGraph(g) {
  var gLinks = g.E.map( e => {return {source: e[0], target: e[1]}} )
  links = graph.append('g').classed('edges', true)
    .selectAll("line")
    .data(gLinks)
    .enter()
    .append("line")
    .attr("id", d => d.source + d.target)

  var gKeys = Object.keys(g.V)

  var gNodes = gKeys.map( k => {return {id: k}} )
  nodes = graph.append('g').classed('vertices', true)
    .selectAll("circle")
    .data(gNodes)
    .enter()
    .append("circle")
    .attr("r", 20)
    .attr("id", d => d.id )
    .on("mouseover", nodeMouseOver)
    .on("mouseout", nodeMouseOut)
    .on("click", nodeClicked)
  // .append("title")
  // .text( d => d.id );
  

  labels = graph.append("g").classed('labels', true)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(gNodes)
    .enter().append("text")
    .attr("dy", "3")
    .attr("id", d => "l-" + d.id )
    .text( d => d.id );

  simulation = d3.forceSimulation(gNodes)                 
    .force("link", d3.forceLink()                               
      .id( d => d.id )                     
      .links(gLinks)                                    
    )
    .force("charge", d3.forceManyBody().strength(-400))        
    .force("center", d3.forceCenter(width / 2, height / 2))   
    .on("tick", ticked);
}

function ticked() {
  links
    .attr("x1", d => d.source.x )
    .attr("y1", d => d.source.y )
    .attr("x2", d => d.target.x )
    .attr("y2", d => d.target.y );

  nodes
    .attr("cx", d => d.x+0 )
    .attr("cy", d => d.y-0 );

  labels
    .attr("x", d => d.x )
    .attr("y", d => d.y )
}

function nodeClicked() {
  d3.select(this).classed("focus", d3.select(this).classed("focus") ? false : true);

  var labelId = "#l-" + this.id
  d3.select(labelId).classed("focus", d3.select(labelId).classed("focus") ? false : true);
  
  s(g.V[this.id])
  renderTable(populations)
}

function nodeMouseOver(d, i) {  
  // d3.select(this).classed("focus", true);

  // Specify where to put label of text
  // svg.append("text").attr({
    // id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
    // x: function() { return xScale(d.x) - 30; },
    // y: function() { return yScale(d.y) - 15; }
  // })
    // .text(function() {
      // return [d.x, d.y];  // Value of the text
    // });
}

function nodeMouseOut(d, i) {
  // d3.select(this).classed("focus", false);

  // Select text by id and then remove
  // d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
}

function setTable() {
  // set the dimensions and margins of the graph

  // append the svg object to the body of the page
  table = d3.select("#table").append("table")
  thead = table.append('thead')
  var gKeys = Object.keys(g.V)
  thead.append('tr')
    .selectAll('th')
    .data(gKeys)
    .enter()
    .append('th')
    .text(d => d);
  tbody = table.append('tbody');
} 

function renderTable(c) {

  var rows = tbody.selectAll('tr')
    .data(c)
    .enter()
    .insert('tr', ":first-child");

  // create a cell in each row for each column
  var cells = rows.selectAll('td')
    .data(d => d)
    .enter()
    .append('td')
    .text(d => d);
}
