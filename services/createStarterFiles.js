'use strict'

const path = require('path')
const fs = require('fs-extra')
const templatesPath = path.join(__dirname, '..', 'templates')

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function createStarterFiles (dirPath, displayGraphiQL, port) {
  try {
    if (!dirPath) {
      throw new Error('The path cant be empty')
    }

    createIndexFile(dirPath)
    createGitIgnoreFile(dirPath)
    displayGraphiQLOnIndex(dirPath, displayGraphiQL)
    addPort(dirPath, port)
    editPackageJson(dirPath)
  } catch (err) {
    throw err
  }
}

function createIndexFile (dirPath) {
  fs.copySync(`${templatesPath}/starterFileIndex.txt`, `${dirPath}/index.js`)
}

function createGitIgnoreFile (dirPath) {
  fs.ensureDirSync(dirPath)
  fs.copySync(`${templatesPath}/starterFileGitignore.txt`, `${dirPath}/.gitignore`)
}

function displayGraphiQLOnIndex (dirPath, displayGraphiQL) {
  const data = fs.readFileSync(`${dirPath}/index.js`, 'utf8')
  const updatedTemplate = data.replace(/#displayGraphiql/gm, displayGraphiQL)
  fs.outputFileSync(`${dirPath}/index.js`, updatedTemplate)
}

function addPort (dirPath, port) {
  const data = fs.readFileSync(`${dirPath}/index.js`, 'utf8')
  const updatedTemplate = data.replace(/#port/gm, port)
  fs.outputFileSync(`${dirPath}/index.js`, updatedTemplate)
}

function editPackageJson (dirPath) {
  const data = fs.readFileSync(`${dirPath}/package.json`, 'utf8').toString().split('\n')
  const scriptPosition = data.indexOf('  "scripts": {')
  data.splice(scriptPosition + 1, 0, '    "start": "node index.js",')
  const text = data.join('\n')
  fs.outputFileSync(`${dirPath}/package.json`, text)
}

module.exports = createStarterFiles
