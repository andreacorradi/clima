function linegraph1(){

	var obj = {
  	enter: function(option){
      console.log("LG1 enter");
      currentLineGraph.updateLine("tas");
  	},
  	leave: function(option){
      console.log("LG1 exit");
  	}
  }

	return obj;
}