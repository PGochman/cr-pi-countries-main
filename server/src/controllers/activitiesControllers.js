const {Activity} = require("../db")

const createActivity = async (name, difficulty, duration, season) => {
    const [activity, created] = await Activity.findOrCreate({where: {name}, defaults: {difficulty, duration, season}})

    if(!created) return "Activity already exists"

    return "Activity created successfully"
}

const getActivities = async () => {
    const allActivities = await Activity.findAll()

    return allActivities
}

module.exports = {
    createActivity,
    getActivities
}