var stream = require('stream')
var util = require('util')
var plates = require('plates')

// selector: location in the dom where this should render to
// template: raw string template that should be combined with data and rendered
function Dominode(selector, template) {
  var me = this
  stream.Stream.call(me)
  me.writable = true
  me.selector = document.querySelector(selector)
  me.template = template
}

util.inherits(Dominode, stream.Stream)

// similar to jQuery DOM compilation e.g. $('<div>')
Dominode.prototype.renderFragment = function(html) {
  var range = document.createRange()
  range.selectNode(document.body)
  return range.createContextualFragment(html)
}

// writable streams must implement write and end functions
Dominode.prototype.write = function(data) {
  var compiled = plates.bind(this.template, data)
  var text = this.renderFragment(compiled)
  this.selector.appendChild(text)
}

Dominode.prototype.end = function () {}

function dominode(selector, template) { return new Dominode(selector, template) }

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = dominode
  }
  exports = dominode
}