var http = require('http');
var ecstatic = require('ecstatic')(__dirname);
var shoe = require('shoe');

var server = http.createServer(ecstatic);
server.listen(9999);

var clients = []

var broadcast = shoe(function (stream) {
    stream.on('data', function(data) {
      clients.forEach(function(client) {
        client.write(data)
      })
    })
    stream.on('end', function() {
      clients.forEach(function(client) {
        client.end()
      })
    })
});
broadcast.install(server, '/broadcast');

var view = shoe(function (stream) {
  clients.push(stream)
});
view.install(server, '/view');

console.log('open localhost:9999 to view and localhost:9999/broadcast.html to broadcast (from a webrtc enabled browser like Canary or Firefox)')