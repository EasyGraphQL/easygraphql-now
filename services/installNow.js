'use strict'

const path = require('path')
const fs = require('fs-extra')
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
    await editPackageJson(dirPath)
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

async function editPackageJson (dirPath) {
  const data = await fs.readFileSync(`${dirPath}/package.json`, 'utf8').toString().split('\n')
  const scriptPosition = data.indexOf('  "scripts": {')
  data.splice(scriptPosition + 1, 0, '    "start": "node index.js",')
  const text = data.join('\n')
  await fs.outputFileSync(`${dirPath}/package.json`, text)
}

module.exports = createDeployWithNow
