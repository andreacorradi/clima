window.States = function () {

  var self = this
  var stator = new window.StateMan()

	var timeline = ['intro', 'linegraph.linegraph0', 'linegraph.linegraph1', 'linegraph.linegraph2', 'linegraph.linegraph3', 'linegraph.linegraph4']
  var currentStep = 0

  var introState = new window.IntroState()
  var linegraphState = new window.LinegraphState()

  self.go = function (state, params) {
    console.log(state)
    debounceNav()
    var options = {
      encode: false
    }
    if (params) options.params = params
    stator.go(state, options)
  }

  self.start = function (options) {
    stator.start(options)
  }

	self.init = function () {
		stator.go(timeline[0], {encode: false})
	}

	self.moveForward = function () {
		if (currentStep < timeline.length - 1) {
			currentStep++
			self.go(timeline[currentStep], timeline[currentStep])
		}
		//console.log("forward, "+currentStep)
	}

	self.moveBackward = function () {
		if (currentStep >= 1) {
			currentStep--
			self.go(timeline[currentStep], timeline[currentStep])
		}
		//console.log("backward, "+currentStep)
	}

  //prevents users to change state before animations complete
  function debounceNav() {
    $('.view#ui #nav-buttons #back').css('pointer-events', 'none')
    $('.view#ui #nav-buttons #next').css('pointer-events', 'none')
    setTimeout(function() {
      $('.view#ui #nav-buttons #back').css('pointer-events', 'all')
      $('.view#ui #nav-buttons #next').css('pointer-events', 'all')
    }, 1500)
  }

  stator.state({
    'intro': introState,
    'linegraph': linegraphState,
    'linegraph.linegraph0': linegraphState.linegraph0,
    'linegraph.linegraph1': linegraphState.linegraph1,
    'linegraph.linegraph2': linegraphState.linegraph2,
    'linegraph.linegraph3': linegraphState.linegraph3,
    'linegraph.linegraph4': linegraphState.linegraph4
  })

  return self
}