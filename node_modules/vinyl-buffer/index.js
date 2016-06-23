var through2 = require('through2').obj
var bl       = require('bl')

module.exports = vinylBuffer

function vinylBuffer() {
  var stream = through2(write)

  return stream

  function write(file, _, next) {
    if (file.isNull()) return push(file, next)
    if (file.isBuffer()) return push(file, next)

    file.contents.pipe(bl(function(err, data) {
      if (err) return next(err)

      file = file.clone()
      file.contents = data

      push(file, next)
    }))
  }

  function push(file, next) {
    stream.push(file)
    next()
  }
}
