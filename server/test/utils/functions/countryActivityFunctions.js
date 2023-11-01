const {Country, Activity, Country_Activity} = require("../../../src/db")

const getCountriesByActivityName = async(name) => {
    const activity = await Activity.findOne({where: {name}})

    if(!activity) throw Error("There are no activities with that name")
    
    const CountryActivityRelations = (await Country_Activity.findAll({where: {ActivityId: activity.dataValues.id}}))
    const countries = []

    if(!CountryActivityRelations) throw Error("There are no countries related to that activity")

    CountryActivityRelations.forEach((register) => {
        countries.push(register.dataValues.CountryId)
    })

    return countries
}

const getActivitiesByCountryId = async(id) => {
    const country = await Country.findOne({where: {id}})
    if(!country) throw Error("There are no countries with that id")
    const CountryActivityRelations = (await Country_Activity.findAll({where: {CountryId: id}}))
    let activitiesIds = []
    const activities = []

    if(!CountryActivityRelations) throw Error("There are no activities related to that country")

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