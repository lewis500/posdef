React = require 'react'
{assign} = require 'lodash'
{connect} = require 'react-redux'
{bindActionCreators} = require 'redux'
ActionCreators = require '../actions/actionCreators'

App = React.createClass
	render: ->
    (<div></div>)

mapStateToProps = (state)->
	assign {}, state

mapDispatchToProps = (dispatch)->
	res = 
		actions: bindActionCreators ActionCreators,dispatch

module.exports = connect(mapStateToProps,mapDispatchToProps)(App)