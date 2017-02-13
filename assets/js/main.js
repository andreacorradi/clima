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