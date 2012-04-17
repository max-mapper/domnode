# dominode - node's evented API for HTML5
# dominode - node point browser
# dominode - node style streams for DOM nodes

**still alpha/work in progress**

you want to learn node's core APIs but you're stuck on the client side? no problemo! dominode uses javascript _verbatim and unchanged_ directly from node to give you a way to elegantly stream data into your web app.

## philosophy

node.js describes itself as a framework for dealing with "evented i/o" and traditionally runs on the server. clients, however, are just a i/o bound as servers (ajax requests, file uploads, indexeddb/websql, etc.) and can benefit from the nice APIs that node has developed to solve these problems in a server environment.

dominode uses a few key javascript libraries from node ([Stream](http://nodejs.org/api/stream.html), [Util](http://nodejs.org/api/util.html), etc via [browserify](https://github.com/substack/node-browserify)) and adds some new syntax for dealing with the DOM.

the major goal of this library is to avoid reinventing the wheel when it comes to problems that are done well in node but aren't done well in most client side javascript libraries. since dominode uses node's source code verbatim you get to use the [node documentation](http://nodejs.org/api/) as well as the multitude of [node modules](http://search.npmjs.org) and related information floating around on the internets to look up how these things work

## description

node Stream instances are basically unix pipes. they can be readable, writable or both. they are easy to reason about -- you can pipe a readable stream to a writable stream by doing `readableStream.pipe(writableStream)`.

readable streams will `emit` (emit is observer pattern - a publish/subscribe pattern which allows a number of observer objects to see an event) `data` events each time they get a "chunk" of data and then they will emit `end` when they are all finished. different types of streams will have different ways of chunking up their data. for example, a library that reads CSVs might emit `data` every time it reads a new line whereas an AJAX request might emit `data` every few kilobytes during the download.

the idea behind dominode is to hook up various I/O sources that are commonly used in client side development to the Stream API. for example say you have a JSON API that returns data like this:

    {"toppings": ["mushrooms", "pineapples", "canadian bacon"]}

you could implement a Stream that will `emit` once for every topping and pipe that stream to a dominode instance that knows how to render JSON data into the DOM using an HTML template

currently dominode is using the [plates](https://github.com/flatiron/plates) templating library which lets you bind JSON data to HTML, but it's easy to override plates and hook up your own client side templater

## example

    // pass in the selector location where the dominode will get rendered and the template it will use for each data event
    var list = dominode('.list', '<div id="number"></div>')
    
    // pipe some data to your dominode
    var readStream = new stream.Stream()
    readStream.readable = true
    readStream.pipe(list)
    readStream.write = function (data) {
      this.emit('data', data); return true
    }
    readStream.end = function (data) {
      this.emit('end')
    }
    // adds <div id="number">1</div>,
    //      <div id="number">2</div>
    //  and <div id="number">3</div>
    /    to <div class="list"></div>
    readStream.write({number: 1})
    readStream.write({number: 2})
    readStream.write({number: 3})

## roadmap

 - implement common stream wrappers:
   - XHR (naive implementation [here](https://github.com/maxogden/streaming-xhr-example/blob/master/attachments/streaming-xhr.js#L78))
   - websockets (done already by @dominictarr as [BrowserStream](https://github.com/dominictarr/browser-stream))
   - indexeddb/pouchdb
   - FileReader
   - webworkers
   - webRTC
   - mouse/touch events
 - examples using a few different templating libraries
 - examples using MVVM style "cascading dominodes" (the pun is strong with this one)

MIT LICENSE