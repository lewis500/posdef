types = require './actionTypes'

module.exports = 
	setEntries: (entries)->
		{type: types.SET_ENTRIES, entries}
