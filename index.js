'use strict'

const express = require('express')

const {
  registerMediator,
  activateHeartbeat
} = require('openhim-mediator-utils')

const mediatorConfig = require('./mediatorConfig.json')
const config = require('./config')

const configOptions = config.getConfig()

const openhimConfig = Object.assign(
  { urn: mediatorConfig.urn },
  configOptions.openhim
)

const app = express()

app.all('*', (_req, res) => {
  res.send('Hello World')
})

app.listen(configOptions.port, () => {
  console.log(`Server listening on port ${configOptions.port}...`)

  mediatorSetup()
})

const mediatorSetup = () => {
  registerMediator(openhimConfig, mediatorConfig, err => {
    if (err) {
      console.error('Failed to register mediator. Check your Config: ', err)
      process.exit(1)
    }

    console.log('Successfully registered mediator!')

    const emitter = activateHeartbeat(openhimConfig)

    emitter.on('error', err => {
      console.error('Heartbeat failed: ', err)
    })
  })
}
