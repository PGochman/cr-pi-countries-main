const { Router } = require("express");
const {getAllCountries, getCountryById, getCountryByName} = require("../handlers/countriesHandlers")

const router = Router();

router.get("/countries", getAllCountries)

module.exports = router;
