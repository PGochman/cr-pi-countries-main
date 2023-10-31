const {Country} = require("../../../src/db")

const createCountry = async ({id, name, flag, continent, capital, subregion, area, population}) => {
    try {
        const [country, created] = await Country.findOrCreate({where: {id}, defaults: {name, flag, continent, capital, subregion: subregion || null, area: area || null, population}})

        if(!created){
            throw Error("Country already exists")
        }

        return "Country created successfully"

    } catch (error){
        throw Error(error.message)
    }
}

const findCountry = async({id}) => {
    try {
        const foundCountry = await Country.findOne({where: {id}})

        return foundCountry
    } catch(error) {
        throw Error(error.message)
    }
}

module.exports = {
    createCountry,
    findCountry
}