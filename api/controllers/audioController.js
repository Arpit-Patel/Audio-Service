var getAudioData = require('../services/audioService');

var audioController = {}

audioController.fetchSong = (req, res, next) => {
    const youtubeVideoUrl = req.body.videoUrl
    if (!youtubeVideoUrl) {
        next()
    }
    let start = req.startTime ? req.startTime : 0
    if (start < 0) {
        start = 0
    }
    getAudioData(start, youtubeVideoUrl)
        .then(() => {
            res.send(200)
        })
        .catch(err => {
            res.send(400, err)
        });

}

module.exports = audioController