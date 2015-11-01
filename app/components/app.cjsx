React = require 'react'
{assign} = require 'lodash'
{connect} = require 'react-redux'
{bindActionCreators} = require 'redux'
ActionCreators = require '../actions/actionCreators'
Matrix = require './matrix'

App = React.createClass
	render: ->
		<Matrix setEntries={this.props.actions.setEntries} />
    # (<div></div>)

mapStateToProps = (state)->
	assign {}, state

mapDispatchToProps = (dispatch)->
	res = 
		actions: bindActionCreators ActionCreators,dispatch

module.exports = connect(mapStateToProps,mapDispatchToProps)(App)