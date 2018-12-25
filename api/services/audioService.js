const { exec } = require('child_process');

function getAudioData(start, url) {
    exec("rm out.mp*")
    return new Promise(function(resolve, reject) {
        exec("youtube-dl --audio-format mp3 -g " + url, function(error, stdout, stderr) {
            var lines = stdout.toString().split('\n');
            if (error || lines.length < 2 || stderr) {
                reject("Unsupported video url")
            }
            else {
                cmd = "ffmpeg -i " + "'" + lines[1] + "\'" + " -vn -ar 44100 -ac 2 -ab 192k -f mp3 " + " -ss " + start + " -t 10 out.mp3"
                exec(cmd, function(error, stdout, stderr) {
                    console.log(cmd)
                    if (error) {
                        reject(error)
                    }
                    else {
                        resolve()
                    }
                })
            }
        })
    })
}

module.exports = getAudioData