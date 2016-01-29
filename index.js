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
d3.csv('https://github.com/milesjos/d3_workshop/blob/master/pres_polls.csv', function(d){
	return {
		state: d.State,
		ev: +d.ElectoralVotes,	//+ makes the variable an integer rather than a string
		dem: +d.Dem,
		rep: +d.Rep
	}, function(d) {
		console.log(d[0]);
	}
});