var getAudioData = require('../services/audioService');

var audioController = {}

audioController.fetchSong = (req, res, next) => {
    const videoUrl = req.body.videoUrl;
    if (!videoUrl) {
        next();
    }
    let start = req.startTime ? req.startTime : 0;
    if (start < 0) {
        start = 0;
    }
    getAudioData(start, videoUrl)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(400).send(err);
        });

};

module.exports = audioController;