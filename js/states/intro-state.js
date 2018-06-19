function IntroState() {

  self = this
  var tl = null

  function introAnimation() {
    TweenMax.set($('#intro-animation svg').find('#sun > g'), {scale: 1})
    TweenMax.set($('#intro-animation svg').find('#clouds path'), {x: -200})
    TweenMax.set($('#intro-animation svg').find('#clouds path:first-child'), {x: 200})
    TweenMax.set($('#intro-animation svg').find('#rain line'), {opacity: 0})
    tl
      .fromTo($('#intro-animation svg').find('#sun > g > line'), 0.5, {scale: 0, 'transformOrigin': 'center center'}, {scale: 1, repeat: 3, yoyo: true, repeatDelay: 0.25}, '-=0.25')
      .to($('#intro-animation svg').find('#clouds path:first-child'), 0.5, {x: 0}, '-=0.25')
      .staggerTo($('#intro-animation svg').find('#clouds path:not(:first-child)'), 0.5, {x: 0}, 0.25, '-=0.5')
      .staggerFromTo($('#intro-animation svg').find('#rain line'), 0.5, {x: 0, y: 0, opacity: 0}, {x: -10, y: 6, opacity: 1, repeat: 2, repeatDelay: 0.25}, 0.025, '+=1')
      .to($('#intro-animation svg').find('#rain line'), 0.5, {opacity: 0}, '-=0.25')
      .staggerTo($('#intro-animation svg').find('#clouds path:not(:first-child)'), 0.5, {x: -200}, 0.25, '-=0.25')
      .to($('#intro-animation svg').find('#clouds path:first-child'), 0.5, {x: 200}, '-=0.5')
      .fromTo($('#intro-animation svg').find('#sun > g > line'), 0.5, {scale: 0, 'transformOrigin': 'center center'}, {scale: 1, repeat: 4, yoyo: true, repeatDelay: 0.25}, '-=0.25')
  }

    self.enter = function(option) {
      console.log('intro: enter')
      $('.view').hide()
      $('.view#ui').show()
      $('.view#intro-container').show()
      tl = new TimelineMax({ delay: 0.5 })
      APP.ui.initNav()
      introAnimation()
    }
    self.leave = function(option) {
      console.log('intro: exit')
      TweenMax.killAll()
      tl.pause(0, true)
      tl.remove()
    }

    return self;
}