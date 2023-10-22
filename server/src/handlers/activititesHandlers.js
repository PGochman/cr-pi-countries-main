const {createActivity, getActivities} = require("../controllers/activitiesControllers")

const postActivity = async (req, res) => {
    const {name, difficulty, duration, season} = req.body

    try {
        const response = await createActivity(name, difficulty, duration || null, season)

        return res.status(200).send(response)
    } catch (error){
        return res.status(500).json({error: error.message})
    }
}

const getActivity = async (req, res) => {
    try {
        const allActivities = await getActivities()

        return res.status(200).json(allActivities)
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    postActivity,
    getActivity
}