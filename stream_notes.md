notes on node streams from a discussion with @izs about them

# readable

.pause() emits pause (advisory)

.resume() emits resume

# writable

if buffering on write return false (for backpressure)
then emit drain when ready

# closing streams

.destroy implies a forceful end to a stream

.close implies 'end once all the current stuff has been written'

.destroySoon should really be .close

# simplified writable stream

    var writestream = new stream.Stream()
    writestream.writable = true
    writestream.write = function (data) {
      return true // true means 'yes i am ready for more data now'
      // OR return false and emit('drain') when ready later
    }
    writestream.end = function (data) {
      // no more writes after end
      // emit close (optional)
    }
    
    writestream.write({number: 1})
    // note: in node core data is always a buffer or string
    

# simplified pipe implementation

    var readstream = new stream.Stream()
    readstream.readable = true
    
    readstream.on('data', function(data) {
      var ready = writestream.bind(writestream)
      if (ready === false) {
        this.pause()
        writestream.once('drain', this.resume.bind(this))
      }
    })
    
    readstream.on('end', function() {
      writestream.end()
    })

