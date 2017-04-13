function linegraph1(){

	var obj = {
  	enter: function(option){
      console.log("LG1 enter");
      APP.spanNumber = 0;
      APP.currentLineGraph.updateLine("tas");
  	},
  	leave: function(option){
      console.log("LG1 exit");
  	}
  }

	return obj;
}