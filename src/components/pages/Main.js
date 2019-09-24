import React, { Component } from 'react'
import BarChart from '../BarChart/BarChart'
import pigData from '../../wild-pig-data.json'
import * as queryString from 'query-string'
import './styles/styles.css'

let progressChart

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedYear: '',
            years: [],
            minYear: '',
            maxYear: ''
        }
        console.log(queryString.parse(this.props.location.search))
    }

    componentDidMount() {
        const yearList = pigData["PIG POPULATIONS"]
                        .map(item => item.year)

        const filterYearList = yearList.filter((year, index) => {
           return yearList.indexOf(year) === index
        })
        const minYear = Math.min(...filterYearList)
        const maxYear = Math.max(...filterYearList)

        this.setState({
            years: filterYearList, 
            selectedYear: filterYearList[0], 
            minYear: minYear, 
            maxYear: maxYear
        })

}

    UNSAFE_componentWillMount () {
        const {paused, year} = queryString.parse(this.props.location.search)
        const parseYear = parseInt(year, 10)
        const isPaused = paused ? paused === 'true' : false

        this.setState({isPaused, selectedYear: parseYear})
        console.log(parseYear)
    }

    changeSelectedYear = () => {
        const {selectedYear, maxYear, years} = this.state

       const indexSelectedYear = years.indexOf(selectedYear) 

       selectedYear < maxYear ? this.setState({selectedYear: years[indexSelectedYear + 1]}) 
                              : this.setState({selectedYear: years[0]})
    }

    startGraphic = () => progressChart = setInterval(() => {this.changeSelectedYear()}, 2000)

    stopGraphic = () => clearInterval(progressChart)
    

    onClickPaused = () => {

        const {isPaused} = this.state
     
        this.setState({isPaused: !isPaused}, () => {
            this.state.isPaused ? this.startGraphic() : this.stopGraphic()
        })
            
        
   }    


    render(){
        const { isPaused, selectedYear} = this.state
        console.log(isPaused, selectedYear)
        return (
            <div className='main-container'>
                <div className='title'>
                    <h1>{selectedYear}</h1>
                </div>
            <BarChart 
            data={pigData["PIG POPULATIONS"]} 
            paused={isPaused}
            year={selectedYear}
            {...this.props}/>
            <div className='playPause-container'>
                <button onClick={this.onClickPaused}>{!isPaused ? 'Play' : 'Pause'}</button>
            </div>
            </div>
        )
    }
   
}

export default Main