/**
 * set d3 table
 *
 * @param {string} pid - css selector for parent element
 * @param {string} data - 2 dimensional array
 */
function Table(pid, data) {
  let g = graphs[G]

  var parent = d3.select("#table")
  parent.node().innerHTML = ''

  const table = parent.append("table")
  const thead = table.append('thead')
  var gKeys = Object.keys(g.V)
  thead.append('tr')
    .selectAll('th')
    .data(gKeys)
    .enter()
    .append('th')
    .text(d => d);
  const tbody = table.append('tbody');

  var rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .insert('tr', ":first-child");

  // create a cell in each row for each column
  var cells = rows.selectAll('td')
    .data(d => d)
    .enter()
    .append('td')
    .text(d => d);
}
