const {Country} = require("../db")
const {Op} = require("sequelize")
const {insertActivities} = require("../generalFunctions/insertActivity")

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
    foundCountry = await Country.findAll({where: {name: {[Op.substring]: parameter}}})
    
    return foundCountry.length > 0 ? foundCountry : null
}

module.exports = {
    getAllCountriesController,
    findCountry
}