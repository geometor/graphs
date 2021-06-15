var G = 'simple'
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
  populations = []

  let g = graphs[G]
  var gKeys = Object.keys(g.V)
  gKeys.forEach ( key => g.V[key].value = 0)
  g.V[gKeys[0]].value = 1    
  //
  let graph = new Graph("#graph")

  populations.push(p())

  let cycles = d3.select("#cycles").node().value
  console.log("cycles: " + cycles)
  for(var i=0; i < cycles; i++) {
    sRandom()
  }

  setTable()
  renderTable(populations)

  const sumPop = populations.map( row => row.reduce( (tot, val) => tot + val ))
  let plot = new Plot("#plot", sumPop)

  Code("#code")

}

function Code(pid) {
  // let select = d3.select("#graphs")
  // G = select.value

  let g = graphs[G]

  var code = d3.select("#code")
  code.node().innerHTML = ''
  var pre = code.append("pre")
  var text = `
${G}: {
  V: {
`
  // let vKeys = Object.keys(g.V)
  // console.log(vKeys)
  // for (var key in vKeys) {

    // text += `
      // ${ key }: { value: ${ g.V[key].value } }`
  // }
  text += "  }"
  text += `
  E: {
`
  text += "  }\n"
  text += "}"

  // pre.text(JSON.stringify(g, null, 2))
  pre.text(text)
  
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


