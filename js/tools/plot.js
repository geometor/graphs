/**
 * set d3 plot
 *
 * @param {str} pid - css selector string
 * @param {Array} d - an array of data values
 */
function Plot(pid, d) {
  const inset = 20  
  const parent = d3.select(pid)
  parent.node().innerHTML = ''
  const width = parent.node().getBoundingClientRect().width 
  const height = parent.node().getBoundingClientRect().height
  const plotWidth = width - (2 * inset)
  const plotHeight = height - (2 * inset)

  var data = d

  const svg = parent.append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height )

  const plot = svg.append("g").classed("plot", true)
    .attr("transform", `translate(${inset},${inset})`)

  const xExtents = d3.extent(data)
  xExtents[0] -= 1
  xExtents[1] += 1

  const xScale = d3.scaleLinear()
    .domain(xExtents).nice()
    .range([0, plotWidth])

  const axisX = plot.append("g").classed("axis x", true)
    .attr("transform", `translate(0,${plotHeight})`)
    .call(d3.axisBottom(xScale).ticks(5))

  // var axisY = svg.append("g").classed("axis y", true)
    // .call(yAxis);

  // var grid = svg.append("g").classed("grid", true)
    // .call(grid);

  const yScale = d3.scaleBand()
    .domain(data.keys())
    .range([plotHeight, 0])

  const pins = plot.append("g").classed("pins", true)
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", 3)
    .attr("cx", d => xScale(d))
    .attr("cy", (d, i) => yScale(i))
    .attr("fill", "white")
}

