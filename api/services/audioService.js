var recognizeMusic = require('../services/musicService');

const { exec } = require('child_process')
const fs = require('fs');

function getAudioData(start, url) {
    return new Promise(function(resolve, reject) {
        getAudioClip(start, url)
            .then(() => {
                if (!fs.existsSync('out.mp3')) {
                    reject("File does not exist")
                }
                recognizeMusic()
                    .then((data) => {
                        resolve(data)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
            .catch((err) => {
                reject(err)
            })
    })
}

function getAudioClip(start, url) {
    exec("rm out.mp*")
    return new Promise(function(resolve, reject) {
        exec("youtube-dl --audio-format mp3 -g " + url, function(error, stdout, stderr) {
            var lines = stdout.toString().split('\n');
            if (error || lines.length < 2 || stderr) {
                if (error) reject(error)
                else reject(stderr)
                reject("Unsupported video url")
            }
            else {
                cmd = "ffmpeg -i " + "\'" + lines[1] + "\'" + " -vn -ar 44100 -ac 2 -ab 192k -f mp3  -ss " + start + " -t 10 out.mp3"
                exec(cmd, function(error, stdout, stderr) {
                    if (error) {
                        reject("Cannot split video")
                    }
                    else {
                        resolve()
                    }
                })
            }
        })
    })
}

/*function splitAudio(audioUrl, start, times) {
    cmd = "ffmpeg -i " + "'" + audioUrl + "\'" + " -vn -ar 44100 -ac 2 -ab 192k -f mp3 " + " -ss " + start + " -t 10 out.mp3"
    return new Promise(function(resolve, reject) {
        exec(cmd, function(error, stdout, stderr) {
            if (error) {
                reject("Cannot split video")
            }
            else {
                resolve()
            }
        })
    })
}*/

module.exports = getAudioData