function startUp() {
//		document.getElementById("defaultOpen").click();
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
						  'SELECT A, E, F WHERE C = "2015"',
						  spendingToGDPResponseHandler);
			break;
		case 'educationHealthMilitary':
			drawSheetName('AllG20Data', 
						  'SELECT A, C, F, G, H',
						  educationHealthMilitaryResponseHandler);
			break;
		case 'ppEducationalppGDP':
			drawSheetName('AllG20Data', 
						  'SELECT A,C,L,N',
						  ppEducationalppGDPResponseHandler);
			break;
		case 'pphHealthcareppGDP':
			drawSheetName('AllG20Data', 
						  'SELECT A,C,L,O',
						  pphHealthcareppGDPResponseHandler);
			break;
		case 'growthRatePctHealthcare':
			drawSheetName('AllG20Data', 
						  'SELECT A,B,C,D,E,F',
						  growthRatePctHealthcareResponseHandler);
			break;
		case 'growthRateFixedHealthCare':
			drawSheetName('AllG20Data', 
						  'SELECT A,B,C,D,E,F',
						  growthRateFixedHealthCareResponseHandler);
			break;
		case 'growthRatePctEducation':
			drawSheetName('AllG20Data', 
						  'SELECT A,B,C,D,E,F',
						  growthRatePctEducationResponseHandler);
			break;
		case 'growthRateFixedEducation':
			drawSheetName('AllG20Data', 
						  'SELECT A,B,C,D,E,F',
						  growthRateFixedEducationResponseHandler);
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
		'https://docs.google.com/spreadsheets/d/1Z5w2g3VwnNk5jKYGmwBk0X1fqMlL2BP_9o4VGZUKujk/gviz/tq?sheet=' +
					sheetName + '&headers=1&tq=' + queryString);
	q.send(responseHandler);
} //drawSheetName
function spendingToGDPResponseHandler(response) {
	
	var data = response.getDataTable();
	data.sort({column:1, desc: true});
	
	var options = {
				height: 400,
				legend: 'none',
				bars: 'horizontal',
				isStacked: true,
				annotations: {alwaysOutside: true},
				title: 'Military Spending vs. GDP (2015)',
				vAxis: {title: 'Country'},
				hAxis: {title: 'Spending in Billions ($)'}
	};
	
	var chart = new google.visualization.BarChart(document.getElementById(
				'spendingToGDPGraph'));
	
	chart.draw(data, options);
		
};
function educationHealthMilitaryResponseHandler(response) {
	
};
function ppEducationalppGDPResponseHandler(response) {
	
};
function pphHealthcareppGDPResponseHandler(response) {
	
};
function growthRatePctHealthcareResponseHandler(response) {
	
};
function growthRateFixedHealthCareResponseHandler(response) {
	
};
function growthRatePctEducationResponseHandler(response) {
	
};
function growthRateFixedEducationResponseHandler(response) {
	
};
