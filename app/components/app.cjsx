#MAKE THE MAIN COMPONENT
React = require 'react'
Matrix = require './matrix'
Plot = require './plot'

App = React.createClass
	render: ->
		<div>
			<Matrix setEntries={this.props.actions.setEntries} />
			<Plot entries={this.props.entries} /> 
		</div>

#WIRE THINGS UP FORE REDUX
{assign} = require 'lodash'
{connect} = require 'react-redux'
{bindActionCreators} = require 'redux'
ActionCreators = require '../actions/actionCreators'

mapStateToProps = (state)->
	assign {}, state

mapDispatchToProps = (dispatch)->
	res = 
		actions: bindActionCreators ActionCreators,dispatch

#EXPORT IT
module.exports = connect(mapStateToProps,mapDispatchToProps)(App)