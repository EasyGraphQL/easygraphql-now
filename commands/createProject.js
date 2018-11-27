const inquirer = require('inquirer')
const ora = require('ora')
const fs = require('fs-extra')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))

const spinner = ora('Creating GraphQL server! 🚀')

const createPackage = require('../services/createPackage')
const createStarterFiles = require('../services/createStarterFiles')
const addGQLSchema = require('../services/addSchema')
const installNow = require('../services/installNow')
const deployNow = require('../services/deployNow')
const runLocal = require('../services/runLocal')

const questions = []

function createProject () {
  let fileName
  let filePath

  const arg = argv._.length > 0 ? argv._[0] : false
  const local = argv.local ? argv.local : false
  const port = argv.p && argv.p > 999 ? argv.p : 8000
  const displayGraphiQL = argv.graphiql ? argv.graphiql : null

  if (displayGraphiQL === null) {
    const options = {
      type: 'confirm',
      name: 'graphiql',
      message: 'Display GraphiQL'
    }
    questions.unshift(options)
  }

  if (arg && (arg.includes('.gql') || arg.includes('.graphql')) && fs.existsSync(arg)) {
    fileName = arg
  } else if (arg && fs.existsSync(arg)) {
    let files = fs.readdirSync(arg)
    files = files.filter(file => file.includes('.gql') || file.includes('.graphql'))
    const options = {
      type: 'list',
      name: 'schemaName',
      message: 'Schema file name',
      choices: files
    }
    questions.unshift(options)
    filePath = arg
  } else {
    let files = fs.readdirSync(path.resolve())
    files = files.filter(file => file.includes('.gql') || file.includes('.graphql'))
    if (files.length === 0) {
      console.log('> Error: There are no GraphQL schema in this dir! ❌')
      process.exit(1)
    }
    const options = {
      type: 'list',
      name: 'schemaName',
      message: 'Schema file name',
      choices: files
    }
    questions.unshift(options)
  }

  inquirer.prompt(questions).then(answers => handleResponse(answers, fileName, filePath, local, port, displayGraphiQL))
}

async function handleResponse (answers, fileName, filePath, local, port, displayGraphiQL) {
  let folderPath
  try {
    fileName = fileName || answers['schemaName']
    spinner.start()
    folderPath = await createPackage()
    const graphiql = displayGraphiQL ? displayGraphiQL : answers['graphiql']
    await createStarterFiles(folderPath, graphiql, port)
    await addGQLSchema(folderPath, fileName, filePath)
    if (!local) {
      await installNow(folderPath)
      deployNow(folderPath)
    } else {
      runLocal(folderPath, port)
    }
    spinner.stop()
  } catch (err) {
    spinner.stop()
    console.log('> Error:', err.message)
    fs.removeSync(folderPath)
    process.exit(1)
  }
}

module.exports = createProject
