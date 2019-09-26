import React, { Component } from 'react'
import BarChart from '../BarChart/BarChart'
import pigData from '../../wild-pig-data.json'
import ProgressBar from '../ProgressBar/ProgressBar'
import {validateYear, arrYearFiltered, roundNumbers} from '../helpers'
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

        const howManyYears = (arrYearFiltered(this.data).length)

        const percentPerYear = roundNumbers(100/howManyYears)

        this.state = {
            years: [],
            minYear: minYear,
            maxYear: maxYear,
            percentPerYear: percentPerYear,
            progress: percentPerYear
        }

    }

    progressCalculator(selectedYear) {

        const {minYear, percentPerYear, progress} = this.state
        console.log(percentPerYear)
        let howMuchProgress = selectedYear - minYear + 1

        let howMuchProgressPercent = howMuchProgress * percentPerYear

        return minYear < selectedYear ? howMuchProgressPercent : progress
    }


    UNSAFE_componentWillMount () {
        //retrieve data from params
        const {data} = this
        const {minYear} = this.state
        const {paused, year} = queryString.parse(this.props.location.search)
        const isPaused = paused ? paused === 'true' : false
        const yearsFiltered = arrYearFiltered(data)
        const selectedYear = validateYear(year, minYear)
        const progress = this.progressCalculator(selectedYear)
        console.log(progress)

        this.setState({
            isPaused, 
            selectedYear: validateYear(year, minYear), 
            years: yearsFiltered,
            progress: progress
        })
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
       const {selectedYear, years, minYear, maxYear, progress, percentPerYear} = this.state
 
       const indexSelectedYear = years.indexOf(selectedYear) 


       if(selectedYear < maxYear) {
           this.setState({selectedYear: years[indexSelectedYear + ADD_ONE_YEAR], 
                          progress: progress + percentPerYear}) 
        } else {
            this.setState({selectedYear: minYear, isPaused: false, progress: percentPerYear})
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
        const { isPaused, selectedYear, progress} = this.state
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
                <ProgressBar progress={progress} variant='determinate' />
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