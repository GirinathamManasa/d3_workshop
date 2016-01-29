//get the data
d3.csv('http://joshmiles.me/d3_workshop/pres_polls.csv', function(d){
	return {
		state: d.State,
		ev: +d.ElectoralVotes,	//+ makes the variable an integer rather than a string
		dem: +d.Dem,
		rep: +d.Rep
	};
}, function(data) {
	//create the map
	var map = new Datamap({
		scope: 'usa',
		element: document.getElementById('container'), //get our container for our map
		fills: {					//set up the colors for each party
			defaultFill: '#7184C7'
		},
		geographyConfig: {
			highlightOnHover: false
		}
	});
	for (var i = data.length - 1; i >= 0; i--) {
		var republican = '#E8000A',
			democrat = '#042087';
		var st = d3.select('.' + data[i].state);
		if (data[i].dem >= data[i].rep) {
			st.style('fill', democrat)
		} else{
			st.style('fill', republican)
		}
		console.log(data[i].state);
		console.log(st);
	};
	console.log(data[0]);
});