import React, {Component} from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

class Bars extends Component {

    constructor(props) {
        super(props)

   
    this.colorScale = scaleLinear()
        .domain([0, 14000])
        
        .range(['#F3E5F5', '#7B1FA2'])
        .interpolate(interpolateLab)

    }
    render() {
        const {scales, data, margins, svgDimensions} = this.props
        const {xScale, yScale} = scales
        const {height} = svgDimensions

        const bars = (

            data.map((datum, i) => 
                <rect
                key={i}
                x={xScale(datum.island)}
                y={yScale(datum.pigPopulation)}
                height={height - margins.bottom - scales.yScale(datum.pigPopulation)}
                width={xScale.bandwidth()}
                fill={this.colorScale(datum.pigPopulation)}
                />
                )
        )
        return( 
            <g>{bars}</g>
        )
    }

}


export default Bars