const { Router } = require("express")
const router = Router();
const { videogames } = require("../controllers");
const { Videogame, Genre } = require("../db");

router.get("/:idVideogame", async (req, res) => {
    const { idVideogame } = req.params;
    let data = await videogames(idVideogame);

    try {
        data ? res.status(200).json(data) : res.status(404).send("El id del video juego no existe");

    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    const { name, image, genres, released, rating, platforms, description } = req.body

    try {
        const newVideogame = await Videogame.create({
            name,
            image,
            released,
            rating,
            platforms,
            description,

        })

        const relation = await Genre.findAll({
            where: { name: genres }
        })


        await newVideogame.addGenre(relation).map(n => n.name)
        res.status(200).send(newVideogame)


    } catch (error) {
        res.send(error)
        console.log(error);
    }

});


module.exports = router;