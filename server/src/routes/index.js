const { Router } = require("express");
const {getAllCountries, getCountryById, getCountryByName} = require("../handlers/countriesHandlers")

const router = Router();

router.get("/countries", getAllCountries)

router.get("/countries/name", getCountryByName)

router.get("/countries/:idPais", getCountryById)

module.exports = router;
