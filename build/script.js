//Set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

var tas,
		pr;

var type = "pr";

var spanNumber = 0; //years

var svgLineGraph = d3.select("body").append("svg")
	.attr("id", "svgLineGraph")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.queue()
  .defer(d3.csv, 'assets/data/tas5_1900_2012.csv')
  .defer(d3.csv, 'assets/data/pr5_1900_2012.csv')
  .await(dataprocess);

function dataprocess(error, tasData, prData) {
	if (error) {
    console.log(error);
	} else {
		tas = tasData;
		pr = prData;
		updateLine(type, spanNumber);
	}
}
//Set the ranges
var xLineGraph = d3.scaleLinear().range([0, width]);
var yLineGraph = d3.scaleLinear().range([height, 0]);

//Define the line
var valueline = d3.line()
							.x(function(d) {
								return xLineGraph(d.mese);
							})
							.y(function(d) {
								return yLineGraph(d.valore);
							});

//Add the X Axis
var xAxisLineGraph = svgLineGraph.append("g")
	.attr("transform", "translate(0," + height + ")")

//Add the Y Axis
var yAxisLineGraph = svgLineGraph.append("g")

var labelLineGraph = d3.select("body").append("div").attr("class", "tooltip");

d3.select("#lineToggle").on("click", function(){
	if (type=="pr"){
		type = "tas";
	} else {
		type = "pr";
	}
	updateLine(type);
})



function updateLine(source) {

			source==="pr" ? data = pr : data = tas;

			//Format the data
			data.forEach(function(d) {
				d.anno = +d.anno;
				d.mese = +d.mese;
				d.valore = +d.valore;
			});

			//Scale the range of the data
			xLineGraph.domain(d3.extent(data, function(d) {return d.mese; }));
			var yMax = d3.max(data, function(d) {
				return d.valore;
			})
			yLineGraph.domain([0, yMax]);

			var years = d3.nest()
	                .key(function(d){
	                	return d.anno;
	                })
	                .entries(data);
			
			//console.log(years);


//*** STATISTICS ***//

			var avgs = [];

			function generateSeason(mese1, mese2, mese3) {
				var filtered = [];
				years.forEach(function (d) {
					var filteredMonths = d.values.filter(function (e) {
						return e.mese==mese1 || e.mese==mese2 || e.mese==mese3;
					})
					filtered.push({
						key: d.key,
						values: filteredMonths
					})
				})
				return filtered;
			}

			function maxminAvg(period) {
				var maxAvg,
						minAvg,
						maxAvgYear,
						minAvgYear;
				var temp,
						timespan;
				if (period==years) timespan = "years";
				else if (period==winter) timespan = "winter";
				else if (period==summer) timespan = "summer";
				var valoreAvg = []; //valori medi sul numero di mesi contenuti in period (years, winter, summer)
				period.forEach(function (d) {
					var singleAvg = d3.mean(d.values, function(e) { return e.valore; });
					valoreAvg.push({
						anno: +d.key,
						avg: singleAvg
					})
				})
				maxAvg = d3.max(valoreAvg, function (d) {	return d.avg;	});
				minAvg = d3.min(valoreAvg, function (d) {	return d.avg;	});
				valoreAvg.forEach(function (d) {
					if (d.avg==maxAvg) { maxAvgYear = d.anno; } 
					if (d.avg==minAvg) { minAvgYear = d.anno; }
				})
				temp = {
					span: timespan,
					maxyear: maxAvgYear,
					max: maxAvg,
					minyear: minAvgYear,
					min: minAvg,
				}
				return temp;
				// console.log("maxYear: "+maxAvgYear+", maxAvg: "+maxAvg)
				// console.log("minYear: "+minAvgYear+", minAvg: "+minAvg)
			}

			var winter = generateSeason(12, 1, 2);
			var spring = generateSeason(3, 4, 5);
			var summer = generateSeason(6, 7, 8);
			var autumn = generateSeason(9, 10, 11);

			// console.log(winter);
			// console.log(summer);

			avgs.push(maxminAvg(years));
			avgs.push(maxminAvg(winter));
			avgs.push(maxminAvg(summer));

			console.log(avgs)

//*** END STATISTICS ***//
			

			// function createColorScale(data) {
			// 	var anni = []; //array degli anni
			// 	var variante = []; //proprietà del colore su cui agisce la scala
			// 	var colori = [] //array dei colori in hsl	    
			// 	data.forEach(function(d) {
			// 		anni.push(d.values[0].anno);
			// 	})
			// 	var tick = 1/anni.length;
			// 	anni.forEach(function(d, i) {
			// 		colori.push(d3.hsl(100, tick*i, .5));
			// 	})
			// 	var colorScale = d3.scaleOrdinal()
			// 						.domain(anni)
			// 						.range(colori)
			// 	return colorScale;
			// }

			// var scalaColore = createColorScale(years);

			//INIZIALIZZAZIONE
			// var startValore = 0;
			// var startValues = [
			// 	{mese: 1, valore: startValore},
			// 	{mese: 2, valore: startValore},
			// 	{mese: 3, valore: startValore},
			// 	{mese: 4, valore: startValore},
			// 	{mese: 5, valore: startValore},
			// 	{mese: 6, valore: startValore},
			// 	{mese: 7, valore: startValore},
			// 	{mese: 8, valore: startValore},
			// 	{mese: 9, valore: startValore},
			// 	{mese: 10, valore: startValore},
			// 	{mese: 11, valore: startValore},
			// 	{mese: 12, valore: startValore}
			// ]

	    var lines = svgLineGraph.selectAll(".line")
	    	.data(years)

	    var newlines = lines
	    	.enter()
	    	.append("path")
	    	//.attr("class", "line")
	    	.attr("class", function(d){
	    		if (+d.key==avgs[spanNumber].maxyear) return "line maxAvgYear";
	    		else if (+d.key==avgs[spanNumber].minyear) return "line minAvgYear";
	    		else return "line";
	    	})
	    	// //SCALA COLORE
	    	// .style("stroke", function(d, i) {
	    	// 	return scalaColore(d.values[0].anno);
	    	// })

	    newlines
	    	.transition()
	    	.duration(1000)
	    	.delay(function(d, i) {
	    		return i*10;
	    	})
	      .attr("d", function(d){
	      	return valueline(d.values)
	      })

	    newlines
	      .on("mouseover", function(d, i) {
	      	d3.select(this).classed("selected", true);
					labelLineGraph.style("left", d3.event.pageX+10+"px");
					labelLineGraph.style("top", d3.event.pageY-25+"px");
					labelLineGraph.style("display", "inline-block");
					labelLineGraph.html(d.key);
	      })
	      .on("mouseout", function() {
	      	d3.select(this).classed("selected", false);
	      	labelLineGraph.style("display", "none");
	      })

	    lines
	    	.transition()
	    	.duration(1000)
	    	.delay(function(d, i) {
	    		return i*10;
	    	})
	    	.attr("class", function(d){
	    		if (+d.key==avgs[spanNumber].maxyear) return "line maxAvgYear";
	    		else if (+d.key==avgs[spanNumber].minyear) return "line minAvgYear";
	    		else return "line";
	    	})
	      .attr("d", function(d){
	      	return valueline(d.values)
	      })

	    lines
	      .on("mouseover", function(d, i) {
	      	d3.select(this).classed("selected", true);
					labelLineGraph.style("left", d3.event.pageX+10+"px");
					labelLineGraph.style("top", d3.event.pageY-25+"px");
					labelLineGraph.style("display", "inline-block");
					labelLineGraph.html(d.key);
	      })
	      .on("mouseout", function() {
	      	d3.select(this).classed("selected", false);
	      	labelLineGraph.style("display", "none");
	      })

			xAxisLineGraph
				.call(d3.axisBottom(xLineGraph));

			yAxisLineGraph
				.call(d3.axisLeft(yLineGraph));



			function updateStats(span) {
				svgLineGraph.selectAll(".line")
	    		.data(years)
		    	.transition()
		    	.duration(1000)
		    	.attr("class", function(d){
		    		if (+d.key==avgs[span].maxyear) return "line maxAvgYear";
		    		else if (+d.key==avgs[span].minyear) return "line minAvgYear";
		    		else return "line";
		    	})
		      .attr("d", function(d){
		      	return valueline(d.values)
		      })
			}

			d3.select("#year").on("click", function(){
				spanNumber = 0;
				updateStats(spanNumber);
			})

			d3.select("#winter").on("click", function(){
				spanNumber = 1;
				updateStats(spanNumber);
			})

			d3.select("#summer").on("click", function(){
				spanNumber = 2;
				updateStats(spanNumber);
			})

} //END updateLine