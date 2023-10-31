const {Country, Activity, Country_Activity} = require("../../../src/db")

const getCountriesByActivityName = async(name) => {
    const activity = (await Activity.findOne({where: {name}})).dataValues
    
    const CountryActivityRelations = (await Country_Activity.findAll({where: {ActivityId: activity.id}}))
    const countries = []

    CountryActivityRelations.forEach((register) => {
        countries.push(register.dataValues.CountryId)
    })

    return countries
}

const getActivitiesByCountryId = async(id) => {
    const CountryActivityRelations = (await Country_Activity.findAll({where: {CountryId: id}}))
    let activitiesIds = []
    const activities = []

    CountryActivityRelations.forEach((register) => {
        activitiesIds.push(register.dataValues.ActivityId)
    })

    while(activitiesIds.length > 0){
        const id = activitiesIds.shift()
        const activity = await Activity.findByPk(id)
        activities.push(activity)
    }

    return activities
}

module.exports = {
    getCountriesByActivityName,
    getActivitiesByCountryId
}