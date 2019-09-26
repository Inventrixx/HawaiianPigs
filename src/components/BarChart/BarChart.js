import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import {totalMaxValuePopulation} from '../helpers'
import Axes from './Axes/Axes'
import Bars from './Bars/Bars'
import ResponsiveWrapper from '../ResponsiveWrapper/ResponsiveWrapper'

class BarChart extends Component {
    constructor(props){
        super(props)

        this.xScale = scaleBand()
        this.yScale = scaleLinear()
       
        this.state = {
            data: [],
        }    
    }

    componentDidMount() {
        const {year, data} = this.props
        const maxValue = Math.max(...data.map(d => d.pigPopulation))
        this.setState({data: data.filter(item => item.year === year), maxValue: maxValue})  
    }

    componentDidUpdate(prevProps) {
        const {year, data} = this.props
        if (prevProps.year !== this.props.year) {
            this.setState({data: data.filter(item => item.year === year)})
        }
    }

    render(){
        const {data, maxValue} = this.state
        const {parentWidth} = this.props
        //Fix max value on axis, so the transitions are only for bars
        const maxValueOnAxisY = totalMaxValuePopulation(this.props.data)
        const margins = { top: 50, right: 20, bottom: 100, left: 60 }
        const svgDimensions = { width: parentWidth, height: 500 }

        const xScale = this.xScale
        .padding(0.5)
        // the domain for my xAxes would be the arr of the names' Islands
        .domain(data.map(d => d.island))
        .range([margins.left, svgDimensions.width - margins.right])
    
        const yScale = this.yScale     
        .domain([0, maxValueOnAxisY])
        .range([svgDimensions.height - margins.bottom, margins.top])
        
        return(
            <div>
            <svg width={svgDimensions.width} height={svgDimensions.height}>
               <Axes 
               scales={{xScale, yScale}}
               svgDimensions={svgDimensions}
               margins={margins}
               />
                <Bars
                scales={{xScale, yScale}}
                maxValue={maxValue}
                data={data}
                margins={margins}
                svgDimensions={svgDimensions}
                />
         </svg>
          </div>
        )
    }
}

export default  ResponsiveWrapper(BarChart)