React = require 'react'

###
receives label, value, onChange,max,min,step
###


Slider = React.createClass
	render: ->
		{value,label,onChange,max,min,step} = this.props
		<div flex>
			<input type="range" value={value} max={max} min={min} step={step} onChange={onChange}/> {label}:{value}
		</div>

module.exports = Slider
