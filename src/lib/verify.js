const fs = require('fs')
const path = require('path')
const configFileName = require('./consts.js').configFileName
const configFilePath = path.resolve(configFileName)

const msgPath = process.env.HUSKY_GIT_PARAMS
const msg = msgPath ? fs.readFileSync(msgPath, 'utf-8').trim() : null

const validators = fs.readFileSync(configFilePath, 'utf-8').trim()

/**
 * @returns {Array} of validators
 */
function getValidators () {
  const validatorsArr = validators.split('\n')
  const reArr = validatorsArr.map(v => {
    const flags = v.replace(/.*\/([gimy]*)$/, '$1')
    const pattern = v.replace(new RegExp('^/(.*?)/'+flags+'$'), '$1')
    return new RegExp(pattern, flags)
  })
  return reArr
}

/**
 * Checks if at least 1 pattern matches
 * Otherwise kills the process with an error
 */
function isValid () {
  const reArr= getValidators()
  const filterMatchArr = []
  reArr.forEach(v => filterMatchArr.push(v.test(msg)))

  if (!filterMatchArr.includes(true)) {
    killWithError()
  }
}


/**
 * Stops the commit if the commit message doesn't match the pattern
 */
function killWithError () {
  console.log('--------------   ERROR   --------------')
  console.log('Bad commit message')
  console.log('Your message is:')
  console.log(msg)
  console.log('---------------------------------------')
  console.log('The message should match one of the \nfollowing patterns:')
  console.log(validators)
  console.log('---------------------------------------')
  // eslint-disable-next-line no-process-exit
  process.exit(1)
}

module.exports= { isValid: () => isValid() }