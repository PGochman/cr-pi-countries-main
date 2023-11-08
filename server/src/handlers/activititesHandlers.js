const {createActivity, getActivities, updateActivityInfo, destroyActivity} = require("../controllers/activitiesControllers")

const postActivity = async (req, res) => {
    const {name, difficulty, duration, season, countries} = req.body

    try {
        const response = await createActivity(name, difficulty, duration || null, season, countries)

        return res.status(200).send(response)
    } catch (error){
        return res.status(500).json({message: error.message})
    }
}

const getActivity = async (req, res) => {
    try {
        const allActivities = await getActivities()

        return res.status(200).json(allActivities)
    } catch(error) {
        return res.status(500).send(error.message)
    }
}

const updateActivity = async (req, res) => {
    const activity = req.body

    try{
        const response = await updateActivityInfo(activity)

        return res.status(200).send(response)
    }catch(error){
        return res.status(500).send(error.message)
    }
}

const deleteActivity = async (req, res) => {
    const {name} = req.body

    console.log(req.body)

    try{
        const response = await destroyActivity(name)

        console.log(response)

        return res.status(200).send(response)
    }catch (error){
        return res.status(500).send(error.message)
    }
}

module.exports = {
    postActivity,
    getActivity,
    updateActivity,
    deleteActivity
}