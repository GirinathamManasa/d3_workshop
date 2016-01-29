//create the map
var map = new Datamap({
	scope: 'usa',
	element: document.getElementById('container'),
	fills: {
		republican: '#E8000A',
		democrat: '#042087'
	}
});

//get the data
var data = d3.csv('pres_polls.csv', function(d){
	return {
		state: d.State,
		ev: +d.ElectoralVotes,	//+ makes the variable an integer rather than a string
		dem: +d.Dem,
		rep: +d.Rep
	}
});