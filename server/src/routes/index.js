const { Router } = require('express');
const countries =require("./country.js");
const activities =require("./activity.js");

// Importar todos los routers
const router = Router();

// Configurar los routers y usa el router 'countries' y 'activities' en la ruta base '/'
router.use("/", countries )
router.use("/", activities)


module.exports = router;