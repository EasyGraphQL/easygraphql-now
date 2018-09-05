const inquirer = require('inquirer')
const ora = require('ora')
const fs = require('fs-extra')

const spinner = ora('Creating GraphQL server! 🚀')

const createPackage = require('../services/createPackage')
const createStarterFiles = require('../services/createStarterFiles')
const addGQLSchema = require('../services/addSchema')
const installNow = require('../services/installNow')
const deployNow = require('../services/deployNow')

const questions = [
  {
    type: 'input',
    name: 'schemaName',
    message: 'Schema file name',
    validate: (schemaName) => typeof schemaName === 'string'
  },
  {
    type: 'confirm',
    name: 'graphiql',
    message: 'Display GraphiQL'
  }
]

function createProject () {
  inquirer.prompt(questions).then(answers => handleResponse(answers))
}

async function handleResponse (answers) {
  let folderPath
  try {
    spinner.start()
    folderPath = await createPackage()
    await createStarterFiles(folderPath, answers['graphiql'])
    await addGQLSchema(folderPath, answers['schemaName'])
    await installNow(folderPath)
    deployNow(folderPath)
    spinner.stop()
  } catch (err) {
    spinner.stop()
    console.log('> Error:', err.message)
    fs.removeSync(folderPath)
    process.exit(1)
  }
}

module.exports = createProject
