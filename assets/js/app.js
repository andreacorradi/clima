;(function(window, $, undefined) {

	window.APP = {}
	APP.currentLineGraph = null
	APP.type = "pr"
	APP.spanNumber = 0 //years

	$(document).ready(function(){

		APP.stator = new States()

		d3.queue()
		  .defer(d3.csv, 'assets/data/tas5_1900_2012.csv')
		  .defer(d3.csv, 'assets/data/pr5_1900_2012.csv')
		  .await(dataprocess)
		function dataprocess(error, tasData, prData) {
			if (error) {
		    console.log(error);
			} else {
				APP.currentLineGraph = new lineGraph(tasData, prData);
				APP.stator.start().init()
			}
		}

		// listeners
		$("#back").click(APP.stator.backward)
		$("#next").click(APP.stator.forward)
		d3.select("#lineToggle").on("click", function(){
			APP.type==="pr" ? APP.type = "tas" : APP.type = "pr"
			APP.currentLineGraph.updateLine(APP.type)
		})
		d3.select("#year").on("click", function(){
			APP.spanNumber = 0
			APP.currentLineGraph.updateStats(APP.spanNumber)
		})
		d3.select("#winter").on("click", function(){
			APP.spanNumber = 1
			APP.currentLineGraph.updateStats(APP.spanNumber)
		})
		d3.select("#summer").on("click", function(){
			APP.spanNumber = 2
			APP.currentLineGraph.updateStats(APP.spanNumber)
		})

	})

})(window, jQuery)