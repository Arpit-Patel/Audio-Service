var express = require('express');
var router = express.Router();

var audioControler = require('../api/controllers/audioController')

/* Fetch audio data */
router.post('/identify', audioControler.fetchSong)

router.get('/', (req, res, next) => {
  res.send("Welcome to Music Identification Service - By Arpit Patel")
})

module.exports = router;
