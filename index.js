var G = ''
const loops = 100

main()

function main() {
  setGraphSelect()
  setNeighbors()

  let select = d3.select("#run")
  select
    .on("click", () => { run() });

  let cycles = d3.select("#cycles")
  cycles.node().value = loops

  run()
}

function run() {
  let g = graphs[G]

  // reset values in vertices
  var gKeys = Object.keys(g.V)
  gKeys.forEach ( key => g.V[key].value = 0)
  g.V[gKeys[0]].value = 1    
  // reset population
  populations = []
  populations.push(p())
  
  let graph = new Graph("#graph")

  let cycles = d3.select("#cycles").node().value
  console.log("cycles: " + cycles)
  for(var i=0; i < cycles; i++) {
    sRandom()
  }

  let table = new Table("#table", populations)

  const sumPop = populations.map( row => row.reduce( (tot, val) => tot + val ))
  let plot = new Plot("#plot", sumPop)

  Code("#code")
}

function setGraphSelect() {
  let select = d3.select("#graphs")
  select
    .on("change", (d) => {
      G = document.getElementById("graphs").value
      console.log(G)
      run()
    })

  let keys = Object.keys(graphs)
  select.selectAll("option")
    .data(keys)
    .enter()
    .append("option")
    .attr("value", (d) => d )
    .text( (d) => d )

  select.node().value = keys[0]
  G = keys[0]
}


