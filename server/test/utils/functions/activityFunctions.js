const {Activity} = require("../../../src/db")

const createActivity = async({name, difficulty, duration, season, countries}) => {
    try{
        const [activity, created] = await Activity.findOrCreate({where: {name}, defaults: {difficulty, duration: duration || null, season}})

        if(!created) throw Error("Activity already exists")

        countries.forEach(async(country) => {
            await activity.addCountry(country)
        })

        return "Activity created successfully"
    } catch(error) {
        throw Error(error.message)
    }
}

const findActivity = async({name}) => {
    try {
        const foundActivity = await Activity.findOne({where: {name}})

        return foundActivity
    } catch(error) {
        throw Error(error.message)
    }
}

module.exports = {
    createActivity,
    findActivity
}