const { Router } = require("express");
const {getAllCountries, getCountryById, getCountryByName, getContinents} = require("../handlers/countriesHandlers")
const {postActivity, getActivity, updateActivity, deleteActivity} = require("../handlers/activititesHandlers")

const router = Router();

router.get("/countries", getAllCountries)

router.get("/countries/name", getCountryByName)

router.get("/countries/:idPais", getCountryById)

router.post("/activities", postActivity)

router.get("/activities", getActivity)

router.get("/continents", getContinents)

router.put("/activities", updateActivity)

router.delete("/activities", deleteActivity)

module.exports = router;
