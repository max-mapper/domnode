var shoe = require('shoe')
var img = document.querySelector('img')
var view = shoe('/view')
view.on('data', function(data) {
  img.src = data
})
