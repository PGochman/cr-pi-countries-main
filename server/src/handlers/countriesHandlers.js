const axios = require("axios")
const {getAllCountriesController, findCountry} = require("../controllers/countriesControllers")



const getAllCountries = async (req, res) => {
    try{
        const allCountries = await getAllCountriesController()
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
    const name = req.query.name.toLowerCase()

    try {
        const foundCountry = await findCountry(name)

        if(foundCountry == null){
            console.log("dejisaonC")
            return res.status(200).json("Country not found, please try again")
        }

        return res.status(200).json(foundCountry)
    } catch (error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllCountries,
    getCountryById,
    getCountryByName
}