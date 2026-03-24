let loggerOff = false
//let consoleOn = true

function logToConsole(type, text) {
  const time = new Date().toISOString()
  const { spec, test } = ctx()

  console.log(
    `[${time}]` + 
    `[${type.toUpperCase()}]` + 
    `[${spec}]` +
    `[${test}] | ` +
    `${text}`
  )
}

Cypress.Commands.add('loggerOff', (value = true) => {
  loggerOff = value
})

function ctx() {
  const t = Cypress.currentTest
  return {
    spec: Cypress.spec.name,
    test: t.title
  }
}

Cypress.Commands.add('logStep', (text, consoleOn = true) => {
  if (consoleOn) {
    logToConsole('step', text)
  }
  cy.task('jsonlLog', {
    type: loggerOff ? 'info' : 'step',
    ...ctx(),
    text
  })
})

Cypress.Commands.add('logVerification', (text, consoleOn = true) => {
  if (consoleOn) {
    logToConsole('verification', text)
  }
  cy.task('jsonlLog', {
    type: loggerOff ? 'info' : 'verification',
    ...ctx(),
    text
  })
})

Cypress.Commands.add('logInfo', (text, consoleOn = true) => {
  if (consoleOn) {
    logToConsole('info', text)
  }
  cy.task('jsonlLog', {
    type: 'info',
    ...ctx(),
    text
  })
})
