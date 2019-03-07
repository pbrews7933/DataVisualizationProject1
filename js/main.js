function startUp() {
//		document.getElementById("defaultOpen").click();
	}
function openText(evt, textName) {
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	  // Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(textName).style.display = "block";
	evt.currentTarget.className += " active";
}
function openGraph(evt, graphName) {
	// Declare all variables
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	  // Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(graphName).style.display = "block";
	evt.currentTarget.className += " active";
	switch(graphName) {
		case 'spendingToGDP':
			drawSheetName('AllG20Data', 
						  'SELECT A, F, G, H, (E - (F + G + H)), ((E - (F + G + H)) / E) WHERE C = "2015"',
						  spendingToGDPResponseHandler);
			break;
		case 'educationHealthMilitary':
			drawSheetName('AllG20Data', 
						  'SELECT A, F, G, H, (F + G + H)/F WHERE C = "2015"',
						  educationHealthMilitaryResponseHandler);
			break;
		case 'ppEducationalppGDP':
			drawSheetName('AllG20Data', 
						  'SELECT A,N,(L - N), (L - N) / N WHERE C = "2015"',
						  ppEducationalppGDPResponseHandler);
			break;
		case 'ppHealthcareppGDP':
			drawSheetName('AllG20Data', 
						  'SELECT A,O,(L - O), (L - O) / O WHERE C = "2015"' ,
						  ppHealthcareppGDPResponseHandler);
			break;
		case 'growthRatePctHealthcare':
			drawSheetName('AllG20Data', 
						  'SELECT A, C, H',
						  growthRatePctHealthcareResponseHandler);
			break;
		case 'growthRateFixedHealthcare':
			drawSheetName('AllG20Data', 
						  'SELECT A,C, H',
						  growthRateFixedHealthcareResponseHandler);
			break;
		case 'growthRatePctEducation':
			drawSheetName('AllG20Data', 
						  'SELECT A,C, G',
						  growthRatePctEducationResponseHandler);
			break;
		case 'growthRateFixedEducation':
			drawSheetName('AllG20Data', 
						  'SELECT A,C, G',
						  growthRateFixedEducationResponseHandler);
			break;
		case 'growthRatePctMilitarySpending':
			drawSheetName('AllG20Data', 
						  'SELECT A,C, F',
						  growthRatePctMilitarySpendingResponseHandler);
			break;
		case 'growthRateFixedMilitarySpending':
			drawSheetName('AllG20Data', 
						  'SELECT A,C, F',
						  growthRateFixedMilitarySpendingResponseHandler);
			break;
		default:
	}
} 
function drawSheetName(sheetName, query, responseHandler) {
	var queryString = encodeURIComponent(query);
	console.log('https://docs.google.com/spreadsheets/d/1Z5w2g3VwnNk5jKYGmwBk0X1fqMlL2BP_9o4VGZUKujk/gviz/tq?sheet=' +
					sheetName + '&headers=1&tq=' + queryString)
	var q = new google.visualization.Query(
//		'https://docs.google.com/spreadsheets/d/e/2PACX-1vRJuo9Jmb4HqKy7-NAcyIlpZ9YCgwocMszM9EppmCABfvcIgeu3TXBq0IE9vig7YKzPPypPtllm-VmV/gviz/tq?sheet=' +
//		'https://docs.google.com/spreadsheets/d/1Z5w2g3VwnNk5jKYGmwBk0X1fqMlL2BP_9o4VGZUKujk/gviz/tq?sheet=' +
//		'https://docs.google.com/spreadsheets/d/1D3mkzQPbRnz3zmwQnXZAeaocDPghNb4vDxNx35qBMdk/gviz/tq?sheet=' +
		'https://docs.google.com/spreadsheets/d/15yu3wd5yTRdh_0fpLkLk1iDt077oKr6l_MvNmhRdYAg/gviz/tq?sheet=' +
					sheetName + '&headers=1&tq=' + queryString);
	q.send(responseHandler);
} //drawSheetName
function spendingToGDPResponseHandler(response) {
	
	var data = response.getDataTable();
	data.sort({column:5, desc: false});
	data.setColumnLabel(1,"Military Spending");
	data.setColumnLabel(2,"Education");
	data.setColumnLabel(3,"Health Care");
	data.setColumnLabel(4,"Other");
	data.removeColumn(5);
	var options = {
				height: 800,
				legend: {position: 'top'},
				bars: 'horizontal',
				isStacked: 'percent',
				annotations: {alwaysOutside: true},
				title: 'Health Care, Education and Military Spending vs. GDP (2015)',
				vAxis: {title: 'Country'},
				hAxis: {title: 'Percent of GDP ($ in Billions)'}
	};
	
	var chart = new google.visualization.BarChart(document.getElementById(
				'spendingToGDPGraph'));
	
	chart.draw(data, options);
		
};
function educationHealthMilitaryResponseHandler(response) {
	var data = response.getDataTable();
	data.sort({column:4, desc: false});
	data.setColumnLabel(1,"Military Spending");
	data.setColumnLabel(2,"Education");
	data.setColumnLabel(3,"Health Care");
	data.removeColumn(4);

	var options = {
				height: 800,
				legend: {position: 'top'},
				bars: 'horizontal',
				isStacked: 'percent',
				annotations: {alwaysOutside: true},
				title: 'Health Care, Education and Military Spending (2015)',
				vAxis: {title: 'Country'},
				hAxis: {title: 'Percent of Total Education, Health, Military Spending($ in Billions)'}
	};
	
	var chart = new google.visualization.BarChart(document.getElementById(
				'educationHealthMilitaryGraph'));
	
	chart.draw(data, options);
	
};
function ppEducationalppGDPResponseHandler(response) {
	var data = response.getDataTable();
	data.sort({column:3, desc: false});
	data.addColumn({type:"string", label:"style", id:"3", role:"style"})
	data.setColumnLabel(1,"Education");
	data.setColumnLabel(2,"GDP");
	data.removeColumn(3)

	var options = {
				height: 800,
				legend: {position: 'top'},
				bars: 'horizontal',
				isStacked: 'percent',
				annotations: {alwaysOutside: true},
				title: 'Per Person Education vs Per Person GDP (2015)',
				vAxis: {title: 'Country'},
				hAxis: {title: 'Percent of Education Spending Per GDP Per Person($ in Billions)'}
	};
	
	var chart = new google.visualization.BarChart(document.getElementById(
				'ppEducationalppGDPGraph'));
	
	chart.draw(data, options);
		
};
function ppHealthcareppGDPResponseHandler(response) {
	var data = response.getDataTable();
	data.sort({column:3, desc: false});
	data.setColumnLabel(1,"Health Care");
	data.setColumnLabel(2,"GDP");
	data.removeColumn(3)


	var options = {
				height: 800,
				legend: {position: 'top'},
				bars: 'horizontal',
				isStacked: 'percent',
				annotations: {alwaysOutside: true},
				title: 'Per Person Health Care vs Per Person GDP (2015)',
				vAxis: {title: 'Country'},
				hAxis: {title: 'Percent of Health Care Spending Per GDP Per Person($ in Billions)'}
	};
	
	var chart = new google.visualization.BarChart(document.getElementById(
				'ppHealthcareppGDPGraph'));
	
	chart.draw(data, options);
		
};
function growthRatePctHealthcareResponseHandler(response) {
	var data = response.getDataTable();
	var minView = new google.visualization.DataView(data);
	var minTable = minView.toDataTable(minView.setRows(minView.getFilteredRows([{column: 1, value: "2010"}])));
	var maxView = new google.visualization.DataView(data);
	var maxTable = maxView.toDataTable(maxView.setRows(maxView.getFilteredRows([{column: 1, value: "2015"}])));
	var joinedTable = google.visualization.data.join(minTable, maxTable, 'full', [[0,0]], [2], [2]);
	var cMin = 1;
	var cMax = 2;
	joinedTable.addColumn('number', 'Delta', 'd');
	var cDelta = joinedTable.getNumberOfColumns() - 1;
	var delta = 0;
    for (var i =  0 ; i < joinedTable.getNumberOfRows(); i++) {		
		if (joinedTable.getValue(i, cMax) == 0 || joinedTable.getValue(i, cMin) == 0) {
			delta = 0;
		} else {
			delta = (joinedTable.getValue(i, cMax) - joinedTable.getValue(i, cMin))/ joinedTable.getValue(i, cMin);
		}
		joinedTable.setCell(i, cDelta, delta );
	}
	joinedTable.sort({column: cDelta, desc:false});
	joinedTable.removeColumns(cMin, 2);


	var options = {
				height: 800,
				legend: {position: "none" },
				bars: 'horizontal',
				annotations: {alwaysOutside: true},
				title: 'Percent Growth in Health Care Spending(2010-2015)',
				vAxis: {title: 'Country'},
				hAxis: {title: 'Percent', format: 'percent'},
				chartArea:{left:400}
	};
	
	var chart = new google.visualization.BarChart(document.getElementById(
				'growthRatePctHealthcareGraph'));
	
	chart.draw(joinedTable, options);
		
	
};
function growthRateFixedHealthcareResponseHandler(response) {
	var data = response.getDataTable();
	var minView = new google.visualization.DataView(data);
	var minTable = minView.toDataTable(minView.setRows(minView.getFilteredRows([{column: 1, value: "2010"}])));
	var maxView = new google.visualization.DataView(data);
	var maxTable = maxView.toDataTable(maxView.setRows(maxView.getFilteredRows([{column: 1, value: "2015"}])));
	var joinedTable = google.visualization.data.join(minTable, maxTable, 'full', [[0,0]], [2], [2]);
	var cMin = 1;
	var cMax = 2;
	joinedTable.addColumn('number', 'Delta', 'd');
	var cDelta = joinedTable.getNumberOfColumns() - 1;
	var delta = 0;
    for (var i =  0 ; i < joinedTable.getNumberOfRows(); i++) {
		if (joinedTable.getValue(i, cMax) == 0 || joinedTable.getValue(i, cMin) == 0) {
			delta = 0;
		} else {
			delta = joinedTable.getValue(i, cMax) - joinedTable.getValue(i, cMin);
		}
		joinedTable.setCell(i, cDelta, delta );
	}
	joinedTable.sort({column: cDelta, desc:false});
	joinedTable.removeColumns(cMin, 2);


	var options = {
				height: 800,
				legend: {position: "none" },
				bars: 'horizontal',
				annotations: {alwaysOutside: true},
				title: 'Growth in Health Care Spending in Billions(2010-2015)',
				vAxis: {title: 'Country'},
				hAxis: {title: 'Billions'},
				chartArea:{left:400}
	};
	
	var chart = new google.visualization.BarChart(document.getElementById(
				'growthRateFixedHealthcareGraph'));
	
	chart.draw(joinedTable, options);
		
		
};
function growthRatePctEducationResponseHandler(response) {
	var data = response.getDataTable();
	var minView = new google.visualization.DataView(data);
	var minTable = minView.toDataTable(minView.setRows(minView.getFilteredRows([{column: 1, value: "2010"}])));
	var maxView = new google.visualization.DataView(data);
	var maxTable = maxView.toDataTable(maxView.setRows(maxView.getFilteredRows([{column: 1, value: "2015"}])));
	var joinedTable = google.visualization.data.join(minTable, maxTable, 'full', [[0,0]], [2], [2]);
	var cMin = 1;
	var cMax = 2;
	joinedTable.addColumn('number', 'Delta', 'd');
	var cDelta = joinedTable.getNumberOfColumns() - 1;
	var delta = 0;
    for (var i =  0 ; i < joinedTable.getNumberOfRows(); i++) {
		if (joinedTable.getValue(i, cMax) == 0 || joinedTable.getValue(i, cMin) == 0) {
			delta = 0;
		} else {
			delta = (joinedTable.getValue(i, cMax) - joinedTable.getValue(i, cMin))/ joinedTable.getValue(i, cMin);
		}
		joinedTable.setCell(i, cDelta, delta );
	}
	joinedTable.sort({column: cDelta});
	joinedTable.removeColumns(cMin, 2);


	var options = {
				height: 800,
				legend: {position: "none" },
				bars: 'horizontal',
				annotations: {alwaysOutside: true},
				title: 'Percent Growth in Education Spending(2010-2015)',
				vAxis: {title: 'Country'},
				hAxis: {title: 'Percent', format: 'percent'},
				chartArea:{left:400}
	};
	
	var chart = new google.visualization.BarChart(document.getElementById(
				'growthRatePctEducationGraph'));
	
	chart.draw(joinedTable, options);
		
	
	
};
function growthRateFixedEducationResponseHandler(response) {
	var data = response.getDataTable();
	var minView = new google.visualization.DataView(data);
	var minTable = minView.toDataTable(minView.setRows(minView.getFilteredRows([{column: 1, value: "2010"}])));
	var maxView = new google.visualization.DataView(data);
	var maxTable = maxView.toDataTable(maxView.setRows(maxView.getFilteredRows([{column: 1, value: "2015"}])));
	var joinedTable = google.visualization.data.join(minTable, maxTable, 'full', [[0,0]], [2], [2]);
	var cMin = 1;
	var cMax = 2;
	joinedTable.addColumn('number', 'Delta', 'd');
	var cDelta = joinedTable.getNumberOfColumns() - 1;
	var delta = 0;
    for (var i =  0 ; i < joinedTable.getNumberOfRows(); i++) {
		if (joinedTable.getValue(i, cMax) == 0 || joinedTable.getValue(i, cMin) == 0) {
			delta = 0;
		} else {
			delta = joinedTable.getValue(i, cMax) - joinedTable.getValue(i, cMin);
		}
		joinedTable.setCell(i, cDelta, delta );
	}
	joinedTable.sort({column: cDelta, desc:false});
	joinedTable.removeColumns(cMin, 2);


	var options = {
				height: 800,
				legend: {position: "none" },
				bars: 'horizontal',
				annotations: {alwaysOutside: true},
				title: 'Growth in Education Spending in Billions(2010-2015)',
				vAxis: {title: 'Country'},
				hAxis: {title: 'Billions'},
				chartArea:{left:400}
	};
	
	var chart = new google.visualization.BarChart(document.getElementById(
				'growthRateFixedEducationGraph'));
	
	chart.draw(joinedTable, options);
		
	
};
function growthRatePctMilitarySpendingResponseHandler(response) {
	var data = response.getDataTable();
	var minView = new google.visualization.DataView(data);
	var minTable = minView.toDataTable(minView.setRows(minView.getFilteredRows([{column: 1, value: "2010"}])));
	var maxView = new google.visualization.DataView(data);
	var maxTable = maxView.toDataTable(maxView.setRows(maxView.getFilteredRows([{column: 1, value: "2015"}])));
	var joinedTable = google.visualization.data.join(minTable, maxTable, 'full', [[0,0]], [2], [2]);
	var cMin = 1;
	var cMax = 2;
	joinedTable.addColumn('number', 'Delta', 'd');
	var cDelta = joinedTable.getNumberOfColumns() - 1;
	var delta = 0;
    for (var i =  0 ; i < joinedTable.getNumberOfRows(); i++) {
		if (joinedTable.getValue(i, cMax) == 0 || joinedTable.getValue(i, cMin) == 0) {
			delta = 0;
		} else {
			delta = (joinedTable.getValue(i, cMax) - joinedTable.getValue(i, cMin))/ joinedTable.getValue(i, cMin);
		}
		joinedTable.setCell(i, cDelta, delta );
	}
	joinedTable.sort({column: cDelta, desc:false});
	joinedTable.removeColumns(cMin, 2);


	var options = {
				height: 800,
				legend: {position: "none" },
				bars: 'horizontal',
				annotations: {alwaysOutside: true},
				title: 'Percent Growth in Military Spending Spending(2010-2015)',
				vAxis: {title: 'Country'},
				hAxis: {title: 'Percent', format: 'percent'},
				chartArea:{left:400}
	};
	
	var chart = new google.visualization.BarChart(document.getElementById(
				'growthRatePctMilitarySpendingGraph'));
	
	chart.draw(joinedTable, options);
		
	
	
};
function growthRateFixedMilitarySpendingResponseHandler(response) {
	var data = response.getDataTable();
	var minView = new google.visualization.DataView(data);
	var minTable = minView.toDataTable(minView.setRows(minView.getFilteredRows([{column: 1, value: "2010"}])));
	var maxView = new google.visualization.DataView(data);
	var maxTable = maxView.toDataTable(maxView.setRows(maxView.getFilteredRows([{column: 1, value: "2015"}])));
	var joinedTable = google.visualization.data.join(minTable, maxTable, 'full', [[0,0]], [2], [2]);
	var cMin = 1;
	var cMax = 2;
	joinedTable.addColumn('number', 'Delta', 'd');
	var cDelta = joinedTable.getNumberOfColumns() - 1;
	var delta = 0;
    for (var i =  0 ; i < joinedTable.getNumberOfRows(); i++) {
		if (joinedTable.getValue(i, cMax) == 0 || joinedTable.getValue(i, cMin) == 0) {
			delta = 0;
		} else {
			delta = joinedTable.getValue(i, cMax) - joinedTable.getValue(i, cMin);
		}
		joinedTable.setCell(i, cDelta, delta );
	}
	joinedTable.sort({column: cDelta, desc:false});
	joinedTable.removeColumns(cMin, 2);


	var options = {
				height: 800,
				legend: {position: "none" },
				bars: 'horizontal',
				annotations: {alwaysOutside: true},
				title: 'Growth in Military Spending Spending in Billions(2010-2015)',
				vAxis: {title: 'Country'},
				hAxis: {title: 'Billions'},
				chartArea:{left:400}
	};
	
	var chart = new google.visualization.BarChart(document.getElementById(
				'growthRateFixedMilitarySpendingGraph'));
	
	chart.draw(joinedTable, options);
		
	
};
