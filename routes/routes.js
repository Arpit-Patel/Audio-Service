var express = require('express');
var router = express.Router();

var audioControler = require('../api/controllers/audioController')

/* GET home page. */
router.post('/', audioControler.fetchSong)

router.get('/ping', (req, res, next) => {
  res.send("pong")
})

module.exports = router;
