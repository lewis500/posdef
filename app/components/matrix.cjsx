React = require 'react'
d3 = require 'd3'

local_entries = [
	[1,0],
	[0,1]
]

matrix = new d3.svg.matrix()
		.data local_entries
		.mapping([
				["a", "b"],
				["b", "c"]
		])
		.cellWidth(40)
		.cellHeight(40)
		.margin([10, 10])

Matrix = React.createClass
	componentDidMount:->
		matrix.update d3.select this.refs.mainGroup
		matrix.on 'change', =>
			this.props.setEntries local_entries

	render: ->
		{entries} = this.props
		<svg width='100%' height='200px'>
			<g transform='translate(20,30)' ref='mainGroup'></g>
		</svg>

module.exports = Matrix
