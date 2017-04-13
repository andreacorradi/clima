function linegraph2(){

	var obj = {
  	enter: function(option){
      console.log("LG2 enter");
      APP.spanNumber = 1;
      APP.currentLineGraph.updateStats(APP.spanNumber);
  	},
  	leave: function(option){
      console.log("LG2 exit");
  	}
  }

	return obj;
}