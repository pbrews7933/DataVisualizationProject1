var fieldDictionary;

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(startUp);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
 function startUp() {
  var queryString = encodeURIComponent('SELECT A, B');
  var sheetName = "ColumnIndex";
  var googleSheetsLink = 'https://docs.google.com/spreadsheets/d/1Z5w2g3VwnNk5jKYGmwBk0X1fqMlL2BP_9o4VGZUKujk/gviz/tq?sheet=' +
						sheetName + '&headers=1&tq=' + queryString;
  alert(googleSheetsLink);
  var query = new google.visualization.Query(googleSheetsLink);
  query.send(startupQueryResponse);
}

function startupQueryResponse(response) {
  if (response.isError()) {
	alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
	return;
  }
  fieldDictionary = response.getDataTable();
 }
 
function cL(response){
  fieldDictionary = response.getDataTable();
  var lookUp = data.getFilteredRows([{column: 0, value: "Country Name"}]);
  var letter = lookUp.getFormattedValue(0, 1);
}    
