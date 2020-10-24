const yargs = require('yargs')

const options = yargs
  .usage('Usage: -i <init>')
  .option('i', {
    alias: 'init',
    describe: 'Run init script to setup project code',
    type: 'boolean',
  })
  .argv

module.exports = Object.freeze({ ...options })