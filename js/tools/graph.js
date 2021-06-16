/**
 * setup d3 graph in a parent element 
 *
 * @param {string} pid - css selector for parent element
 */
function Graph(pid) {
  let g = graphs[G]
  const inset = 20
  const parent = d3.select(pid)
  parent.node().innerHTML = ''
  const width = parent.node().getBoundingClientRect().width - inset
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

