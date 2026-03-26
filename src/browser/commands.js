let loggerOff = false

function logToConsole(type, text, color = '\x1b[0m') {
  const time = new Date().toISOString()
  const { spec, test } = ctx()

  console.log(
    `${color}` +
    `[${time}]` +
    `[${spec}]` +
    `[${test}]` +
    `[${type.toUpperCase()}] | ` +
    `${text}` +
    `\x1b[0m`
  )
}

function ctx() {
  const t = Cypress.currentTest
  return {
    spec: Cypress.spec.name,
    test: t.title
  }
}

Cypress.Commands.add('loggerOff', (value = true) => {
  loggerOff = value
})

Cypress.Commands.add('logStep', (text, consoleOn = true) => {
  if (consoleOn) logToConsole('STEP', text)
  cy.task('jsonlLog', {
    type: loggerOff ? 'INFO' : 'STEP',
    ...ctx(),
    text
  })
})

Cypress.Commands.add('logVerification', (text, consoleOn = true) => {
  if (consoleOn) logToConsole('VERIFICATION', text)
  cy.task('jsonlLog', {
    type: loggerOff ? 'INFO' : 'VERIFICATION',
    ...ctx(),
    text
  })
})

Cypress.Commands.add('logInfo', (text, consoleOn = true) => {
  if (consoleOn) logToConsole('INFO', text)
  cy.task('jsonlLog', {
    type: 'INFO',
    ...ctx(),
    text
  })
})

Cypress.Commands.add('logClickButton', (buttonName, consoleOn = true) => {
  const text = `Click on ${buttonName} button`
  if (consoleOn) logToConsole('STEP', text)
  cy.task('jsonlLog', {
    type: loggerOff ? 'INFO' : 'STEP',
    ...ctx(),
    text
  })
})

Cypress.Commands.add('logEnterValueToField', (fieldName, value, consoleOn = true) => {
  const text = `Enter ${value} into ${fieldName} field`
  if (consoleOn) logToConsole('STEP', text)
  cy.task('jsonlLog', {
    type: loggerOff ? 'INFO' : 'STEP',
    ...ctx(),
    text
  })
})

Cypress.Commands.add('logViolation', (violations, consoleOn = true) => {
  violations.forEach((violation) => {
    const nodeDetails = violation.nodes.map((node) => node.target.join(', '))
    const text = `[${violation.impact.toUpperCase()}] ${violation.id}`
    if (consoleOn) logToConsole('VIOLATION', text, '\x1b[31m')
    cy.task('jsonlLog', {
      type: 'VIOLATION',
      ...ctx(),
      id: violation.id,
      impact: violation.impact.toUpperCase(),
      description: violation.description,
      nodes: violation.nodes.length,
      nodeDetails
    })
  })
})