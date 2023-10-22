const {Country} = require("../db")

const getAllCountriesController = async (countriesArray) => {
    countriesArray.map(async(country) => {
        const id = country.cca3
        const name = country.name.common
        const flag = country.flags.png
        const continent = country.region
        const capital = country.capital ? country.capital[0] : "does not have a capital"
        const subregion = country?.subregion
        const area = country?.area
        const population = country.population
        
        try {
            await Country.findOrCreate({where: {id, name, flag, continent, capital, subregion, area, population}})
        } catch(error){
            throw Error(error.message)
        }
        
    })

    const allCountries = await Country.findAll()

    return allCountries
}

const getCountryByIdController = (id) => {

}

const getCountryByNameController = (name) => {
    
}

module.exports = {
    getAllCountriesController,
    getCountryByIdController,
    getCountryByNameController
}