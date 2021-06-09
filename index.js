var g = graphs.simple
const loops = 100

main()

function main() {
  setNeighbors(g)
  setGraph()
  renderGraph(g)

  populations.push(population(g))
  for(var i=0; i < loops; i++) {
    randomMutate(g)
  }
  console.log(g)
  console.log(populations)

  setTable()
  renderTable(populations)
}
