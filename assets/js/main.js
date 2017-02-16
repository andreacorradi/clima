//$(document).ready(function(){

	var currentLineGraph = null;

	var type = "pr";

	var spanNumber = 0; //years

	var timeline = ["linegraph0", "linegraph1", "linegraph2", "linegraph3"];
  var currentStep = 0;

	d3.queue()
	  .defer(d3.csv, 'assets/data/tas5_1900_2012.csv')
	  .defer(d3.csv, 'assets/data/pr5_1900_2012.csv')
	  .await(dataprocess);

	function dataprocess(error, tasData, prData) {
		if (error) {
	    console.log(error);
		} else {
			currentLineGraph = new lineGraph(tasData, prData);
			myState.go(timeline[currentStep], {encode: false})
		}
	}

	myState.on('moveForward', moveForward)
	myState.on('moveBackward', moveBackward)

	function moveForward(){
		if (currentStep<timeline.length-1) {
			currentStep++;
			myState.go(timeline[currentStep], {encode: false});
		}
		console.log("forward, "+currentStep);
	}

	function moveBackward(){
		if (currentStep>=1) {
			currentStep--;
			myState.go(timeline[currentStep], {encode: false});
		}
		console.log("backward, "+currentStep);
	}

	// listeners
	$("#back").get(0).addEventListener("click", function() {
		moveBackward();
	});

	$("#next").get(0).addEventListener("click", function() {
		moveForward();
	});



	d3.select("#lineToggle").on("click", function(){
		type==="pr" ? type = "tas" : type = "pr";
		currentLineGraph.updateLine(type);
	})

	d3.select("#year").on("click", function(){
		spanNumber = 0;
		currentLineGraph.updateStats(spanNumber);
	})

	d3.select("#winter").on("click", function(){
		spanNumber = 1;
		currentLineGraph.updateStats(spanNumber);
	})

	d3.select("#summer").on("click", function(){
		spanNumber = 2;
		currentLineGraph.updateStats(spanNumber);
	})

//})