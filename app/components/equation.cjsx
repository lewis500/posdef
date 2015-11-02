React = require 'react'

Equation = React.createClass
	render: ->
		A = this.props.entries
		asdf = "\gamma * #{A[0][0]}"
		# console.log asdf

		# <div ref='eq'></div>

module.exports = Equation
