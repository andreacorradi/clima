function lineGraph(tasPar, prPar) {

	var self = this

	//Set the dimensions and margins of the graph
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = $("#lineGraphContainer").width() - margin.left - margin.right
		height = $("#lineGraphContainer").height() - margin.top - margin.bottom

	var svgLineGraph = d3.select("#lineGraphContainer svg")
		.attr("id", "svgLineGraph")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

	//Set the ranges
	var xLineGraph = d3.scaleLinear().range([0, width])
	var yLineGraph = d3.scaleLinear().range([height, 0])

	//Add the X Axis
	var xAxisLineGraph = svgLineGraph.append("g")
		.attr("transform", "translate(0," + height + ")")

	//Add the Y Axis
	var yAxisLineGraph = svgLineGraph.append("g")


	// *** FORMAT DATA ***
	function formatData(dataPar) {
		//Format the data
		dataPar.forEach(function(d) {
			d.anno = +d.anno
			d.mese = +d.mese
			d.valore = +d.valore
		});
		//Scale the range of the data
		xLineGraph.domain(d3.extent(dataPar, function(d) {return d.mese; }))
		var yMax = d3.max(dataPar, function(d) {
			return d.valore
		})
		yLineGraph.domain([0, yMax]);
		var dataYears = d3.nest()
      .key(function(d){
      	return d.anno
      })
      .entries(dataPar)
     return dataYears
	}


	// *** GENERATE SEASON ***
	function generateSeason(dataPar, mese1, mese2, mese3) {
		var filtered = []
		dataPar.forEach(function (d) {
			var filteredMonths = d.values.filter(function (e) {
				return e.mese==mese1 || e.mese==mese2 || e.mese==mese3
			})
			filtered.push({
				key: d.key,
				values: filteredMonths
			})
		})
		return filtered
	}


	// *** CALCULATE MAX & MIN AVG ***
	function maxminAvg(dataPar, period) {
		var maxAvg,
				minAvg,
				maxAvgYear,
				minAvgYear
		var temp,
				timeSpan;
		if (period=="years") timeSpan = dataPar
		else if (period=="winter") timeSpan = generateSeason(dataPar, 12, 1, 2)
		else if (period=="summer") timeSpan = generateSeason(dataPar, 6, 7, 8)
		var valoreAvg = []; //valori medi sul numero di mesi contenuti in period (years, winter, summer)
		timeSpan.forEach(function (d) {
			var singleAvg = d3.mean(d.values, function(e) { return e.valore; })
			valoreAvg.push({
				anno: +d.key,
				avg: singleAvg
			})
		})
		maxAvg = d3.max(valoreAvg, function (d) {	return d.avg;	})
		minAvg = d3.min(valoreAvg, function (d) {	return d.avg;	})
		valoreAvg.forEach(function (d) {
			if (d.avg==maxAvg) { maxAvgYear = d.anno; } 
			if (d.avg==minAvg) { minAvgYear = d.anno; }
		})
		temp = {
			span: period,
			maxyear: maxAvgYear,
			max: maxAvg,
			minyear: minAvgYear,
			min: minAvg,
		}
		return temp
		// console.log("maxYear: "+maxAvgYear+", maxAvg: "+maxAvg)
		// console.log("minYear: "+minAvgYear+", minAvg: "+minAvg)
	}


	// *** UPDATE LINE ***
	self.updateLine = function (typePar) {

		var data
		var labelLineGraph = d3.select("body").append("div").attr("class", "tooltip") //Tooltip

		//Define the line
		var valueline = d3.line()
									.x(function(d) {
										return xLineGraph(d.mese)
									})
									.y(function(d) {
										return yLineGraph(d.valore)
									});

		typePar==="pr" ? data = prPar : data = tasPar

		var years = formatData(data)

		//*** STATISTICS ***//
		var avgs = []
		avgs.push(maxminAvg(years, "years"))
		avgs.push(maxminAvg(years, "winter"))
		avgs.push(maxminAvg(years, "summer"))
		console.log(avgs)
		//*** END STATISTICS ***//
		
    var lines = svgLineGraph.selectAll(".line")
    	.data(years)

    var yearScale = d3.scaleLinear()
    									.domain(['1900', '2012'])
    									.range([0, 100])

    var newlines = lines
    	.enter()
    	.append("path")
    	.attr("class", function(d){
    		if (typePar==='tas'){	
	    		if (+d.key==avgs[APP.spanNumber].maxyear) return "line maxAvgYear"
	    		else if (+d.key==avgs[APP.spanNumber].minyear) return "line minAvgYear"
	    		else return "line"
    		} else {
    			if (+d.key==avgs[APP.spanNumber].maxyear) return "line minAvgYear"
	    		else if (+d.key==avgs[APP.spanNumber].minyear) return "line maxAvgYear"
	    		else return "line"
    		}
    	})

    newlines
    	.transition()
    	.duration(1000)
    	.delay(function(d, i) {
    		return i*10
    	})
      .attr("d", function(d){
      	return valueline(d.values)
      })

    newlines
      .on("mouseover", function(d, i) {
      	d3.select(this).classed("selected", true)
				labelLineGraph.style("left", d3.event.pageX+10+"px")
				labelLineGraph.style("top", d3.event.pageY-50+"px")
				labelLineGraph.style("display", "inline-block")
				labelLineGraph.html(d.key)
      })
      .on("mouseout", function() {
      	d3.select(this).classed("selected", false)
      	labelLineGraph.style("display", "none")
      })

    lines
    	.transition()
    	.duration(1000)
    	.delay(function(d, i) {
    		return i*10
    	})
    	.attr("class", function(d){
    		if (typePar==='tas'){	
	    		if (+d.key==avgs[APP.spanNumber].maxyear) return "line maxAvgYear"
	    		else if (+d.key==avgs[APP.spanNumber].minyear) return "line minAvgYear"
	    		else return "line"
    		} else {
    			if (+d.key==avgs[APP.spanNumber].maxyear) return "line minAvgYear"
	    		else if (+d.key==avgs[APP.spanNumber].minyear) return "line maxAvgYear"
	    		else return "line"
    		}
    	})
      .attr("d", function(d){
      	return valueline(d.values)
      })

    lines
      .on("mouseover", function(d, i) {
      	d3.select(this).classed("selected", true)
				labelLineGraph.style("left", d3.event.pageX+10+"px")
				labelLineGraph.style("top", d3.event.pageY-50+"px")
				labelLineGraph.style("display", "inline-block")
				labelLineGraph.html(d.key)
      })
      .on("mouseout", function() {
      	d3.select(this).classed("selected", false)
      	labelLineGraph.style("display", "none")
      })

		//update axis
		xAxisLineGraph
			.call(d3.axisBottom(xLineGraph))

		yAxisLineGraph
			.call(d3.axisLeft(yLineGraph))

		//*** UPDATE TIME SPAN ***//
		self.updateStats = function (span) {
			svgLineGraph.selectAll(".line")
	  		.data(years)
	    	.attr("class", function(d){
	    		if (typePar==='tas'){	
		    		if (+d.key==avgs[APP.spanNumber].maxyear) return "line maxAvgYear"
		    		else if (+d.key==avgs[APP.spanNumber].minyear) return "line minAvgYear"
		    		else return "line"
	    		} else {
	    			if (+d.key==avgs[APP.spanNumber].maxyear) return "line minAvgYear"
		    		else if (+d.key==avgs[APP.spanNumber].minyear) return "line maxAvgYear"
		    		else return "line"
	    		}
	    	})
	      .attr("d", function(d){
	      	return valueline(d.values)
	      })
		}

	} // *** end UPDATE LINE ***

}