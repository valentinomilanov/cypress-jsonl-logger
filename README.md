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

## Installation

### Local Development

If using locally:

```bash
npm install file:../cypress-jsonl-logger
```
### GitHub install
```bash
npm install https://github.com/yourname/cypress-jsonl-logger.git
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

### Commands

```js
cy.logStep('Open login page')
cy.logVerification('User is logged in')
cy.logInfo('Login successful')
cy.loggerOff()
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
