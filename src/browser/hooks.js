beforeEach(function () {
  const test = this.currentTest
  const time = new Date().toISOString()

  console.log(
    `\n=== TEST START: ` +
    `[${time}]` +
    `[ID:${test.title.split(':')[0]}]` +
    `[TITLE:${test.title}]" ===`
  )

  cy.task('jsonlLog', {
    type: 'START',
    test_case_id: test.title.split(':')[0],
    title: test.title
  })
})

afterEach(function () {
  const test = this.currentTest
  const time = new Date().toISOString()

  console.log(
    `[${time}]` +
    `[RESULT] ` +
    `STATUS:${test.state.toUpperCase()} ` +
    `DURATION:${test.duration}`
  )

  console.log(
    `=== TEST END: ` +
    `[${time}]` +
    `[ID:${test.title.split(':')[0]}]` +
    `[TITLE:${test.title}] ===\n`
  )

  cy.task('jsonlLog', {
    type: 'RESULT',
    status: test.state.toUpperCase(),
    duration: test.duration
  })

  cy.task('jsonlLog', { type: 'END' })
})