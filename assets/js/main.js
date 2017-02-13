var currentLineGraph = null;

var tas,
		pr;

var type = "pr";

var spanNumber = 0; //years

d3.queue()
  .defer(d3.csv, 'assets/data/tas5_1900_2012.csv')
  .defer(d3.csv, 'assets/data/pr5_1900_2012.csv')
  .await(dataprocess);

selectLineGraph();

function selectLineGraph() {
	currentLineGraph = new lineGraph();
}

function dataprocess(error, tasData, prData) {
	if (error) {
    console.log(error);
	} else {
		tas = tasData;
		pr = prData;
		currentLineGraph.updateLine(type, spanNumber);
	}
}

d3.select("#lineToggle").on("click", function(){
	if (type=="pr"){ type = "tas";} else { type = "pr";	}
	currentLineGraph.updateLine(type, spanNumber);
})
