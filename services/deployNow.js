'use strict'

const fs = require('fs-extra')
const { spawn } = require('child_process')
const clipboardy = require('clipboardy')
const ora = require('ora')

const spinner = ora('▲ Deploying to now!')
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
  const consoleProcess = spawn('now', [ '-p' ], {
    cwd: dirPath
  })

  let nowUrl
  consoleProcess.stdout.setEncoding('utf8')
  consoleProcess.stderr.setEncoding('utf8')
  consoleProcess.stderr.pipe(process.stdout)

  consoleProcess.stdout.on('data', (data) => {
    if (data.includes('https://')) {
      nowUrl = data
      clipboardy.writeSync(data)
    }
  })

  consoleProcess.stderr.on('data', (data) => {
    console.log(data)
  })

  consoleProcess.on('close', (code) => {
    spinner.succeed()
    fs.removeSync(dirPath)
    console.log('> url copied on clipboard: ', nowUrl)
    console.log('> Thanks for using easygraphql 😀')
  })
}

module.exports = deployNow
