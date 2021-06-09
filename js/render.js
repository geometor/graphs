var graph
var chart
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
  links = graph
    .selectAll("line")
    .data(gLinks)
    .enter()
    .append("line")

  var gKeys = Object.keys(g.V)
  var gNodes = gKeys.map( k => {return {id: k}} )
  nodes = graph
    .selectAll("circle")
    .data(gNodes)
    .enter()
    .append("circle")
    .attr("r", 20)
    // .append("title")
    // .text( d => d.id );
  

  labels = graph.append("g")
    .selectAll("text")
    .data(gNodes)
    .enter().append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .attr("dy", "5")
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

function setTable() {
  // set the dimensions and margins of the graph

  // append the svg object to the body of the page
  table = d3.select("#table").append("table")
} 

function renderTable(c) {
  // var thead = table.append('thead')
  var	tbody = table.append('tbody');

  // append the header row
  // thead.append('tr')
    // .selectAll('th')
    // .data(columns).enter()
    // .append('th')
    // .text(function (column) { return column; });

  // create a row for each object in the data
  var rows = tbody.selectAll('tr')
    .data(c)
    .enter()
    .append('tr');

  // create a cell in each row for each column
  var cells = rows.selectAll('td')
    .data(d => d)
    .enter()
    .append('td')
    .text(d => d);
}
