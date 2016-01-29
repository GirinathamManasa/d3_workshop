//get the data by letting d3 parse through the csv
d3.csv('http://joshmiles.me/d3_workshop/pres_polls.csv', function(d){
	return {
		//rename the elements of the object to be better than the ones in the svg
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
		responsive: true,
		geographyConfig: {
			popupTemplate: function(geo, d) {
	          return '<div class="hoverinfo"><div>'+geo.properties.name+'</div><div>'+'p'+'</div></div>';
	        },
			highlightOnHover: false //get rid of highlight on hover
		}
	});
	for (var i = data.length - 1; i >= 0; i--) {
		//colors list
		var heavyRepublican = '#B50009'
			republican = '#E8000A',
			lightRepublican = '#D3818C',
			heavyDemocrat = '#001460',
			democrat = '#042087',
			lightDemocrat = '#293C87';
		//st is for state
		var st = d3.select('.' + data[i].state);
		//if the percent for the democratic candidate was higher than the republican candidate ...
		if (data[i].dem >= data[i].rep) {
			//... and the number of electoral votes was above 20...
			if (data[i].ev >= 15) {
				//... fill the state with heavyDemocrat
				st.style('fill', heavyDemocrat);
			} else {
				st.style('fill', lightDemocrat);
			}
		} else{
			if (data[i].ev >= 15) {
				st.style('fill', heavyRepublican);
			} else {
				st.style('fill', republican);
			}
		}
	}
	d3.select(window).on('resize', function() {
        map.resize();
    });
	console.log(data[0]);
});

