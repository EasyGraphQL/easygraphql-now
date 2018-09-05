'use strict'

const path = require('path')
const fs = require('fs-extra')
const { buildSchema } = require('graphql')

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function addGQLSchema (dirPath, schemaName) {
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

    validateSchema(dirPath, schemaName)
    await copySchemaFile(dirPath, schemaName)
    await addSchemaName(dirPath, schemaName)
  } catch (err) {
    throw err
  }
}

function validateSchema (dirPath, schemaName) {
  const schemaCode = fs.readFileSync(path.join(path.resolve(), schemaName), 'utf8')
  buildSchema(schemaCode)
}

async function copySchemaFile (dirPath, schemaName) {
  await fs.copySync(path.join(path.resolve(), schemaName), `${dirPath}/schema.gql`)
}

async function addSchemaName (dirPath, schemaName) {
  const data = await fs.readFileSync(`${dirPath}/index.js`, 'utf8')
  const replaceSchemaName = data.replace(/#schemaName/gm, `'${schemaName}'`)
  await fs.outputFileSync(`${dirPath}/index.js`, replaceSchemaName)
}

module.exports = addGQLSchema
