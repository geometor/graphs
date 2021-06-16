/**
 * render graph definition in code block
 */
function Code(pid) {
  let g = graphs[G]

  var code = d3.select("#code")
  code.node().innerHTML = ''

  var pre = code.append("pre")
  var text = `${G}: {\n`
  text += "  V: {\n"
  let vKeys = Object.keys(g.V)
  vKeys.forEach( key => {
    let val = graphs[G].V[key].value
    text += `     ${ key }: { value: ${ val } },\n`
  })
  text += "  },\n"

  text += "  E: {\n"
  let eKeys = Object.keys(g.E)
  eKeys.forEach( key => {
    let val = graphs[G].E[key]
    text += `     [ ${ val } ],\n`
  })
  text += "  }\n"
  text += "}"

  pre.text(text)
}
