types = require './actionTypes'

module.exports = 
	setNumSignals: (num_signals)->
		{type: types.SET_NUM_SIGNALS, num_signals}

