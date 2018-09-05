'use strict'

const path = require('path')
const fs = require('fs-extra')
const { spawnSync } = require('child_process')
const os = require('os')

/**
 * return the path of the directory
 * @return {String} a path for the directory
 */
async function createFolder () {
  try {
    const d = new Date()
    const name = d.getTime().toString()
    const folderPath = path.join(os.tmpdir(), name)
    fs.ensureDirSync(folderPath)
    await createPackageJson(folderPath)
    return folderPath
  } catch (err) {
    throw err
  }
}

function createPackageJson (folderPath) {
  return new Promise(resolve => {
    resolve(spawnSync('sh', [`${path.join(__dirname, '..', 'scripts', 'createPackage.sh')}`], {
      cwd: folderPath
    }))
  })
}

module.exports = createFolder
