function IntroState() {

  self = this

	self.enter = function(option) {
    console.log('intro: enter')
    $('.view').hide()
    $('.view#ui').show()
    $('.view#intro-container').show()
    APP.ui.initNav()
	}
	self.leave = function(option) {
    console.log('intro: exit')
	}

	return self;
}