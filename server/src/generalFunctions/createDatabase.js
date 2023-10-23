const {Country} = require("../db")
const axios = require("axios")

const URL = "http://localhost:5000/countries"

const createDatabase = async() => {
    try{
        const data = (await axios(URL)).data

        data.map(async(country) => {
            const id = country.cca3
            const name = country.name.common.toLowerCase()
            const flag = country.flags.png
            const continent = country.region
            const capital = country.capital ? country.capital[0] : "does not have a capital" // hay un par que no tienen capital, y no puede quedar nulo 
            const subregion = country.subregion || null
            const area = country.area || null
            const population = country.population
            
            await Country.findOrCreate({where: {id, name, flag, continent, capital, subregion, area, population}})
        })
    } catch(error) {
        throw Error(error.message)
    }
}

module.exports = {
    createDatabase
}