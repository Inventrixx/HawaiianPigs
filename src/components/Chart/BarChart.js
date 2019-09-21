import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import data from '../../wild-pig-data.json'
import Axes from '../Chart/Axes/Axes'
import Bars from '../Chart/Bars/Bars'

class BarChart extends Component {
    constructor(props){
        super(props)


        this.data = data['PIG POPULATIONS']
        this.xScale = scaleBand()
        this.yScale = scaleLinear()

    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render(){
        const {data} = this
        const margins = { top: 50, right: 20, bottom: 100, left: 60 }
        const svgDimensions = { width: 800, height: 500 }

        const maxValue = Math.max(...data.map(d => d.pigPopulation))


        const xScale = this.xScale
        .padding(0.5)
        // scaleBand domain should be an array of specific values
        .domain(data.map(d => d.island))
        .range([margins.left, svgDimensions.width - margins.right])
    
       // scaleLinear type
      const yScale = this.yScale
         // scaleLinear domain required at least two values, min and max       
        .domain([0, maxValue])
        .range([svgDimensions.height - margins.bottom, margins.top])

        return(
            <svg width={svgDimensions.width} height={svgDimensions.height}>
            <Bars
            scales={{xScale, yScale}}
            maxValue={maxValue}
            data={data}
            margins={margins}
            svgDimensions={svgDimensions}
             />
            <Axes 
            scales={{xScale, yScale}}
            svgDimensions={svgDimensions}
            margins={margins}
            />
         </svg>
        )
    }
}

export default BarChart