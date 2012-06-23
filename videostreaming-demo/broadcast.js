var shoe = require('shoe')
var mediastream = require('mediastream')
var broadcast = shoe('/broadcast')
mediastream({video: true}).pipe(broadcast)
