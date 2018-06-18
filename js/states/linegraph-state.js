function LinegraphState() {

  self = this

  var titles = [
                    'Precipitazioni annuali',
                    'Temperatura annuale',
                    'Temperatura invernale',
                    'Temperatura estiva',
                    'Precipitazioni estive'
                  ]

  var messages = [
                    'Il 1915 è stato l\'anno più piovoso, il 1945 quello più secco.',
                    'Il 1994 è stato l\'anno più caldo, il 1940 quello più freddo.',
                    'L\'inverno più mite è stato nel 1955, il più freddo nel 1929',
                    'L\'estate più calda è stata nel 2003, quella più fredda nel 1940',
                    'L\'estate più secca è stata nel 1928, quella più umida nel 1934'
                  ]

  var text = [
                    'Nonostante alcuni anni abbiano avuto dei picchi molto elevati di precipitazione, come ad esempio il 1918, nel 1915 le precipitazioni sono state più costanti: in particolare sono state massime durante l\'inverno. Di contro il 1945 ha avuto precipitazioni nella media durante l\'inverno, ma è stato particolarmente secco nelle altre stagioni.',
                    'Sebbene il 2003 abbia avuto un\'estate più calda del 1994, quest\'ultimo ha visto temperature piuttosto elevate anche durante i mesi invernali. Il 2003 ha invece offerto un inverno più rigido della media. Il 1940 è stato invece un anno molto rigido sia in estate che in inverno.',
                    'Mentre non c\'è un inverno che abbia presentato picchi di temperatura particolarmente elevati, il 1929 ha avute medie record di gelo nei primi mesi dell\'anno',
                    'Il 2003 spicca con temperature medie particolarmente elevate in tutti i mesi estivi',
                    'Nonostante le temperature record, l\'estate del 2003 non è stata particolamente secca: la palma in questo caso spetta per distacco al 1928. Il 1934 invece vince di misura quella dell\'estate più umida, nonostante un mese di Luglio relativamente poco piovoso.'
                  ]

  function updateCopy(state) {
    $('header h1').text(titles[state.slice(-1)])
    $('header h3').text(messages[state.slice(-1)])
    $('header p').text(text[state.slice(-1)])
  }

	self.enter = function(option) {
    console.log('linegraph: enter')
    $('#intro-container').hide()
    $('#linegraph-container').fadeIn()
	}
	self.leave = function(option) {
    console.log('linegraph: exit')
	}

  self.linegraph0 = {
    enter: function (option) {
      console.log('linegraph0: enter')
      updateCopy(option.params)
      APP.ui.updateNav(option.params)
      APP.currentLineGraph.updateLine(APP.type)
    },
    leave: function (option) {
      console.log('linegraph0: enter')
    }
  }

  self.linegraph1 = {
    enter: function (option) {
      console.log('linegraph1: enter')
      updateCopy(option.params)
      APP.spanNumber = 0
      APP.currentLineGraph.updateLine("tas")
    },
    leave: function (option) {
      console.log('linegraph1: enter')
    }
  }

  self.linegraph2 = {
    enter: function (option) {
      console.log('linegraph2: enter')
      updateCopy(option.params)
      APP.spanNumber = 1
      APP.currentLineGraph.updateStats(APP.spanNumber)
    },
    leave: function (option) {
      console.log('linegraph2: enter')
    }
  }

  self.linegraph3 = {
    enter: function (option) {
      console.log('linegraph3: enter')
      updateCopy(option.params)
      APP.ui.updateNav(option.params)
      APP.spanNumber = 2
      APP.currentLineGraph.updateStats(APP.spanNumber)
      APP.currentLineGraph.updateLine("tas")
    },
    leave: function (option) {
      console.log('linegraph3: enter')
    }
  }

  self.linegraph4 = {
    enter: function (option) {
      console.log('linegraph4: enter')
      updateCopy(option.params)
      APP.ui.updateNav(option.params)
      APP.spanNumber = 2;
      APP.currentLineGraph.updateLine("pr")
    },
    leave: function (option) {
      console.log('linegraph4: enter')
    }
  }

	return self;
}