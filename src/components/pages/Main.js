import React, { Component } from 'react'
import BarChart from '../BarChart/BarChart'
import pigData from '../../wild-pig-data.json'
import ProgressBar from '../ProgressBar/ProgressBar'
import {validateYear, arrYearFiltered} from '../helpers'
import * as queryString from 'query-string'
import './styles/styles.css'

import Box from '@material-ui/core/Box';

//constants
const ADD_ONE_YEAR = 1


let progressBarChart

class Main extends Component {
    constructor(props){
        super(props)
       
        //retrieve data from json
        this.data = pigData['PIG POPULATIONS']
        const minYear = Math.min(...arrYearFiltered(this.data))
        const maxYear = Math.max(...arrYearFiltered(this.data))

        const howManyYears = arrYearFiltered.length

        const progressPercent = (100/howManyYears) * 100

        this.state = {
            years: [],
            minYear: minYear,
            maxYear: maxYear,
            progress: progressPercent
        }

    }


    UNSAFE_componentWillMount () {
        //retrieve data from params
        const {data} = this
        const {minYear} = this.state
        const {paused, year} = queryString.parse(this.props.location.search)
        const isPaused = paused ? paused === 'true' : false
        const yearsFiltered = arrYearFiltered(data)
        this.setState({isPaused, selectedYear: validateYear(year, minYear), years: yearsFiltered})
    }

    componentDidMount() {
    
        const {isPaused} = this.state
        if(isPaused === true) {
          this.startGraphic()
        } 
    }

    startGraphic = () => progressBarChart = setInterval(() => {this.changeSelectedYear()}, 2000)

    stopGraphic = () => clearInterval(progressBarChart)

    changeSelectedYear = () => {
       const {selectedYear, years, minYear, maxYear} = this.state
 
       const indexSelectedYear = years.indexOf(selectedYear) 


       if(selectedYear < maxYear) {
           this.setState({selectedYear: years[indexSelectedYear + ADD_ONE_YEAR]}) 
        } else {
            this.setState({selectedYear: minYear, isPaused: false})
            this.stopGraphic()
        }
                          
    }

    onClickPaused = () => {

        const {isPaused} = this.state
     
        this.setState({isPaused: !isPaused}, () => {
            this.state.isPaused ? this.startGraphic() : this.stopGraphic()
        })    
        
   }    

    render(){
        const {data} = this
        const { isPaused, selectedYear} = this.state
        const yearsTitleToString = String(selectedYear)
        return (
            <div>
            <Box display="flex" p={1} justifyContent="center">
                <div className='main-container'>
                    <div className='title'>
                        <h1>{yearsTitleToString}</h1>
                    </div>
                <BarChart 
                    {...this.props}
                    data={data} 
                    paused={isPaused}
                    year={selectedYear}
                />
                <ProgressBar className='progress-bar' variant='determinate' />
                <div className='playPause-container'>
                    <button onClick={this.onClickPaused}>{!isPaused ? 'Play' : 'Pause'}</button>
                </div>
           
                </div>
            </Box>
                
            </div>
        )
    }
   
}

export default Main