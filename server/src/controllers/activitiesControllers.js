const {Activity, Country} = require("../db")

const createActivity = async (name, difficulty, duration, season, countries) => {
    const [activity, created] = await Activity.findOrCreate({where: {name}, defaults: {difficulty, duration, season}})

    if(!created) return "Activity already exists"

    countries.map(async (country) => {
       await activity.addCountry(country)
    })

    return "Activity created successfully"
}

const getActivities = async () => {
    const allActivities = await Activity.findAll()

    return allActivities
}

const getSingleActivity = async (id) => {
    const activity = await Activity.findByPk(id)

    return activity
}

module.exports = {
    createActivity,
    getActivities,
    getSingleActivity
}