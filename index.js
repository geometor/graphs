var g = graphs.simple

setNeighbors()
setGraph()
renderGraph(g)

console.log(population())
for(var i=0; i < 100; i++) {
  randomMutate()
}
console.log(g)

function setNeighbors() {
  g.E.forEach( e => {
    let v0 = e[0], v1 = e[1]
    if( !g.V[v0].neighbors ) {
      g.V[v0].neighbors = []
    }
    if( !g.V[v1].neighbors ) {
      g.V[v1].neighbors = []
    }
    g.V[v0].neighbors.push(g.V[v1])
    g.V[v1].neighbors.push(g.V[v0])
  })
}

function sumNeighbors(sum, v) {
  return sum + v.value;
}

function population() {
  return Object.values(g.V).map( v => v.value )
}

function randomMutate() {
  keys = Object.keys(g.V)
  let n = Math.floor((Math.random() * keys.length) + 1) - 1
  v = g.V[keys[n]]
  console.log("mutate " + keys[n])
  mutate(v)
}

function mutate(v) {
  v.value = -v.value
  v.value += v.neighbors.reduce(sumNeighbors, 0)
  console.log(population())
}

function main() {




}
