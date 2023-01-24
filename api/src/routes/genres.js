const { default: axios } = require("axios");
const { Router } = require("express");
const router = Router();
const { Genre } = require("../db")

router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get("https://api.rawg.io/api/genres?key=7c0cc7f197aa433b8e6e3a060f72732e");
    const apiGenres = await response.data.results.map(genre => genre.name);

    apiGenres.map(gen => Genre.findOrCreate({
      where: { name: gen }
    }));

    const allGenres = await Genre.findAll();
    res.status(200).json(allGenres);



  } catch (error) {
    next(error);
  }
});




module.exports = router;