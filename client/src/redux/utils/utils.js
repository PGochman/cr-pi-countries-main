export const orderSelectedCountries = (state, payload) => {
    const parameter = payload.parameter
    if(!parameter || parameter == "All"){
        return state.filteredCountries
    }
    if(!Array.isArray(state.filteredCountries)){
        return state.filteredCountries
    }
    const orderedCountries = payload.ascendant ?
    state.filteredCountries.sort((a, b) => {
        if(typeof(a[parameter])  == "string"){
            return a[parameter].localeCompare(b[parameter])
        }
        return a[parameter] - b[parameter]
    }) : 
    state.filteredCountries.sort((a, b) => {
        if(typeof(a[parameter])  == "string"){
            return b[parameter].localeCompare(a[parameter])
        }
        return b[parameter] - a[parameter]
    })
    return orderedCountries
}

export const filterCountries = (countries, filters) => {
    let filteredCountries = countries
    if(!Array.isArray(filteredCountries)) return filteredCountries
    for (let filter in filters) {
        if(filters[filter] == "All" || !filters[filter]) continue
        filteredCountries = filteredCountries.filter((country) => {
            if(Array.isArray(filters[filter])){
                return filters[filter].includes(country[filter])
            }
            return country[filter] == filters[filter]
        })
    }
    if(filteredCountries.length == 0){
        return "Country not found, please try again"
    }
    return filteredCountries
}
