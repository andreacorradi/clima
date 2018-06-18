;(function(window, $, undefined) {

	window.APP = window.APP || {}

	APP.currentLineGraph = APP.currentLineGraph || {}
	APP.type = "pr"
	APP.spanNumber = 0 //years

	APP.state = 'linegraph'

	APP.init = function init() {

		APP.stator = new window.States()
		APP.ui = new Ui()
		
		d3.queue()
		  .defer(d3.csv, 'assets/data/tas5_1900_2012.csv')
		  .defer(d3.csv, 'assets/data/pr5_1900_2012.csv')
		  .await(dataprocess)

		function dataprocess(error, tasData, prData) {
			if (error) {
		    console.error(error);
			} else {
				APP.currentLineGraph = new lineGraph(tasData, prData);
				APP.stator.init()
			}
		}

		// listeners
		$("#back").click(APP.stator.moveBackward)
		$("#next").click(APP.stator.moveForward)
		// for testing
		// d3.select("#lineToggle").on("click", function(){
		// 	APP.type==="pr" ? APP.type = "tas" : APP.type = "pr"
		// 	APP.currentLineGraph.updateLine(APP.type)
		// })
		// d3.select("#year").on("click", function(){
		// 	APP.spanNumber = 0
		// 	APP.currentLineGraph.updateStats(APP.spanNumber)
		// })
		// d3.select("#winter").on("click", function(){
		// 	APP.spanNumber = 1
		// 	APP.currentLineGraph.updateStats(APP.spanNumber)
		// })
		// d3.select("#summer").on("click", function(){
		// 	APP.spanNumber = 2
		// 	APP.currentLineGraph.updateStats(APP.spanNumber)
		// })
	}

	$(document).ready(APP.init)

})(window, jQuery)