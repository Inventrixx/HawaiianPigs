export const  arrYearFiltered = (data) => {
    const yearList = data.map(item => item.year)

    const yearListFiltered = yearList.filter((year, index) => {
        return yearList.indexOf(year)=== index
    })
    return yearListFiltered
}


export const totalMaxValuePopulation = data => Math.max(...data.map(d => d.pigPopulation))

// Since we'll be getting a string from params, we have to return an integer
export const validateYear = (year, minYear) => {
    const yearParam = parseInt(year, 10) // using radix parameter to specify which numeral system to be used 
    return yearParam && yearParam >= minYear ? yearParam : minYear
}

export const roundNumbers = number => Math.round(number*100)/100