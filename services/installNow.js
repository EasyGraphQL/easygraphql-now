'use strict'

const path = require('path')
const { spawnSync } = require('child_process')

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function createDeployWithNow (dirPath) {
  try {
    if (!dirPath) {
      throw new Error('The path cant be empty')
    }
    await installNow(dirPath)
  } catch (err) {
    throw err
  }
}

function installNow (dirPath) {
  return new Promise(resolve => {
    resolve(spawnSync('sh', [`${path.join(__dirname, '..', 'scripts', 'installNow.sh')}`], {
      cwd: dirPath
    }))
  })
}

module.exports = createDeployWithNow
