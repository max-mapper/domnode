# domnode - node's evented API for HTML5
# domnode - node point browser

**still alpha/work in progress**

you want to learn node but you're stuck on the client side? no problemo! domnode uses javascript _verbatim and unchanged_ directly from node to give you a way to elegantly stream data in and out of your web app.

## philosophy

node.js describes itself as a framework for dealing with "evented i/o" and traditionally runs on the server. clients, however, are just a i/o bound as servers (ajax requests, file uploads, indexeddb/websql, etc.) and can benefit from the nice APIs that node has developed to solve these problems in a server environment.

domnode uses a few key javascript libraries from node ([Stream](http://nodejs.org/api/stream.html), [Util](http://nodejs.org/api/util.html), etc via [browserify](https://github.com/substack/node-browserify)) and adds some new syntax for dealing with the DOM and other HTML5 APIs.

the major goal of this library is to avoid reinventing the wheel when it comes to problems that are done well in node but aren't done well in most client side javascript libraries. since domnode uses node's source code verbatim you get to use the [node documentation](http://nodejs.org/api/) as well as the multitude of [node modules](http://search.npmjs.org) and related information floating around on the internets to look up how these things work

## components

- [websockets](https://github.com/dominictarr/browser-stream)
- [FileReader](https://github.com/wookiehangover/dominode-filestream)
- [web workers](https://github.com/maxogden/domnode-webworker)
- [webRTC/getUserMedia](https://github.com/maxogden/domnode-usermedia)

todo:

- XHR (naive implementation [here](https://github.com/maxogden/streaming-xhr-example/blob/master/attachments/streaming-xhr.js#L78))
- indexeddb/pouchdb
- mouse/touch events
- setInterval

## to generate domnode-bundle.js using browserify:

    browserify -r events -r buffer -r stream -r util -o domnode-bundle.js

MIT LICENSE
