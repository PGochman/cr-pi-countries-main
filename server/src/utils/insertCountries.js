const {Country_Activity} = require("../db")
const {jsonConvert} = require("./jsonConvert")

const insertCountries = async(activity) => {
    const countrysIds = await Country_Activity.findAll({where: {ActivityId: activity.id}}) // agarro las ids de las actividades del pais

    activity.countries = [] // creo la instancia para meter las actividades

    while (countrysIds.length > 0){
        const id = jsonConvert(countrysIds.shift()).CountryId // saco la id de la actividad

        activity.countries.push(jsonConvert(id)) // meto la actividad
    }

    return activity
}

module.exports = {
    insertCountries
}