Immutable = require 'immutable'
types = require '../actions/actionTypes'
_ = require 'lodash'

#reducer functions
#temporary cosntants

initialState = 
	entries: [[1,0],[0,1]]

RootReduce = (state=initialState, action)->
	switch action.type
		when types.SET_ENTRIES
			state.entries = action.entries
	state

module.exports = RootReduce