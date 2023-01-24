const { Router } = require("express");
const router = Router();
const { Videogame, Genre } = require("../db")
const { infoEnd, nameGame, infoDatabase } = require("../controllers")


router.get("/", async (req, res) => {
    const { name } = req.query;
    let allVideogames = await infoEnd();

    if (name) {
        try {
            const gamesApi = await nameGame(name);
            const gamesByNameDB = await infoDatabase();
            let foundGamesResult = gamesByNameDB.filter(e => e.name.toLowerCase());
            let ResultsEnd = foundGamesResult.concat(gamesApi)
            ResultsEnd.length ? res.status(200).send(ResultsEnd.slice(0, 15)) : res.status(404).send("No se encontro el nombre del juego")

        } catch (error) {
            console.log(error);

        }
    } else {
        res.status(200).send(allVideogames)
    }


});

module.exports = router;