const {Country_Activity} = require("../db")
const {jsonConvert} = require("./jsonConvert")
const {getSingleActivity} = require("../controllers/activitiesControllers")

const insertActivities = async(foundCountry) => {
    const activitiesIds = await Country_Activity.findAll({where: {CountryId: foundCountry.id}}) // agarro las ids de las actividades del pais

    foundCountry = jsonConvert(foundCountry) // lo paso a un objeto normal para poder trabajar
    foundCountry.activities = [] // creo la instancia para meter las actividades

    while (activitiesIds.length > 0){
        const id = jsonConvert(activitiesIds.shift()).ActivityId // saco la id de la actividad

        const activity = await getSingleActivity(id) // traigo la actividad

        foundCountry.activities.push(jsonConvert(activity)) // meto la actividad
    }
    return foundCountry
}

module.exports = {
    insertActivities
}