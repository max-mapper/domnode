var stream = require('stream')
var util = require('util')

function MediaStream(options) {
  var me = this
  stream.Stream.call(me)
  this.readable = true
  var getUserMedia = me.getGetUserMedia()
  if (!getUserMedia) return console.log({"error": "getUserMedia not supported in this browser"})
  navigator.webkitGetUserMedia(options,
    function(stream) {
      var video = me.video = me.createHiddenVideo()
      video.src = window.webkitURL.createObjectURL(stream)
      video.play()
    },
    function(err) {
      console.log('error', err)
    }
  )
}

util.inherits(MediaStream, stream.Stream)

module.exports = function(options) {
  return new MediaStream(options)
}

module.exports.MediaStream = MediaStream

MediaStream.prototype.getGetUserMedia = function() {
  if (navigator.getUserMedia) return navigator.getUserMedia
  if (navigator.webkitGetUserMedia) return navigator.webkitGetUserMedia
  return false
}

MediaStream.prototype.onVideoPlay = function() {
  var video = this.video
  if (!isNaN(video.duration)) {
    this.canvas = this.createHiddenCanvas()
    setInterval(this.captureVideo.bind(this), 1)
  } else {
    setTimeout(this.onVideoPlay.bind(this), 100)
  }
}

MediaStream.prototype.captureVideo = function() {
  // var before = new Date()
  this.canvasContext.drawImage(this.video, 0, 0)
  var uri = this.canvas.toDataURL('image/webp')
  // console.log(new Date() - before)
  this.emit('data', uri)
}

MediaStream.prototype.createHiddenVideo = function() {
  var videoElement = document.createElement("video")
  videoElement.style.display = "none"
  document.querySelector('body').appendChild(videoElement)
  videoElement.addEventListener('play', this.onVideoPlay.bind(this))
  return videoElement
}

MediaStream.prototype.createHiddenCanvas = function() {
  this.canvas = document.createElement("canvas")
  this.canvas.style.display = "none"
  document.querySelector('body').appendChild(this.canvas)
  this.canvas.width = this.video.videoWidth;
  this.canvas.height = this.video.videoHeight;
  this.canvasContext = this.canvas.getContext('2d')
  return this.canvas
}