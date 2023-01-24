const { Router } = require('express');
const router = Router();
const { Platform } = require('../db');
const { gamePlatforms } = require('../controllers')


router.get('/', async (req, res) => {

  const plataforms = await gamePlatforms()
  try {

    const apiPlatform = await Platform.findAll();
    res.status(200).send(apiPlatform)

  } catch (error) {
    res.status(404).send(error)
  }
});


module.exports = router;