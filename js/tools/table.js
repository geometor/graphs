
var table, thead, tbody



function setTable() {
  // set the dimensions and margins of the graph

  // append the svg object to the body of the page
  table = d3.select("#table").append("table")
  thead = table.append('thead')
  var gKeys = Object.keys(g.V)
  thead.append('tr')
    .selectAll('th')
    .data(gKeys)
    .enter()
    .append('th')
    .text(d => d);
  tbody = table.append('tbody');
} 

function renderTable(c) {

  var rows = tbody.selectAll('tr')
    .data(c)
    .enter()
    .insert('tr', ":first-child");

  // create a cell in each row for each column
  var cells = rows.selectAll('td')
    .data(d => d)
    .enter()
    .append('td')
    .text(d => d);
}
