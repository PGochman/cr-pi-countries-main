const {Country} = require("../db")

const getAllCountriesController = async (countriesArray) => {
    countriesArray.map(async(country) => {
        const id = country.cca3
        const name = country.name.common
        const flag = country.flags.png
        const continent = country.region
        const capital = country.capital ? country.capital[0] : "does not have a capital"
        const subregion = country.subregion || null
        const area = country.area || null
        const population = country.population
        
        await Country.findOrCreate({where: {id, name, flag, continent, capital, subregion, area, population}})
        
    })

    const allCountries = await Country.findAll()

    return allCountries
}

const findCountry = async (parameter) => {
    let foundCountry = await Country.findByPk(parameter)
    if(foundCountry == null){
        foundCountry = await Country.findOne({where: {name: parameter}})
    }

    return foundCountry
}

module.exports = {
    getAllCountriesController,
    findCountry
}