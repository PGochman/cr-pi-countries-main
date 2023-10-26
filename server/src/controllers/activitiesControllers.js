const {Activity, Country_Activity} = require("../db")
const {jsonConvert} = require("../utils/jsonConvert")
const {insertCountries} = require("../utils/insertCountries")

const createActivity = async (name, difficulty, duration, season, countries) => {
    const [activity, created] = await Activity.findOrCreate({where: {name}, defaults: {difficulty, duration, season}})
 
    if(!created) return "Activity already exists"

    countries.map(async (country) => {
       await activity.addCountry(country)
    })

    return "Activity created successfully"
}

const getActivities = async () => {
    const allActivities = jsonConvert(await Activity.findAll())

    const activityWithCountries = []

    while(allActivities.length > 0){
        const activity = allActivities.shift()
        await insertCountries(activity).then((data) => {
            activityWithCountries.push(data)
        })
    }
    
    return activityWithCountries
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