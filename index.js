'use strict';

//pie chart color schemes
var republicanReds = d3.scale.ordinal()
	.range(['#670101', '#8d0000', '#bf0000', '#e30101', '#ff0000']);

var democratBlues = d3.scale.ordinal()
	.range(['#3c78df', '#1d63db', '#155ad0', '#0c4dbd', '#10459f']);

//set up width and height
var width = 800,
    height = 800,
    radius = Math.min(width - 40, height - 40) / 2;

var arc = d3.svg.arc()		//creates <path> elements for us using arc data
    .outerRadius(radius)
    .innerRadius(radius - 200);

var labelArc = d3.svg.arc()
    .outerRadius(radius + 20)
    .innerRadius(radius + 20);

var pie = d3.layout.pie()			//creates the pie data from electoral college votes
    .value(function(d) { return d.ev; });

var svg = d3.select("#pieContainer")
	.append("svg")					//create svg element
    	.attr("width", width)			//make the height and width for the svg
    	.attr("height", height)
  	.append("g")						//make a group to hold the pie chart
    	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); 	//move it to be centered



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
	var g = svg.selectAll(".arc")
      	.data(pie(data))
    	.enter()
    	.append("g")
      		.attr("class", "arc");

    g.append("path")
    	.attr("d", arc)
      	.style("fill", function(data) {
      		if (data.data.dem >= data.data.rep) {
      			return democratBlues(data.data.state);
      		} else{
      			return republicanReds(data.data.state);
      		};
      	})

    //on mouseover
    g.on('mouseover', function(data) {
    	d3.select(this)
    		.attr('opacity', '.8');
    	d3.select('#pieInfo')
    		.append('div')
    		.classed('stateInfo', true)
    		.html(	'<h1 class="stateName">'+data.data.state+'</h1>'+
    				'<span>Electoral Votes: '+data.data.ev+'</span>')
    	if (data.data.dem >= data.data.rep) {
    		d3.select('.stateInfo')
    			.append('h2')
    			.text(data.data.dem+'% Democrat');
    	} else{
    		d3.select('.stateInfo')
    			.append('h2')
    			.text(data.data.rep+'% Republican');

    	};
    });
    //on mouseout
    g.on('mouseout', function(data) {
    	d3.select(this).attr('opacity', '1');
    	d3.select('.stateInfo')
    		.remove();
    });


	//create the map
	var map = new Datamap({
		scope: 'usa',
		element: document.getElementById('mapContainer'), //get our container for our map
		responsive: true,
		geographyConfig: {
			highlightOnHover: false //get rid of highlight on hover
		}
	});
	for (var i = data.length - 1; i >= 0; i--) {
		//colors list
		var heavyRepublican = '#B50009',
			republican = '#E8000A',
			lightRepublican = '#D3818C',
			heavyDemocrat = '#001460',
			democrat = '#042087',
			lightDemocrat = '#293C87';
		//st is for state
		var st = d3.select('.' + data[i].state);
		//st on hover add the data for that state
		// st.on('mouseover', function() {
		// 	console.log(data)
		// 	classString = d3.select(this).attr('class')
		// 	d3.select('#data')
		// 		.html('<p class="stateData">' + classString.slice(-2) + '</p>'
		// 			+ '')
		// });
		//if the percent for the democratic candidate was higher than the republican candidate ...
		if (data[i].dem >= data[i].rep) {
			//... and the percent democrat was over 60%
			if (data[i].dem >= 60) {
				//... fill the state with heavyDemocrat
				st.style('fill', heavyDemocrat);
			} else {
				st.style('fill', lightDemocrat);
			}
		} else{
			if (data[i].rep >= 60) {
				st.style('fill', heavyRepublican);
			} else {
				st.style('fill', republican);
			}
		}
	}
	//make it responsive
	d3.select(window).on('resize', function() {
        map.resize();
    });

	console.log(data[0]);

});

