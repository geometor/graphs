// var graph
// var nodes
// var links
// var labels

// var simulation
// var margin = {top: 10, right: 30, bottom: 30, left: 40},
  // width = 400 - margin.left - margin.right,
  // height = 200 - margin.top - margin.bottom;

/**
 * setup d3 graph
 *
 */
function Graph(pid) {
  let g = graphs[G]
  console.log("G: " + G)
  const inset = 20
  const parent = d3.select(pid)
  parent.node().innerHTML = ''
  const width = parent.node().getBoundingClientRect().width - inset
  console.log(width)
  const height = parent.node().getBoundingClientRect().height - inset
  const plotWidth = width - (2 * inset)
  const plotHeight = height - (2 * inset)

  var data = g

  const svg = parent.append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height )

  const graph = svg.append("g").classed("graph", true)
    .attr("transform", `translate(${inset},${inset})`)

  var gLinks = graphs[G].E.map( e => {return {source: e[0], target: e[1]}} )
  const links = graph.append('g').classed('edges', true)
    .selectAll("line")
    .data(gLinks)
    .enter()
    .append("line")
    .attr("id", d => d.source + d.target)

  var gKeys = Object.keys(g.V)

  const gNodes = gKeys.map( k => {return {id: k}} )
  const nodes = graph.append('g').classed('vertices', true)
    .selectAll("circle")
    .data(gNodes)
    .enter()
    .append("circle")
    .attr("r", 15)
    .attr("id", d => d.id )
    .on("mouseover", nodeMouseOver)
    .on("mouseout", nodeMouseOut)
    .on("click", nodeClicked)
  // .append("title")
  // .text( d => d.id );

  const labels = graph.append("g").classed('labels', true)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(gNodes)
    .enter().append("text")
    .attr("dy", "5")
    .attr("id", d => "l-" + d.id )
    .text( d => d.id );

  const simulation = d3.forceSimulation(gNodes)
    .force("link", d3.forceLink()
      .id( d => d.id )
      .links(gLinks)
    )
    .force("charge", d3.forceManyBody().strength(-400))
    .force("center", d3.forceCenter(plotWidth / 2, plotHeight / 2))
    .on("tick", ticked.bind(this));

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
}
function setGraph() {
  // set the dimensions and margins of the graph

  // append the svg object to the body of the page
  // graph = d3.select("#graph").append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    // .append("g")
    // .attr("transform",
      // "translate(" + margin.left + "," + margin.top + ")");
}

function renderGraph(g) {
}

// function ticked() {
  // this.links
    // .attr("x1", d => d.source.x )
    // .attr("y1", d => d.source.y )
    // .attr("x2", d => d.target.x )
    // .attr("y2", d => d.target.y );

  // this.nodes
    // .attr("cx", d => d.x+0 )
    // .attr("cy", d => d.y-0 );

  // this.labels
    // .attr("x", d => d.x )
    // .attr("y", d => d.y )
// }

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
