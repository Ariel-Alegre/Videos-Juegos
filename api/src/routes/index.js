const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const routerVideogames = require("./videogames")
const routerVideoGame= require("./videogame")
const routerGenres = require("./genres")
const routerPlatforms = require("./platforms")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", routerVideogames );
router.use("/videogame", routerVideoGame );
router.use("/genres", routerGenres);
router.use("/platforms", routerPlatforms);




module.exports = router;
