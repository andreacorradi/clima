var currentLineGraph = null;

var tas,
		pr;

var type = "pr";

var spanNumber = 0; //years

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
		currentLineGraph = new lineGraph();
		currentLineGraph.updateLine(type);
	}
}

d3.select("#lineToggle").on("click", function(){
	if (type=="pr"){ type = "tas";} else { type = "pr";	}
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