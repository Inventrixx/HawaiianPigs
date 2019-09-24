import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
//import data from '../../wild-pig-data.json'
import {totalMaxValuePopulation} from '../helpers'
import Axes from './Axes/Axes'
import Bars from './Bars/Bars'

class BarChart extends Component {
    constructor(props){
        super(props)


        //this.data = this.props.data
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

    UNSAFE_componentWillMount() {
   
    }

   

    render(){
        const {data, maxValue} = this.state
        const maxValueOnAxisY = totalMaxValuePopulation(this.props.data)
        const margins = { top: 50, right: 20, bottom: 100, left: 60 }
        const svgDimensions = { width: 800, height: 500 }

       
        

        const xScale = this.xScale
        .padding(0.5)
        // scaleBand domain should be an array of specific values
        .domain(data.map(d => d.island))
        .range([margins.left, svgDimensions.width - margins.right])
    
       // scaleLinear type
      const yScale = this.yScale
         // scaleLinear domain required at least two values, min and max       
        .domain([0, maxValueOnAxisY])
        .range([svgDimensions.height - margins.bottom, margins.top])
        return(
            
            <div className='container'>
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
          </div>
        )
    }
}

export default BarChart