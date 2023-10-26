export const orderSelectedCountries = (state, payload) => {
    const parameter = payload.parameter
    if(parameter == "All"){
        return state.filteredCountries
    }
    if(!Array.isArray(state.filteredCountries)){
        return state.filteredCountries
    }
    const orderedCountries = payload.ascendant ?
    state.filteredCountries.sort((a, b) => {
        if(a[parameter] > b[parameter]){
            return 1
        }
        return -1
    }) : 
    state.filteredCountries.sort((a, b) => {
        if(a[parameter] < b[parameter]){
            return 1
        }
        return -1
    })
    return orderedCountries
}

export const filterCountries = (countries, payload) => {
    let filteredCountries = countries
    if(!Array.isArray(filteredCountries)) return filteredCountries
    for (let filter in payload) {
        if(payload[filter] == "All" || !payload[filter]) continue
        filteredCountries = filteredCountries.filter((country) => {
            if(Array.isArray(payload[filter])){
                return payload[filter].includes(country[filter])
            }
            return country[filter] == payload[filter]
        })
    }
    return filteredCountries
}
