'use strict'

const path = require('path')
const fs = require('fs-extra')
const { buildSchema } = require('graphql')

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function addGQLSchema (dirPath, schemaName, filePath) {
  try {
    if (!dirPath) {
      throw new Error("The path can't be empty")
    }
    if (!schemaName) {
      throw new Error("The schema file name can't be empty")
    }

    let fileType = schemaName.split('.')
    fileType = fileType[fileType.length - 1]

    if (fileType !== 'gql' && fileType !== 'graphql') {
      throw new Error('The file type is not valid, it mush be .gql or .graphql')
    }

    filePath = filePath ? path.join(path.resolve(), filePath, schemaName) : path.join(path.resolve(), schemaName)
    validateSchema(filePath)
    copySchemaFile(dirPath, filePath)
    addSchemaName(dirPath, schemaName)
  } catch (err) {
    throw err
  }
}

function validateSchema (filePath) {
  const schemaCode = fs.readFileSync(filePath, 'utf8')
  buildSchema(schemaCode)
}

function copySchemaFile (dirPath, filePath) {
  fs.copySync(filePath, `${dirPath}/schema.gql`)
}

function addSchemaName (dirPath, schemaName) {
  const data = fs.readFileSync(`${dirPath}/index.js`, 'utf8')
  const replaceSchemaName = data.replace(/#schemaName/gm, `'${schemaName}'`)
  fs.outputFileSync(`${dirPath}/index.js`, replaceSchemaName)
}

module.exports = addGQLSchema
