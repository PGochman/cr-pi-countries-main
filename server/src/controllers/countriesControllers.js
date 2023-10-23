const {Country, Country_Activity} = require("../db")
const {Op} = require("sequelize")
const {getSingleActivity} = require("./activitiesControllers")

const getAllCountriesController = async (countriesArray) => {
    countriesArray.map(async(country) => {
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

    const allCountries = await Country.findAll()

    return allCountries
}

const findCountry = async (parameter) => {
    let foundCountry = await Country.findByPk(parameter)
    if(foundCountry !== null){
        foundCountry = await insertActivities(foundCountry) // funcion para ordenar un poco el archivo
        return foundCountry
    }

    // si el parametro no es un id, busca por nombre
    foundCountry = await Country.findAll({where: {name: {[Op.substring]: parameter}}})
    
    return foundCountry.length > 0 ? foundCountry : null
}

const insertActivities = async(foundCountry) => {
    const activitiesIds = await Country_Activity.findAll({where: {CountryId: foundCountry.id}}) // agarro las ids de las actividades del pais

    foundCountry = jsonConvert(foundCountry) // lo paso a un objeto normal para poder trabajar
    foundCountry.activities = [] // creo la instancia para meter las actividades

    while (activitiesIds.length > 0){
        const id = jsonConvert(activitiesIds.shift()).ActivityId // saco la id de la actividad

        const activity = await getSingleActivity(id) // traigo la actividad

        foundCountry.activities.push(jsonConvert(activity)) // meto la actividad
    }
    return foundCountry
}

const jsonConvert = (value) => {
    return JSON.parse(JSON.stringify(value))
}


module.exports = {
    getAllCountriesController,
    findCountry
}