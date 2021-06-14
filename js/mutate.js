var populations = []

// add array to each vertex to hold neighbor relations
// .N = {}
function setNeighbors(g) {
  g.E.forEach( e => {
    let v0 = g.V[e[0]],
        v1 = g.V[e[1]]

    if( !v0.N ) { v0.N = [] }
    if( !v1.N ) { v1.N = [] }
    
    v0.N.push(v1)
    v1.N.push(v0)
  })
}

function sumValue(sum, v) {
  return sum + v.value;
}

function p(g) {
  return Object.values(g.V).map( v => v.value )
}

// calls s(v) with random v from g
function sRandom(g) {
  keys = Object.keys(g.V)
  let n = Math.floor((Math.random() * keys.length) + 1) - 1
  v = g.V[keys[n]]
  
  s(v)

  var lastpop = populations[populations.length-1]
  console.log( keys[n] + " : " + lastpop.toString() )
}

// mutation function
// parameter
// v = vertex
function s(v) {
  v.value = -v.value
  v.value += v.N.reduce(sumValue, 0)
  populations.push(p(g))
}
