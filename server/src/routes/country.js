const { Router } = require ("express");
const router = Router();  // Crear instancia del router

// Importar controladores
const {
  getCountries,
  getOneCountry,
  getCountriesOrder,
  getAllCountries
} = require("../controllers/countries-controllers.js");

// Definir rutas y asociar a los controladores correspondientes
router.get("/countries", getCountries);
router.get("/countries/all", getAllCountries)
router.get("/details/:countryId", getOneCountry)
router.get("/countries/:order", getCountriesOrder);


module.exports = router;