// ;(function (window, $, undefined) {

// 	'use strict'

// 	$(document).ready(function(){

		window.myState = new StateMan();
		window.myState.direction = 'up'

		window.myState.state({

      "linegraph0": new linegraph0(),
      "linegraph1": new linegraph1(),
      "linegraph2": new linegraph2(),
      "linegraph3": new linegraph3()

		}).start({});     

// 	})

// })(window, window.jQuery);