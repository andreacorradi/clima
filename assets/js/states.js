function States() {

	var stator = new StateMan()
	var timeline = ["linegraph0", "linegraph1", "linegraph2", "linegraph3"]
  var currentStep = 0

  stator.timeline = timeline
  stator.currentStep = currentStep
	stator.forward = moveForward
	stator.backward = moveBackward
	stator.init = init

	stator.state({
    "linegraph0": new linegraph0(),
    "linegraph1": new linegraph1(),
    "linegraph2": new linegraph2(),
    "linegraph3": new linegraph3()
	})

	function init(){
		stator.go(timeline[0], {encode: false})
	}

	function moveForward(){
		if (currentStep<timeline.length-1) {
			currentStep++
			stator.go(timeline[currentStep], {encode: false})
		}
		console.log("forward, "+currentStep)
	}

	function moveBackward(){
		if (currentStep>=1) {
			currentStep--
			stator.go(timeline[currentStep], {encode: false})
		}
		console.log("backward, "+currentStep)
	}
	
	return stator

}