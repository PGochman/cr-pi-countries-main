const {Activity, Country_Activity} = require("../db")
const {jsonConvert} = require("../utils/jsonConvert")
const {insertCountries} = require("../utils/insertCountries")

const createActivity = async (name, difficulty, duration, season, countries) => {
    const [activity, created] = await Activity.findOrCreate({where: {name}, defaults: {difficulty, duration, season}})
 
    if(!created) throw Error("Activity already exists, try with a new one")

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

const updateActivityInfo = async({name, difficulty, season, duration, countries}) => {

    await Activity.update({difficulty, season, duration: duration || null}, {where: {name}})

    const activity = await Activity.findOne({ where: { name } });

    if (activity) {
        const activityCountries = await activity.getCountries();

        const activityCountryIds = activityCountries.map((country) => country.id);

        const countriesToAdd = countries.filter((country) => !activityCountryIds.includes(country));
        const countriesToRemove = activityCountryIds.filter(countryId => !countries.includes(countryId));

        await activity.addCountries(countriesToAdd);
        await activity.removeCountries(countriesToRemove);
    }

    return "Activity updated successfully"
}

const destroyActivity = async(name) => {
    console.log(name)
    await Activity.destroy({where: {name}})

    return "Activity deleted with success"
}

module.exports = {
    createActivity,
    getActivities,
    getSingleActivity,
    updateActivityInfo,
    destroyActivity
}