function linegraph2(){

	var obj = {
  	enter: function(option){
      console.log("LG2 enter");
      spanNumber = 1;
      currentLineGraph.updateStats(spanNumber);
  	},
  	leave: function(option){
      console.log("LG2 exit");
  	}
  }

	return obj;
}