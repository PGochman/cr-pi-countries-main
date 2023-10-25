const { Router } = require("express");
const {getAllCountries, getCountryById, getCountryByName, getContinents} = require("../handlers/countriesHandlers")
const {postActivity, getActivity} = require("../handlers/activititesHandlers")

const router = Router();

router.get("/countries", getAllCountries)

router.get("/countries/name", getCountryByName)

router.get("/countries/:idPais", getCountryById)

router.post("/activities", postActivity)

router.get("/activities", getActivity)

router.get("/continents", getContinents)

module.exports = router;
