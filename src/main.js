const options = require('./lib/arg-options.js')
const config = require('./lib/config.js')
const verify = require('./lib/verify.js')

if (options.init) {
  config.init()
  return
} else {
  verify.isValid()
}
