'use strict'

const path = require('path')
const fs = require('fs-extra')
const templatesPath = path.join(__dirname, '..', 'templates')

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function createStarterFiles (dirPath, displayGraphiQL) {
  try {
    if (!dirPath) {
      throw new Error('The path cant be empty')
    }
    await createIndexFile(dirPath)
    await createGitIgnoreFile(dirPath)
    await displayGraphiQLOnIndex(dirPath, displayGraphiQL)
  } catch (err) {
    throw err
  }
}

async function createIndexFile (dirPath) {
  await fs.copySync(`${templatesPath}/starterFileIndex.txt`, `${dirPath}/index.js`)
}

async function createGitIgnoreFile (dirPath) {
  await fs.ensureDirSync(dirPath)
  await fs.copySync(`${templatesPath}/starterFileGitignore.txt`, `${dirPath}/.gitignore`)
}

async function displayGraphiQLOnIndex (dirPath, displayGraphiQL) {
  const data = await fs.readFileSync(`${dirPath}/index.js`, 'utf8')
  const updatedTemplate = data.replace(/#displayGraphiql/gm, displayGraphiQL)
  await fs.outputFileSync(`${dirPath}/index.js`, updatedTemplate)
}

module.exports = createStarterFiles
