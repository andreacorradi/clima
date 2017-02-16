function linegraph0(){

	var obj = {
  	enter: function(option){
      console.log("LG0 enter");
      currentLineGraph.updateLine(type);
  	},
  	leave: function(option){
      console.log("LG0 exit");
  	}
  }

	return obj;
}