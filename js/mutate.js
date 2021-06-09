var populations = []

function setNeighbors(g) {
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

function population(g) {
  return Object.values(g.V).map( v => v.value )
}

function randomMutate(g) {
  keys = Object.keys(g.V)
  let n = Math.floor((Math.random() * keys.length) + 1) - 1
  v = g.V[keys[n]]
  mutate(v)
  var lastpop = populations[populations.length-1]
  console.log( keys[n] + " : " + lastpop.toString() )
}

function mutate(v) {
  v.value = -v.value
  v.value += v.neighbors.reduce(sumNeighbors, 0)
  populations.push(population(g))
}
