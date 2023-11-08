const {Country} = require("../db")
const {Op} = require("sequelize")
const {insertActivities} = require("../utils/insertActivity")

const getAllCountriesController = async () => {
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
    foundCountry = await Country.findAll({where: {name: {[Op.iLike]: `%${parameter}%`}}})
    
    return foundCountry.length > 0 ? foundCountry : null
}

const getAllContinents = async() => {
    const allCountries = await getAllCountriesController()
    const continents = {}
    allCountries.forEach(({continent, subregion}) => {
        if(!continents[continent]){
            continents[continent] = [subregion]
        }
        if(!continents[continent].includes(subregion)){
            continents[continent] = [...continents[continent], subregion]
        }
    })
    return continents
}



module.exports = {
    getAllCountriesController,
    findCountry,
    getAllContinents,
}