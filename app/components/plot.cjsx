React = require 'react'
d3 = require 'd3'

entries = []

Plot = React.createClass
	componentDidMount:->
		mathbox = mathBox
			element: this.refs.plot
			plugins: ['core', 'cursor', 'controls']
			controls:
				klass: THREE.OrbitControls

		# // Set renderer background
		three = mathbox.three
		three.renderer.setClearColor(new THREE.Color(0xffffff), 1.0)

		# // Set mathbox units and place camera
		mathbox.set({ scale: 720, focus: 3 })
		camera = mathbox.camera({ proxy: true, position: [0, -1.0,1.1] })

		# // Create cartesian view
		view = mathbox
			.cartesian({
				range: [[-10, 10], [-10, 10], [-10, 15]],
				scale: [1,1,1],
			})

		# // 2D axes / grid
		view.axis({ axis: 1, width: 2 })
		view.axis({ axis: 2, width: 2 })
		view.axis({ axis: 3, width: 2 })
		view.grid({ width: 1, divideX: 20, divideY: 20, opacity:1 })

		r = 3

		area = view.area
			id: "main"
			width: 20
			height: 20
			axes: [0, 2]
			rangeX: [-r, r]
			rangeY: [-r, r]
			expr: (emit, x, y, i, j, time, delta) ->
				if entries.length == 0 then return
				a = entries[0][0]
				b = entries[0][1]
				c = entries[1][1]
				z = (a * x*x + 2*b*x*y + c * y*y) * 0.2
				emit x,y,z
			channels:3

		area.surface
			shaded: true
			lineX: true
			lineY: true
			color: "#51e4ff"
			width: 0.5
			opacity: 1

	render: ->
		entries = this.props.entries
		<div ref='plot' id='plot'></div>

module.exports = Plot
