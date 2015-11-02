Immutable = require 'immutable'
types = require '../actions/actionTypes'
_ = require 'lodash'

#reducer functions
#temporary cosntants

initialState = 
	entries: [[1,0],[0,1]]

RootReduce = (state=initialState, action)->
	{entries} = state
	switch action.type
		when types.SET_ENTRIES
			entries = action.entries
	{entries}

module.exports = RootReduce