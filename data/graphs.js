const graphs = {

  triad: {
    V: { 
      a: { value: 1 },
      b: { value: 0 },
      c: { value: 0 },
    },
    E: [
      [ "a", "b" ],
      [ "b", "c" ],
      [ "c", "a" ],
    ]
  },
  simple: {
    V: { 
      x: { value: 1 },
      y: { value: 0 },
      z: { value: 0 },
      w: { value: 0 },
    },
    E: [
      [ "y", "x" ],
      [ "y", "z" ],
      [ "y", "w" ],
      [ "z", "w" ]
    ]
  }
}
