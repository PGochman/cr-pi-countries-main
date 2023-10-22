const axios = require("axios")
const {getAllCountriesController, getCountryByIdController, getCountryByNameController, findCountry} = require("../controllers/countriesControllers")

const URL = "http://localhost:5000/countries"

const getAllCountries = async (req, res) => {
    try{
        const data = (await axios(URL)).data
        const allCountries = await getAllCountriesController(data)
        return res.status(200).json(allCountries)
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
    
}

const getCountryById = async (req, res) => {
    const {idPais} = req.params

    try {
        const foundCountry = await(findCountry(idPais))

        return res.status(200).json(foundCountry)
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
}

const getCountryByName = async (req, res) => {   
    const queryName = req.query.name
    const name = queryName.at(0).toUpperCase() + queryName.slice(1).toLowerCase()
    console.log(name)

    try {
        const foundCountry = await(findCountry(name))

        res.status(200).json(foundCountry)
    } catch (error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllCountries,
    getCountryById,
    getCountryByName
}