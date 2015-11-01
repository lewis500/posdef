React = require 'react'
{assign} = require 'lodash'
PureRenderMixin = require 'react-addons-pure-render-mixin'
{connect} = require 'react-redux'
{bindActionCreators} = require 'redux'
ActionCreators = require '../actions/actionCreators'

App = React.createClass
	render: ->

mapStateToProps = (state)->
	assign {}, state

mapDispatchToProps = (dispatch)->
	res = 
		actions: bindActionCreators ActionCreators,dispatch

module.exports = connect(mapStateToProps,mapDispatchToProps)(App)