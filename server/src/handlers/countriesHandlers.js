const axios = require("axios")
const {getAllCountriesController, getCountryByIdController, getCountryByNameController} = require("../controllers/countriesControllers")

const URL = "http://localhost:5000/countries"

const getAllCountries = async (req, res) => {
    try{
        const data = (await axios(URL)).data
        const allCountries = await getAllCountriesController(data)
        res.status(200).json(allCountries)
    } catch(error) {
        res.status(500).send(error.message)
    }
    
}

const getCountryById = () => {

}

const getCountryByName = () => {

}

module.exports = {
    getAllCountries,
    getCountryById,
    getCountryByName
}