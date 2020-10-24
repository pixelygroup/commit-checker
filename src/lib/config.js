const fs = require('fs')
const path = require('path')
const prompts = require('prompts')
const configFileName = require('./consts.js').configFileName
const configFilePath = path.resolve(configFileName)

/**
 * Loops through a list of Qs and returns As
 *
 * @param {Array} questions array
 * @returns {Array} of answers
 */
async function collectAnswers (questions) {
  const answers = await prompts(questions)
  return answers
}

/**
 * Writes regex array to config file
 */
async function createNew () {
  const questions = [{
    type: 'text',
    name: 'prefix',
    message: 'Project prefix (e.g. AB)',
    validate: a => a ? true : 'The prefix must be at least 1 character long!',
  }]
  const answers = await collectAnswers(questions)

  const arr = [
    `/^${answers.prefix}-\\d+\\s.*$/gm`,
    '/^Release \\d\\.\\d\\.\\d(-.+)?/',
  ]

  const data = arr.join('\n')
  fs.writeFileSync(configFilePath, data)
}

/**
 * starts with config creation
 */
async function init () {
  if (exists()) {
    const overwrite = await reset()
    if (!overwrite) { return }
  }
  createNew()
}

/**
 * @returns {boolean} exists?
 */
function exists () {
  if (fs.existsSync(configFilePath)) { return true }
  return false
}

/**
 * @returns {boolean} reset file?
 */
async function reset () {
  console.log(`The ${configFileName} configuration already exists.`)
  const questions = [{
    type: 'text',
    name: 'reset',
    message: 'Would you like to reset it? [Y/N]:',
    validate: a => [
      'y',
      'n',
    ].includes(a.toLowerCase()) ? true : 'Wrong answer. try again!',
  }]

  const answers = await collectAnswers(questions)
  if (answers.reset.toLowerCase() === 'y') {
    return true
  }
}

module.exports = { init: () => init() }