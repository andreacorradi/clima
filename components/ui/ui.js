function Ui() {

	var self = this

	self.initNav = function() {
		$('.view#ui #nav-buttons #back').css('opacity', 0.3)
    $('.view#ui #nav-buttons #back').css('pointer-events', 'none')
    $('.view#ui #nav-buttons #next').css('opacity', 1)
    $('.view#ui #nav-buttons #next').css('pointer-events', 'all')
	}

	self.updateNav = function(state) {
    if (state.slice(-1) === '0') {
      $('.view#ui #nav-buttons #back').css('opacity', 1)
      $('.view#ui #nav-buttons #back').css('pointer-events', 'all')
    } else if (state.slice(-1) === '3') {
      $('.view#ui #nav-buttons #next').css('opacity', 1)
      $('.view#ui #nav-buttons #next').css('pointer-events', 'all')
    }
    else if (state.slice(-1) === '4') {
      $('.view#ui #nav-buttons #next').css('opacity', 0.3)
      $('.view#ui #nav-buttons #next').css('pointer-events', 'none')
    }
  }

  return self

}