function linegraph3(){

	var obj = {
  	enter: function(option){
      console.log("LG3 enter");
      currentLineGraph.updateLine("pr");
  	},
  	leave: function(option){
      console.log("LG3 exit");
  	}
  }

	return obj;
}