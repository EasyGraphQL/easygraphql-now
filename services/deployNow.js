'use strict'

const fs = require('fs-extra')
const { exec } = require('child_process')
const clipboardy = require('clipboardy')
const ora = require('ora')

const spinner = ora('Deploying to now!')
/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
function deployNow (dirPath) {
  spinner.start()
  if (!dirPath) {
    throw new Error('The path cant be empty')
  }
  runDeployNow(dirPath)
}

function runDeployNow (dirPath) {
  const consoleProcess = exec('now -p', {
    cwd: dirPath
  })

  let nowUrl
  consoleProcess.stdout.on('data', (data) => {
    if (data.includes('https://')) {
      nowUrl = data
      clipboardy.writeSync(data)
    }
  })

  consoleProcess.stderr.on('data', (data) => {
    if (data.includes('Error')) {
      console.log(data)
    }
  })

  consoleProcess.on('close', (code) => {
    spinner.succeed()
    fs.removeSync(dirPath)
    console.log('> url copied on clipboard: ', nowUrl)
  })
}

module.exports = deployNow
