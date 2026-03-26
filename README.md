# Cypress JSONL Logger

A reusable logging plugin for Cypress that generates structured `.jsonl` logs for test steps, verifications, and results.

This plugin is designed to help teams:

- Track test execution in detail
- Build custom reports
- Integrate with CI/CD pipelines
- Analyze failures and performance

---

## Features

- Logs test lifecycle automatically
- Supports step, verification, and info logs
- Writes JSONL files (one event per line)
- Works with Cypress 13+
- ESM-compatible
- Node / Browser runtime separation

---
## New in v1.1.0

- Log types are now uppercase (STEP, INFO, VERIFICATION, VIOLATION)
- Field order in JSONL: ts, spec, test, type, text
- New command: `cy.logClickButton(buttonName)`
- New command: `cy.logEnterValueToField(fieldName, value)`
- New command: `cy.logViolation(violations)` for accessibility violations

---

## Installation

### Local Development

If using locally:

```bash
npm install file:../cypress-jsonl-logger
```
### GitHub install
```bash
npm install https://github.com/valentinomilanov/cypress-jsonl-logger.git
```
## Usage
This plugin has two entry points:

- Browser side → commands and hooks
- Node side → task registration

Both are required.


---

#### Section: Usage (Browser)

### Browser setup

In your Cypress support file (eg. e2e.js):

```js
import 'cypress-jsonl-logger/browser'
```

---

#### Section: Usage (Node)

### Node setup

In your Cypress config (eg. cypress.config.js):

```js
import { defineConfig } from 'cypress'
import { setupJsonlLogger } from 'cypress-jsonl-logger/node'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      setupJsonlLogger(on, config)
    }
  }
})
```
---

#### Section: Commands

## Commands

### Logging commands

| Command | Type | Description |
|---|---|---|
| `cy.logStep(text)` | STEP | Log a user action step |
| `cy.logVerification(text)` | VERIFICATION | Log an assertion or verification |
| `cy.logInfo(text)` | INFO | Log additional data or context |
| `cy.logClickButton(buttonName)` | STEP | Log a button click action |
| `cy.logEnterValueToField(fieldName, value)` | STEP | Log a field input action |
| `cy.logViolation(violations)` | VIOLATION | Log accessibility violations |
| `cy.loggerOff(boolean)` | — | Disable STEP and VERIFICATION logging |

### Examples
```js
// Basic logging
cy.logStep('Navigate to login page')
cy.logVerification('User is logged in')
cy.logInfo('Environment: staging')
cy.loggerOff(true)

// Shorthand action commands
cy.logClickButton('login submit')
// logs → "Click on login submit button"

cy.logEnterValueToField('email', 'user@example.com')
// logs → "Enter user@example.com into email field"

// Accessibility violations
cy.checkA11y(null, null, (violations) => {
  cy.logViolation(violations)
})
```
---

#### Section: Logs + License + Author

## Logs

Generated in `cypress/logs/*.jsonl`, e.g.:

```json
{"type":"meta","title":"TC-101"}
{"type":"step","text":"Open page"}
{"type":"verification","text":"Login success"}
{"type":"result","state":"passed","duration":1234}
```
## License
MIT

## Author
Valentino Milanov
