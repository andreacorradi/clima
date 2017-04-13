function linegraph0(){

	var obj = {
  	enter: function(option){
      console.log("LG0 enter");
      APP.currentLineGraph.updateLine(APP.type);
  	},
  	leave: function(option){
      console.log("LG0 exit");
  	}
  }

	return obj;
}