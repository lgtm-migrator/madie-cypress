// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve('./cypress/', 'config', `${file}.json`)
  return fs.readJson(pathToConfigFile)
}
const browserify = require('@cypress/browserify-preprocessor')
module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.args.push('--disable-web-security')
      launchOptions.args.push('--disable-site-isolation-trials')
      launchOptions.args.push('--max_old_space_size=1500')
      launchOptions.args.push('--disable-dev-shm-usage')
      return launchOptions
    }
  })
  const file = config.env.configFile
  const options = {
    browserifyOptions: {
      extensions: ['.js', '.ts'],
      plugin: [
        ['tsify']
      ]
    }
  }
  on('task', {
    log(message) {
      console.log(message)

      return null
    },
    table(message) {
      console.table(message)

      return null
    }
  })
  on('file:preprocessor', browserify(options))
  return getConfigurationByFile(file)
}
