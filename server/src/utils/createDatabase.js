const {Country, Activity} = require("../db")
const axios = require("axios")

const URL_COUNTRIES = "http://localhost:5000/countries"
const URL_ACTIVITIES = "http://localhost:3001/activities"
const activities = [
    {
        name: "Rock climbing",
        difficulty: 3,
        duration: 2.5,
        season: "Summer",
        countries: ["PAN", "TKM", "ARG"]
    },
    {
        name: "Bike ridding",
        difficulty: 4,
        duration: 5,
        season: "Winter",
        countries: ["PAN", "TKM", "ARG", "KEN"]
    },
    {
        name: "Bird sighting",
        difficulty: 3,
        duration: 2.5,
        season: "Summer",
        countries: ["TKM", "KEN"]
    },
]

const createDatabase = async() => {
    try{
        const data = (await axios(URL_COUNTRIES)).data

        data.map(async(country) => {
            const id = country.cca3
            const name = country.name.common
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

    try {
        activities.map(async(country) => {
           await axios.post(URL_ACTIVITIES, country) 
        })
    } catch (error){
        throw Error(error.message)
    }

    
}

module.exports = {
    createDatabase
}