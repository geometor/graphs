var g = graphs.simple
const loops = 100

main()

function main() {
  d3.select("#code").append("pre").text(JSON.stringify(g, null, 2))
  setNeighbors(g)
  setGraph()
  renderGraph(g)

  populations.push(p(g))
  for(var i=0; i < loops; i++) {
    sRandom(g)
  }
  console.log(g)
  console.log(populations)

  setTable()
  renderTable(populations)

  const sumPop = populations.map( row => row.reduce( (tot, val) => tot + val ))
  let plot = new Plot("#plot", sumPop)

}


