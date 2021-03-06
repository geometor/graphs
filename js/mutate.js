var populations = []

// add array to each vertex to hold neighbor relations
// .N = {}
function setNeighbors() {
  var keys = Object.keys(graphs)
  keys.forEach( key => {
    let g = graphs[key]
    g.E.forEach( e => {
      let v0 = g.V[e[0]]
      let v1 = g.V[e[1]]

      if( !v0.N ) { v0.N = [] }
      if( !v1.N ) { v1.N = [] }

      v0.N.push(v1)
      v1.N.push(v0)
    })
  })
}

function sumValue(sum, v) {
  return sum + v.value;
}

function p() {
  return Object.values(graphs[G].V).map( v => v.value )
}

// calls s(v) with random v from g
function sRandom() {
  let g = graphs[G]
  keys = Object.keys(g.V)
  let n = Math.floor((Math.random() * keys.length) + 1) - 1
  let k = keys[n]

  s(k)
}

// mutation function
// parameter
// v = vertex
function s(k) {
  let g = graphs[G]
  console.log(k)
  let v = g.V[k]
  v.value = -v.value
  v.value += v.N.reduce(sumValue, 0)
  populations.push(p())
}
