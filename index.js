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
		geographyConfig: {
			highlightOnHover: false
		}
	});
	for (var i = data.length - 1; i >= 0; i--) {
		//colors list
		var heavyRepublican = '#B50009'
			republican = '#E8000A',
			lightRepublican = '#CE333B',
			heavyDemocrat = '#001460',
			democrat = '#042087',
			lightDemocrat = '#293C87';
		//st is for state
		var st = d3.select('.' + data[i].state);

		if (data[i].dem >= data[i].rep) {
			if (data[i].ev >= 20) {
				st.style('fill', heavyDemocrat);
			} else if (data[i].ev < 20 && data[i].ev >= 10){
				st.style('fill', democrat);
			} else {
				st.style('fill', lightDemocrat)
			}
		} else{
			if (data[i].ev >= 20) {
				st.style('fill', heavyRepublican);
			} else if (data[i].ev < 20 && data[i].ev >= 10){
				st.style('fill', republican);
			} else {
				st.style('fill', lightRepublican)
			}
		}
	}
	console.log(data[0]);
});